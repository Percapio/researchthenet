import os
import json
import argparse
import requests

from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz
from urllib.parse import quote
from sec_edgar_downloader import Downloader

# Argparse
# Defines what arguments are passed to the the Python script and parses them.  Also, generates
# messages and issues when the user passes in invalid arguments.
ap = argparse.ArgumentParser(
    description="get all records on the given corporation across the U.S."
)
ap.add_argument("-c", "--company", help="pass in name of company to search", type=str, required=True)

args = vars(ap.parse_args())

company = args['company']

# GET request on OpenCorporates API for the actual corporation names.  The better spelled and
# more accurate the name given, then the better the chance for the correct records returned.
# Returns a list of company names.
def corporation_search(corporation):
    print('Searching opencorporates.com...')
    url = f"https://api.opencorporates.com/v0.4/companies/search?q={quote(corporation)}"

    response = requests.get(url)
    companies = []

    while True:
        if response.status_code == 200:
            json_response = response.json()['results']
            c_page = int(json_response['page'])

            for corp in json_response['companies']:
                ratio = fuzz.ratio(corporation.lower(), corp['company']['name'].lower())
                if ratio > 59:
                    companies.append(corp)

            if c_page < int(json_response['total_pages']):
                url = f"https://api.opencorporates.com/v0.4/companies/search?q={quote(corporation)}&page={c_page + 1}"
                response = requests.get(url)
            else:
                break
        else:
            break

    return companies

# GET request on the SEC's CIK lookup system for all CIK numbers associated to the given
# name of the corporation.
# Returns list of possible corporations and their CIK number.
def cik_lookup(corporation):
    print('Searching for CIK...')
    url = f"https://www.sec.gov/cgi-bin/cik_lookup?company={quote(corporation)}"

    response = requests.get(url)
    results = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        for link in soup.find_all('a'):
            cik = link.get_text()
            if cik != "Perform another Company-CIK Lookup.":
                comp_name = link.next_sibling.strip()
                ratio = fuzz.ratio(comp_name.lower(), corporation.lower())
                if ratio > 59:
                    results.append({
                        'name': comp_name,
                        'cik': cik
                    })

    return results

# Matches CIK numbers to the exact name of the corporations given by OpenCorporates. 
# Returns a list of corporations and their CIK numbers.
def match_results(opencorp, ciknumbers):
    print('Matching CIK to Company...')
    new_companies = []

    for cik_comp in ciknumbers:
        new_companies.append({
            'name': cik_comp['name'],
            'ratio': 100,
            'number': 0,
            'cik': cik_comp['cik'],
            'main': True
        })
        for bcp_comp in opencorp:
            cik_name = cik_comp['name'].replace(' ', '').replace('.', '').replace(',', '').lower()
            bcp_name = bcp_comp['company']['name'].replace(' ', '').replace('.', '').replace(',', '').lower()
            ratio = fuzz.ratio(cik_name, bcp_name)
            if ratio == 100:
                new_companies.append({
                    'name': bcp_comp['company']['name'],
                    'ratio': ratio,
                    'number': bcp_comp['company']['company_number'],
                    'cik': cik_comp['cik'],
                    'main': False
                })

    return new_companies

# GET request on SEC's Edgar system for filings on each corporation.
# Adds filings to "./sec/filings" under each CIK number
def pull_filings(corporations):
    print('Pulling filings from SEC...')
    dl=Downloader("./sec/filings")
    added = []

    for corp in corporations:
        been_added = set(added)
        has_pulled = False
        if corp['cik'] in been_added:
            has_pulled = True

        if corp['main'] != True and has_pulled == False:
            dl.get_all_available_filings(corp['cik'])
            print(f'Pulled: {corp["name"]}')
            added.append(corp['cik'])


# Main
# Runs each script and creates files for every action for review.
open_corp_records = corporation_search(company)

if len(open_corp_records) == 0:
    print('FAILED to retrieve corporation. Please, check the name.')
    exit(0)
else:
    path = './sec'
    if os.path.isdir("./sec") != True:
        os.makedirs(path)
    with open(f'{path}/{company}.json', 'w') as c:
        json.dump(open_corp_records, c)
    print(f'File saved as: {company}.json')

cik_numbers = cik_lookup(company)

if len(cik_numbers) == 0:
    print('FAILED to retrive CIK number. Please, check the name.')
    exit(0)
else:
    with open(f'{path}/cik.json', 'w') as out_file:
        json.dump(cik_numbers, out_file)
    print('Success! Saved file as cik.json')

companies = match_results(open_corp_records, cik_numbers)
with open(f'{path}/matched.json', 'w') as r:
    json.dump(companies, r)
    print('Success! Saved file as matched.json')

pull_filings(companies)
print('Job complete')