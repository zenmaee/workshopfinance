import pandas as pd
import requests

#FROM EACH COMP, WE NEED (priority 1):
#enterprise value
#evToRevenueLTM
#evToEbitdaLTM

####FUNCTIONS THAT WE WILL NEED

#get_metrics:Gets financial metrics from the comps and the target from IEX
#Add_COMP:Adds comparables to COMPS table from IEX
#Add_VALUATION:Adds valuation to COMPS table from IEX

def get_metrics(stock,iex_api_key):
    #Preparing code
    fundamentals = [] #Fundamentals will store desired financial metrics of each company

    #Fetching API
    fundamentals_api_ltm = "https://cloud.iexapis.com/stable//time-series/FUNDAMENTAL_VALUATIONS/"+stock+"/ttm?token="+iex_api_key
    financials_api = "https://cloud.iexapis.com/stable//time-series/financials/"+stock+"/?token="+iex_api_key
    
    fundamentals_request_ltm=requests.get(fundamentals_api_ltm)
    financials_request=requests.get(financials_api)
    #Storing metrics in fundamentals list
    enterpriseValueLTM = fundamentals_request_ltm.json()[0]['enterpriseValue']
    fundamentals.append(enterpriseValueLTM)
        
    ebitda = financials_request.json()[0]['EBITDA']
    evToEbitdaLTM=enterpriseValueLTM/ebitda
    fundamentals.append( evToEbitdaLTM)
    
    revenue= financials_request.json()[0]['revenue']
    evToRevenueLTM=enterpriseValueLTM/revenue#evToRevenue doesn't come directly. We have to calculate it.
    fundamentals.append(evToRevenueLTM)
    return fundamentals #funadamentals=[enterpriseValueLTM,evToEbitdaLTM,evToRevenueLTM]

def Add_COMP(compSymbol,enterpriseValueLTM,evToEbitdaLTM,evToRevenueLTM,valuationId,iex_api_key):
  
    #If this dataset COMPS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS?&token="+iex_api_key
    comps_json=requests.get(url).json()
    exists = len(comps_json)
    if (exists == 0 ):
        compId=1
    else:
        compId=comps_json[0]['compId']+1
    comps=[
    {
        
        "compId": compId,
        "compSymbol": compSymbol,
        "enterpriseValueLTM": enterpriseValueLTM,
        "evToEbitdaLTM": evToEbitdaLTM,
        "evToRevenueLTM": evToRevenueLTM,
        "valuationId": valuationId
    }]

    #POST each comp into the COMPS dataset
    r = requests.post(url, json=comps)
    return r

def Add_VALUATION(multiples, valuationId, ownerId,timeDateCreated,valuationName,footballFieldId,valuationSpread,valuationCompsDate,iex_api_key):
    
    #desired_multiples=[enterpriseValueLTM, evToEbitdaLTM,evToRevenueLTM]
    
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token="+iex_api_key

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
        "ownerId":ownerId,
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
        "valuationSpread":valuationSpread
    }]

    #POST each comp into the VALUATIONS dataset
    r = requests.post(url, json=valuations)

    return r


def get_multiples(basket_of_comps, tgt_ticker, desired_multiples, valuationId,iex_api_key):

    #ticker contains comps+target
    ticker = basket_of_comps
    ticker.append(tgt_ticker)

    raw_data = []
    for company in ticker:
        raw_data.append(get_metrics(company,iex_api_key))

  

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
        Add_COMP(comps_df.index[i],comps_df.iloc[i]['enterpriseValueLTM'] , comps_df.iloc[i]['evToEbitdaLTM'], comps_df.iloc[i]['evToRevenueLTM'],valuationId,iex_api_key)
    #print(multiples)
    return multiples

def generate_valuation(basket_of_comps, tgt_ticker, desired_multiples, ownerId, timeDateCreated, valuationName, footballFieldId, valuationSpread, valuationCompsDate,iex_api_key):
    
    #If this dataset VALUATIONS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token="+iex_api_key
    comps_json=requests.get(url).json()
    print(comps_json)
    exists = len(comps_json)
    if (exists == 0 ):
        valuationId=1
    else:
        valuationId=comps_json[0]['valuationId']+1
    
    multiples=get_multiples(basket_of_comps, tgt_ticker, desired_multiples, valuationId,iex_api_key)
    Add_VALUATION(multiples, valuationId, ownerId,timeDateCreated,valuationName,footballFieldId,valuationSpread,valuationCompsDate,iex_api_key)