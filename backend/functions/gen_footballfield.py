import pandas as pd
import requests
from time import time
from datetime import datetime

def update_FF_NAME(userId, footballFieldTimeSeries,footballFieldName,iex_api_key):
    
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+userId+"/"+footballFieldTimeSeries+"?token="+iex_api_key
    footballField=requests.get(url).json()
    footballField[0]['valuationName']=footballFieldName

    url="https://cloud.iexapis.com/v1/record/workshopfinance/VALUATIONS?duplicateKeyHandling=true&wait=true&token="+iex_api_key
    r=requests.post(url, json=footballField)
    return r
