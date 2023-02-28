import pandas as pd
import requests
from time import time
from datetime import datetime


#SAME AS GEN_VALUATION:
#update_FF_NAME
#add_FOOTBALLField: gets user input elements and creates a row in DB
# repeat names are allowed 
#deleting Valuations in FootballField: Delete using name
# gets userID(key1), ff name, timeseries(key2)

# get time series from add valuation
# take naming convention from valuation
def update_FF_NAME(userId, footballFieldTimeSeries,footballFieldName,iex_api_key): 
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+userId+"/"+footballFieldTimeSeries+"?token="+iex_api_key
    footballField=requests.get(url).json()
    footballField[0]['footballFieldName']=footballFieldName
    url="https://cloud.iexapis.com/v1/record/workshopfinance/VALUATIONS?duplicateKeyHandling=true&wait=true&token="+iex_api_key
    r=requests.post(url, json=footballField)
    return r
