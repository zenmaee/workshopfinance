import pandas as pd
#from app import ma
#from app import db
import requests
import numpy as np
#from termcolor import colored as cl
from datetime import date
from datetime import datetime
import time

# datetime object containing current date and time
now = datetime.now()


basket_of_comps = ['MSFT', 'AMZN', 'GOOGL', 'FB', 'BABA', 'NVDA', 'PYPL', 'INTC', 'NFLX'] #Later, basket of comps will be obtained from javascript interaction
ticker = basket_of_comps
tgt_ticker = 'AAPL' # Add target company here. Later, target will be obtained from javascript interaction
ticker.append(tgt_ticker) # Combination of comps and target


###Testing values. Later, we will obtain this with the user.
valuationId=0
ownerId="inunezg@bu.edu"
timeDateCreated=now.strftime("%d/%m/%Y %H:%M:%S")
valuationName='Testing1'
footballFieldId=0
valuationStat="Average"
valuationSpread=0.1 #10%


##Setting up dates for AsOfDate variable
today=date.today()
today_str = str(today)
last31_year=today.year-1

day=today_str[-2:]
month=today_str[5:7]
year=today_str[:4]
ytd=year+"-"+month+"-"+day
fy1=str(last31_year)+"-12-31"
fy2=str(last31_year-1)+"-12-31"

##FROM EACH COMP, WE NEED:

#ENTERPRISE VALUE = ev
#PRICE PER SHARE -> NOT PRIORITY 1
#EVREVENUE LTM
#EVREVENUE FY1-> NOT PRIORITY 1
#EVREVENUE FY2 -> NOT PRIORITY 1
#EVEBITDA LTM
#EVEBITDA FY1-> NOT PRIORITY 1
#EVEBITDA FY2-> NOT PRIORITY 1
#PRICEEARNINGS LTM ->NOT PRIORITY 1
#PRICEEARNINGS FY1-> NOT PRIORITY 1
#PRICEEARNINGS FY2-> NOT PRIORITY 1
def get_metrics(stock):
    iex_api_key = 'sk_29735f4ddf4a47efb27623b229dda54a'
    fundamentals = []
    
#    price_api = "https://cloud.iexapis.com/stable/stock/"+stock+"/price?token="+iex_api_key
#    stats_api = "https://cloud.iexapis.com/stable/stock/"+stock+"/stats?token="+iex_api_key
    fundamentals_api = "https://cloud.iexapis.com/stable//time-series/FUNDAMENTAL_VALUATIONS/"+stock+"/?token="+iex_api_key
#    advancedstats_api = "https://cloud.iexapis.com/stable/stock/"+stock+"/advanced-stats?token="+iex_api_key

#    price_request = requests.get(price_api)
#    stats_request=requests.get(stats_api)
    fundamentals_request=requests.get(fundamentals_api)
#    advancedstats_request=requests.get(advancedstats_api)

#    price = price_request.json()    
#    fundamentals.append(price) 

#    shares = stats_request.json()['sharesOutstanding']
#    fundamentals.append(shares)   

#    marketcap = stats_request.json()['marketcap']
#    fundamentals.append(marketcap)    
 
#    peRatio = stats_request.json()['peRatio']
#    fundamentals.append(peRatio)
    
    enterpriseValue = fundamentals_request.json()[0]['enterpriseValue']
    fundamentals.append(enterpriseValue)
        
    evToEbitdaLTM = fundamentals_request.json()[0]['evToEbitda']
    fundamentals.append( evToEbitdaLTM)
    
    freeCashFlowToRevenueLTM = fundamentals_request.json()[0]['freeCashFlowToRevenue']
    freeCashFlowLTM = fundamentals_request.json()[0]['freeCashFlow']
    revenueLTM=freeCashFlowLTM/freeCashFlowToRevenueLTM
    evToRevenueLTM=enterpriseValue/revenueLTM
    fundamentals.append(evToRevenueLTM)
    
      
    return fundamentals #funadamentals=[enterpriseValue,evToEbitda,evToRevenue]

raw_data = []
for company in ticker:
    raw_data.append(get_metrics(company))
fundamentals = pd.DataFrame(raw_data, columns = ['enterpriseValue','evToEbitdaLTM','evToRevenueLTM'], index = ticker)
print("fundamentals")
print(fundamentals)

multiples = pd.DataFrame(columns = ['enterpriseValue','evToEbitdaLTM','evToRevenueLTM'], index = ['Comp avg', 'Tgt/Comp avg', 'Comp median', 'Tgt/Comp median', 'Comp high' ,'Tgt/Comp high', 'Comp low','Tgt/Comp low' ] )
#multiples.iloc[:, 0] = range(0,2) # not needed?
comps_df = fundamentals[:len(ticker)-1] # Obtaining data of all companies excluding target
tgt_df = fundamentals.iloc[-1] # Obtaining data of target

