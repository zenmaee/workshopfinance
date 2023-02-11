import pandas as pd
import requests
from time import time
from datetime import datetime

#post_url="https://cloud.iexapis.com/v1/record/workshopfinance/VALUATIONS?duplicateKeyHandling=true&wait=true&token=sk_29735f4ddf4a47efb27623b229dda54a"
post_url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
print("acabose")
valuations=[
    {
        
        "footballFieldId":"Hola",
        "timeDateCreated":"02/20/2090 23:23",
        "valuationName":"Valuation",
        "valuationType":"klk",
        "valuationTimeSeries":"Eyyyy",
        "valuationEvMedEvEbitdaLTM":100
    }]

    #POST into the VALUATIONS dataset
print("o no")
r = requests.post(post_url, json=valuations)
print("o si")
print(r)

