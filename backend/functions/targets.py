import requests
from time import time
from datetime import datetime

def add_TARGET(userId, targetName, targetSymbol, sectorName, subsectorName, targetRevenueLTM, targetEbitdaLTM, type, iex_api_key):
  import requests
  now = datetime.now()
  timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
  timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
  
  url_to_add = "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/TARGETS?&token="+ iex_api_key
  r = requests.post(url_to_add, json=[
    {
        "targetEbitdaLTM": float(targetEbitdaLTM),
        "targetName": targetName,
        "targetRevenueLTM": float(targetRevenueLTM),
        "targetSector": sectorName,
        "targetSubsector": subsectorName,

        "targetSymbol": targetSymbol,
        "timeDateCreated": timeDateCreated, # generate this inside the function.
        "type": type,
        "userId": userId

    }
  ])
  return r.status_code