multiples.iloc[0] = comps_df.mean() #Comp avg
multiples.iloc[1] = tgt_df / multiples.iloc[0]#Tgt/ Comp avg
multiples.iloc[2] = comps_df.median()#Comp median
multiples.iloc[3] = tgt_df / multiples.iloc[2]#Tgt/Comp median
multiples.iloc[4] = comps_df.max()#Comp max
multiples.iloc[5] = tgt_df / multiples.iloc[4]#Tgt/Comp max
multiples.iloc[6] = comps_df.min()#Comps min
multiples.iloc[7] = tgt_df / multiples.iloc[6]#Tgt/Comp min
print(multiples)
def Add_COMP(compId, compSymbol,enterpriseValue,evToEbitdaLTM,evToRevenueLTM,valuationId):
  
  
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS?last=1&token=sk_29735f4ddf4a47efb27623b229dda54a"
    #comps_json=requests.get(url).json()
    #exists = len(comps_json)
    
    #if (exists == 0 ):
    #    compId=1
   # else:
    #    compId=comps_json[0]['compId']+1
    
    r = requests.post(url, json=[
    {
        "compId": compId,
        "compSymbol": compSymbol,
        "enterpriseValue": enterpriseValue,
        "evToEbitdaLTM": evToEbitdaLTM,
        "evToRevenueLTM": evToRevenueLTM,
        "valuationId":valuationId
    }
    ])
    print("r")
    print(r)
    return r


# If signup is successful <Response [200]>. If email exists "Email Exists".
comps_df.iloc[0]['enterpriseValue']

for i in range(0,len(comps_df.index)):
    Add_COMP(comps_df.index[i],comps_df.iloc[i]['enterpriseValue'] , comps_df.iloc[i]['evToEbitdaLTM'], comps_df.iloc[i]['evToRevenueLTM'],valuationId)
    #print(comps_df.index[i][columns='enterpriseValue'])

#AÑADIR A NUESTRA BASE DE DATOS:
###TABLA VALUATION
#valuationId
#ownerId
#timeDateCreated
#valuationName
#footballFieldId
#valuationStat
#valuationSpread
#valuationCalc=multiples.iloc[1,3,5,7- dependiendo de valuationStat; valuationCompsMetric]
#valuationCompsDate
#valuationCompsMetric
#valuationCompsPeriod


###TABLA VALUATION COMPS
#compId=
#compSymbol=comps_df.index[i]
#valuationId
#enterpriseValue=comps_df.index[i][enterpriseValue]
#evToEbitdaLTM=comps_df.index[i][evToEbitda]
#evToRevenueLTM=comps_df.index[i][evToRevenue]

def Add_COMP(compId, compSymbol,enterpriseValue,evToEbitdaLTM,evToRevenueLTM,valuationId):
  
  
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
    comps_json=requests.get(url).json()
    exists = len(comps_json)
    print(comps_json)
    if (exists == 0 ):
        compId=1
    else:
        compId=comps_json[0]['compId']+1

    
    r = requests.post(url, json=[
    {
        
        "compId": compId,
        "compSymbol": compSymbol,
        "enterpriseValue": enterpriseValue,
        "evToEbitdaLTM": evToEbitdaLTM,
        "evToRevenueLTM": evToRevenueLTM,
        "valuationId": valuationId
    }
    ])

    print(r)
    time.sleep(0.1)
    return r

def Add_VALUATION(ownerId,timeDateCreated,valuationName,footballFieldId,valuationStat,valuationSpread,valuationCompsDate,valuationCompsMetric,valuationCompsPeriod):
    
    valuationCompsMetricPeriod=valuationCompsMetric+valuationCompsPeriod
    
    if valuationStat=="Average":
        valuationCalc=multiples.iloc[1][valuationCompsMetricPeriod]
    elif valuationStat=="Median":
        valuationCalc=multiples.iloc[3][valuationCompsMetricPeriod]
    elif valuationStat=="High":
        valuationCalc=multiples.iloc[5][valuationCompsMetricPeriod]
    elif valuationStat=="Low":
        valuationCalc=multiples.iloc[7][valuationCompsMetricPeriod]
    

    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
    comps_json=requests.get(url).json()
    print(comps_json)
    exists = len(comps_json)
    if (exists == 0 ):
        valuationId=1
    else:
        valuationId=comps_json[0]['valuationId']+1
        
    
    r = requests.post(url, json=[
    {
        
        "footballFieldId":footballFieldId,
        "ownerId":ownerId,
        "timeDateCreated":timeDateCreated,
        "valuationCalc":valuationCalc,
        "valuationCompsDate":valuationCompsDate,
        "valuationCompsMetric":valuationCompsMetric,
        "valuationCompsPeriod":valuationCompsPeriod,
        "valuationId":valuationId,
        "valuationName":valuationName,
        "valuationSpread":valuationSpread
    }
    ])
    print("r")
    print(r)
    return r


# If signup is successful <Response [200]>. If email exists "Email Exists".
comps_df.iloc[0]['enterpriseValue']

for i in range(0,len(comps_df.index)):
    Add_COMP(i,comps_df.index[i],comps_df.iloc[i]['enterpriseValue'] , comps_df.iloc[i]['evToEbitdaLTM'], comps_df.iloc[i]['evToRevenueLTM'],valuationId)
    
    #print(comps_df.index[i][columns='enterpriseValue'])

Add_VALUATION("a78452f4e74d7e5f3958493f1fc1e20331a8f501adc9a2e071b899fb9a4a2318", timeDateCreated, valuationName, footballFieldId, valuationStat,valuationSpread,str(today), 'evToEbitda', 'LTM')