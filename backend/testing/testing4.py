import pandas as pd
import requests
from time import time
from datetime import datetime

footballFieldId=28
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a"
userId="wf.artofvaluation"
valuationId=10

now = datetime.now()
timeDateCreated ="02/03/23 15:25"
#the valuation was generated for the first time
valuationCompsDate=now.strftime("%m/%d/%Y")
valuationType="COMPS"


#"https://cloud.iexapis.com/v1/record/WORKSPACE/CARS?duplicateKeyHandling=true&wait=true&token=SECRET_TOKEN"             
#url_valuation_name="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/"+userId+"/1675449823472534/?last=1&token="+iex_api_key
#resp = requests.get(url_valuation_name).json()
#valuationName="VALUATION "+str(len(resp))

#Ahora un PUT
url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?duplicateKeyHandling=true&wait=true&token=sk_29735f4ddf4a47efb27623b229dda54a"
valuations=[{
    "footballFieldId":1,
    "userId":"wf.artofvaluation",
    "timeDateCreated":"02/03/23 16:08º",
    "valuationCompsDate":"02/03/2023",
    "valuationId":10,
    "valuationName":"Prueba del NAKO",
    "valuationType":"Su vieja"
}]

#POST into the VALUATIONS dataset
r = requests.post(url, json=valuations)
print(r.content)



