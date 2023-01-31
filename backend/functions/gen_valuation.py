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

def get_metrics(stock):
    #Preparing code
    iex_api_key = 'sk_29735f4ddf4a47efb27623b229dda54a' #The way in which we store this token has to be reviewed. This is too insecure.
    fundamentals = [] #Fundamentals will store desired financial metrics of each company

    #Fetching API
    fundamentals_api = "https://cloud.iexapis.com/stable//time-series/FUNDAMENTAL_VALUATIONS/"+stock+"/?token="+iex_api_key
    fundamentals_request=requests.get(fundamentals_api)

    #Storing metrics in fundamentals list
    enterpriseValue = fundamentals_request.json()[0]['enterpriseValue']
    fundamentals.append(enterpriseValue)
        
    evToEbitdaLTM = fundamentals_request.json()[0]['evToEbitda']
    fundamentals.append( evToEbitdaLTM)
    
    freeCashFlowToRevenueLTM = fundamentals_request.json()[0]['freeCashFlowToRevenue']
    freeCashFlowLTM = fundamentals_request.json()[0]['freeCashFlow']
    revenueLTM=freeCashFlowLTM/freeCashFlowToRevenueLTM
    evToRevenueLTM=enterpriseValue/revenueLTM#evToRevenue doesn't come directly. We have to calculate it.
    fundamentals.append(evToRevenueLTM)
    return fundamentals #funadamentals=[enterpriseValue,evToEbitda,evToRevenue]

def Add_COMP(compSymbol,enterpriseValue,evToEbitdaLTM,evToRevenueLTM,valuationId):
  
    #If this dataset COMPS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
    comps_json=requests.get(url).json()
    exists = len(comps_json)
    if (exists == 0 ):
        compId=1
    else:
        compId=comps_json[0]['compId']+1

    #POST each comp into the COMPS dataset
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
    return r

def Add_VALUATION(multiples, valuationId, ownerId,timeDateCreated,valuationName,footballFieldId,valuationStat,valuationSpread,valuationCompsDate,valuationCompsMetric,valuationCompsPeriod):
    
    #"evToEbitdaLTM"="evToEbitda"+"LTM"
    valuationCompsMetricPeriod=valuationCompsMetric+valuationCompsPeriod
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token=sk_29735f4ddf4a47efb27623b229dda54a"

    #Depending on the desired stat, we will want one row of multiples or another
    if valuationStat=="Average":
        valuationCalc=multiples.iloc[1][valuationCompsMetricPeriod]
    elif valuationStat=="Median":
        valuationCalc=multiples.iloc[3][valuationCompsMetricPeriod]
    elif valuationStat=="High":
        valuationCalc=multiples.iloc[5][valuationCompsMetricPeriod]
    elif valuationStat=="Low":
        valuationCalc=multiples.iloc[7][valuationCompsMetricPeriod]
    
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
        
    #POST each comp into the VALUATIONS dataset
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

    return r


def get_multiples(basket_of_comps, tgt_ticker, desired_multiples, valuationCompsPeriod, valuationId):

    #ticker contains comps+target
    ticker = basket_of_comps
    ticker.append(tgt_ticker)

    raw_data = []
    for company in ticker:
        raw_data.append(get_metrics(company))

    desired_multiples_period=[]
    for i in desired_multiples:
        desired_multiples_period.append(i+valuationCompsPeriod)

    fundamentals = pd.DataFrame(raw_data, columns = desired_multiples_period, index = ticker)
    multiples = pd.DataFrame(columns = desired_multiples_period, index = ['Comp avg', 'Tgt/Comp avg', 'Comp median', 'Tgt/Comp median', 'Comp high' ,'Tgt/Comp high', 'Comp low','Tgt/Comp low' ] )
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
        Add_COMP(comps_df.index[i],comps_df.iloc[i]['enterpriseValueLTM'] , comps_df.iloc[i]['evToEbitdaLTM'], comps_df.iloc[i]['evToRevenueLTM'],valuationId)

    return multiples

def generate_valuation(basket_of_comps, tgt_ticker, desired_multiples, ownerId, timeDateCreated, valuationName, footballFieldId, valuationStat, valuationSpread, valuationCompsDate, valuationCompsMetric, valuationCompsPeriod):
    
    #If this dataset VALUATIONS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
    comps_json=requests.get(url).json()
    print(comps_json)
    exists = len(comps_json)
    if (exists == 0 ):
        valuationId=1
    else:
        valuationId=comps_json[0]['valuationId']+1

    multiples=get_multiples(basket_of_comps, tgt_ticker, desired_multiples, valuationCompsPeriod, valuationId)
    Add_VALUATION(multiples,valuationId,ownerId, timeDateCreated, valuationName, footballFieldId, valuationStat,valuationSpread,valuationCompsDate, valuationCompsMetric, valuationCompsPeriod)
