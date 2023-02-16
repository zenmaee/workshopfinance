import pandas as pd
import requests
from time import time
from datetime import datetime

get_url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?last=1&token=sk_29735f4ddf4a47efb27623b229dda54a"
r=requests.get(get_url).json()
footballFieldId=r[0]['footballFieldId']
timeDateCreated=r[0]['timeDateCreated']
valuationCompsDate=r[0]['valuationCompsDate']
valuationName=r[0]['valuationName']
valuationType="Agua"
post_url="https://cloud.iexapis.com/v1/record/workshopfinance/VALUATIONS?duplicateKeyHandling=true&wait=true&token=sk_29735f4ddf4a47efb27623b229dda54a"
valuations=[
    {
        
        "footballFieldId":footballFieldId,
        "timeDateCreated":timeDateCreated,
        "valuationCompsDate":valuationCompsDate,
        "valuationName":valuationName,
        "valuationType":valuationType
    }]

    #POST into the VALUATIONS dataset
r = requests.post(post_url, json=valuations)

