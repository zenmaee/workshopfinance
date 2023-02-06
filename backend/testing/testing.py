import pandas as pd
import requests
from time import time
from datetime import datetime

footballFieldId=6
userId="inunezg@bu.edu"
valuationId="1"
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a"

url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/inunezg@bu.edu/1/?&token="+iex_api_key
valuations=[
{
    "footballFieldId":6
}]

#POST into the VALUATIONS dataset
r = requests.put(url, json=valuations)
print(r.content)

