import pandas as pd
import requests
from time import time
from datetime import datetime
from time import time


#SAME AS GEN_VALUATION:
#update_FF_NAME
#add_FOOTBALLFIELD
#deleting Valuations in FootballField

def add_FOOTBALLFIELD(targetId,footballFieldType,footballFieldTimeSeries,iex_api_key):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+targetId+"/?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    print("targetId")
    print(targetId)
    targetSymbol=targetId.split("-")[1]
    footballFieldName="FOOTBALL FIELD "+targetSymbol+" "+str(len(resp)+1)
    now = datetime.now()
    timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
    timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
    #footballFieldTimeSeries=str(int(time()*1000000))

    url= "https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS?&token="+iex_api_key

    r = requests.post(url, json=[
    {
        "footballFieldName":footballFieldName,
        "footballFieldTimeSeries":footballFieldTimeSeries,
        "footballFieldType":footballFieldType,
        "targetId":targetId,
        "timeDateCreated": timeDateCreated

    }
  ])
    if r.status_code==200:

        return footballFieldName


def update_FF_NAME(targetId, footballFieldTimeSeries,footballFieldName,iex_api_key):
    
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+targetId+"/"+footballFieldTimeSeries+"?token="+iex_api_key
    footballField=requests.get(url).json()
    footballField[0]['footballFieldName']=footballFieldName
    url="https://api.iex.cloud/v1/record/WORKSHOPFINANCE/FOOTBALLFIELDS?duplicateKeyHandling=true&wait=true&token="+iex_api_key
    print(footballField)
    r=requests.post(url, json=footballField)
    return r
