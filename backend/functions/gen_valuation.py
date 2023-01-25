import pandas as pd
import requests
from time import time
#FROM EACH COMP, WE NEED (priority 1):
#enterprise value
#evToRevenueLTM
#evToEbitdaLTM

####FUNCTIONS THAT WE WILL NEED

#get_metrics:Gets financial metrics from the comps and the target from IEX
#add_COMP:Adds comparables to COMPS table from IEX
#add_VALUATION:Adds valuation to COMPS table from IEX
#get_multiples:Gets multiples of tgt/comps
#generate_valuation:Generates Valuation. Main function to call

def get_metrics(company,asOfDate,iex_api_key):
    #Preparing code
    fundamentals = [] #Fundamentals will store desired financial metrics of each company

    #Fetching API
    fundamentals_api = "https://cloud.iexapis.com/stable//time-series/FUNDAMENTAL_VALUATIONS/"+company+"/ttm?token="+iex_api_key
    financials_api = "https://cloud.iexapis.com/stable//time-series/financials/"+company+"/?token="+iex_api_key+"&to="+asOfDate+"&last=1"
    
    fundamentals_request=requests.get(fundamentals_api)
    financials_request=requests.get(financials_api)
    #Storing metrics in fundamentals list
    enterpriseValue = fundamentals_request.json()[0]['enterpriseValue']
    fundamentals.append(enterpriseValue)
        
    ebitdaLTM = financials_request.json()[0]['EBITDA']
    evToEbitdaLTM=enterpriseValue/ebitdaLTM
    fundamentals.append( evToEbitdaLTM)
    
    revenueLTM= financials_request.json()[0]['revenue']
    evToRevenueLTM=enterpriseValue/revenueLTM
    fundamentals.append(evToRevenueLTM)
    return fundamentals #funadamentals=[enterpriseValue,evToEbitdaLTM,evToRevenueLTM]

def add_COMP(compSymbol,enterpriseValue,evToEbitdaLTM,evToRevenueLTM,valuationId,iex_api_key):
  
    #If this dataset COMPS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS?&token="+iex_api_key
    compId=time()*1000000
    comps=[
    {
        
        "compId": compId,
        "compSymbol": compSymbol,
        "enterpriseValue": enterpriseValue,
        "evToEbitdaLTM": evToEbitdaLTM,
        "evToRevenueLTM": evToRevenueLTM,
        "valuationId": valuationId
    }]

    #POST each comp into the COMPS dataset
    r = requests.post(url, json=comps)
    print("r de comps")
    print(r)
    return r

def add_VALUATION(multiples, valuationId, userId,timeDateCreated,valuationName,footballFieldId,valuationSpread,valuationCompsDate,valuationType,iex_api_key):
    
    #desired_multiples=[enterpriseValue, evToEbitdaLTM,evToRevenueLTM]
    
    #Depending on the desired stat, we will want one row of multiples or another.
    #However, even though the stat is changed, no recalculations should be made. All possible calculation should already be made
    valuationCalcAvEvEbitdaLTM=multiples.iloc[1]['evToEbitdaLTM']
    valuationCalcMedEvEbitdaLTM=multiples.iloc[3]['evToEbitdaLTM']
    valuationCalcHighEvEbitdaLTM=multiples.iloc[5]['evToEbitdaLTM']
    valuationCalcLowEvEbitdaLTM=multiples.iloc[7]['evToEbitdaLTM']
    valuationCalcAvEvRevLTM=multiples.iloc[1]['evToRevenueLTM']
    valuationCalcMedEvRevLTM=multiples.iloc[3]['evToRevenueLTM']
    valuationCalcHighEvRevLTM=multiples.iloc[5]['evToRevenueLTM']
    valuationCalcLowEvRevLTM=multiples.iloc[7]['evToRevenueLTM']
    
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token="+iex_api_key
    valuations=[
    {
        
        "footballFieldId":footballFieldId,
        "userId":userId,
        "timeDateCreated":timeDateCreated,
        "valuationCalcAvEvEbitdaLTM":valuationCalcAvEvEbitdaLTM,
        "valuationCalcMedEvEbitdaLTM":valuationCalcMedEvEbitdaLTM,
        "valuationCalcHighEvEbitdaLTM":valuationCalcHighEvEbitdaLTM,
        "valuationCalcLowEvEbitdaLTM":valuationCalcLowEvEbitdaLTM,
        "valuationCalcAvEvRevLTM":valuationCalcAvEvRevLTM,
        "valuationCalcMedEvRevLTM":valuationCalcMedEvRevLTM,
        "valuationCalcHighEvRevLTM":valuationCalcHighEvRevLTM,
        "valuationCalcLowEvRevLTM":valuationCalcLowEvRevLTM,
        "valuationCompsDate":valuationCompsDate,
        "valuationId":valuationId,
        "valuationName":valuationName,
        "valuationSpread":valuationSpread,
        "valuationType":valuationType
    }]

    #POST into the VALUATIONS dataset
    r = requests.post(url, json=valuations)
    print("r de valuatios")
    print(r)
    return r


def get_multiples(basket_of_comps, tgt_ticker, desired_multiples, valuationId,asOfDate,iex_api_key):

    #ticker contains comps+target
    ticker = basket_of_comps
    ticker.append(tgt_ticker)

    raw_data = []
    for company in ticker:
        raw_data.append(get_metrics(company,asOfDate,iex_api_key))

  

    fundamentals = pd.DataFrame(raw_data, columns = desired_multiples, index = ticker)
    multiples = pd.DataFrame(columns = desired_multiples, index = ['Comp avg', 'Tgt/Comp avg', 'Comp median', 'Tgt/Comp median', 'Comp high' ,'Tgt/Comp high', 'Comp low','Tgt/Comp low' ] )
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
    for i in range(0,len(comps_df.index)):
        add_COMP(comps_df.index[i],comps_df.iloc[i]['enterpriseValue'] , comps_df.iloc[i]['evToEbitdaLTM'], comps_df.iloc[i]['evToRevenueLTM'],valuationId,iex_api_key)
    #print(multiples)
    return multiples

def generate_valuation(basket_of_comps, tgt_ticker, desired_multiples, userId, timeDateCreated, valuationName, footballFieldId, valuationSpread, valuationCompsDate,asOfDate,iex_api_key, valuationType):
    
    #If this dataset VALUATIONS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token="+iex_api_key
    comps_json=requests.get(url).json()
    print(comps_json)
    exists = len(comps_json)
    if (exists == 0 ):
        valuationId=1
    else:
        valuationId=comps_json[0]['valuationId']+1
    
    multiples=get_multiples(basket_of_comps, tgt_ticker, desired_multiples, valuationId,asOfDate,iex_api_key)
    add_VALUATION(multiples, valuationId, userId,timeDateCreated,valuationName,footballFieldId,valuationSpread,valuationCompsDate,valuationType,iex_api_key)