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
valuation=[{'color': '#94c0cc', 
             'footballFieldId': 'mj', 
             'metric': 'EV_R', 'spread': 0.1, 
             'stat': 'Mean', 
             'timeDateCreated': '04/28/23 21:52', 
             'valuationName': 'VALUATION 1', 
             'valuationTimeSeries': '1',
               'valuationType': 'COMPS', 
               'valuationMultAvEvEbitdaLTM': 17.586533334689562,
                 'valuationMultMedEvEbitdaLTM': 17.586533334689562, 
                 'valuationMultHighEvEbitdaLTM': 20.362136264856144, 
                 'valuationMultLowEvEbitdaLTM': 14.810930404522978, 
                 'valuationMultAvEvRevLTM': 4.495381381274134, 
                 'valuationMultMedEvRevLTM': 4.495381381274134, 
                 'valuationMultHighEvRevLTM': 6.964503232152301, 
                 'valuationMultLowEvRevLTM': 2.026259530395967, 
                 'valuationEvAvEvEbitdaLTM': 2203381588436.586, 
                 'valuationEvMedEvEbitdaLTM': 2203381588436.586, 
                 'valuationEvHighEvEbitdaLTM': 2551131328351.2964, 
                 'valuationEvLowEvEbitdaLTM': 1855631848521.8748, 
                 'valuationEvAvEvRevLTM': 1742126614354.8342, 
                 'valuationEvMedEvRevLTM': 1742126614354.8342, 
                 'valuationEvHighEvRevLTM': 2699002689078.606, 
                 'valuationEvLowEvRevLTM': 785250539631.0619}]
valuation2=[{'color': '#94c0cc', 
             'footballFieldId': 'mj', 
             'metric': 'EV_R', 'spread': 0.1, 
             'stat': 'Mean', 
             'timeDateCreated': '04/28/23 21:52', 
             'valuationName': 'valuatioooooooooooooon', 
             'valuationTimeSeries': '1',
               'valuationType': 'COMPS', 
               'valuationMultAvEvEbitdaLTM': 17.586533334689562,
                 'valuationMultMedEvEbitdaLTM': 17.586533334689562, 
                 'valuationMultHighEvEbitdaLTM': 20.362136264856144, 
                 'valuationMultLowEvEbitdaLTM': 14.810930404522978, 
                 'valuationMultAvEvRevLTM': 4.495381381274134, 
                 'valuationMultMedEvRevLTM': 4.495381381274134, 
                 'valuationMultHighEvRevLTM': 6.964503232152301, 
                 'valuationMultLowEvRevLTM': 2.026259530395967, 
                 'valuationEvAvEvEbitdaLTM': 2203381588436.586, 
                 'valuationEvMedEvEbitdaLTM': 2203381588436.586, 
                 'valuationEvHighEvEbitdaLTM': 2551131328351.2964, 
                 'valuationEvLowEvEbitdaLTM': 1855631848521.8748, 
                 'valuationEvAvEvRevLTM': 1742126614354.8342, 
                 'valuationEvMedEvRevLTM': 1742126614354.8342, 
                 'valuationEvHighEvRevLTM': 2699002689078.606, 
                 'valuationEvLowEvRevLTM': 785250539631.0619}]
#Ahora un PUT
#url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token="+iex_api_key
#r = requests.post(url, json=valuation)
#print(r.text)

url_update="https://workshopfinance.iex.cloud/v1/record/WORKSHOPFINANCE/VALUATIONS?duplicateKeyHandling=replace&wait=true&token="+iex_api_key
r = requests.post(url_update, json=valuation2)
print(r.text)
#POST into the VALUATIONS dataset




