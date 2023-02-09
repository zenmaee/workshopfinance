import pandas as pd
import requests
from time import time
from datetime import datetime

footballFieldId=28
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a"
userId="wf.artofvaluation"
valuationId=time()*1000000
now = datetime.now()
timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
valuationCompsDate=now.strftime("%m/%d/%Y")
valuationType="COMPS"


#"https://cloud.iexapis.com/v1/record/WORKSPACE/CARS?duplicateKeyHandling=true&wait=true&token=SECRET_TOKEN"             
#url_valuation_name="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/"+userId+"/1675449823472534/?last=1&token="+iex_api_key
#resp = requests.get(url_valuation_name).json()
#valuationName="VALUATION "+str(len(resp))

#Primero un post
url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
valuations=[{
    "footballFieldId":1,
    "userId":userId,
    "timeDateCreated":timeDateCreated,
    "valuationCompsDate":valuationCompsDate,
    "valuationId":967,
    "valuationName":"Prueba del post",
    "valuationType":valuationType
}]

#POST into the VALUATIONS dataset
r = requests.post(url, json=valuations)
print(r.text)


##AHORA PUT, pero modificando solo los campos ya existentes, sin añadir nuevos campos
