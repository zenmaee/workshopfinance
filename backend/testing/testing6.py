import pandas as pd
import requests
from time import time
from datetime import datetime

get_url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?last=1&token=sk_29735f4ddf4a47efb27623b229dda54a"
r=requests.get(get_url).json()
valuationType="Agua"
post_url="https://cloud.iexapis.com/v1/record/workshopfinance/VALUATIONS?duplicateKeyHandling=true&wait=true&token=sk_29735f4ddf4a47efb27623b229dda54a"
valuations=[
    {
        
        "footballFieldId":"bb",
        "timeDateCreated":"02/20/2020 23:23",
        "valuationName":"Name",
        "valuationEvLowEvEbitdaLTM":20,
    }]

    #POST into the VALUATIONS dataset
r = requests.post(post_url, json=valuations)

