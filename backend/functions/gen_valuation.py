import pandas as pd
import requests
from time import time
from datetime import datetime

#FROM EACH COMP, WE NEED (priority 1):
#enterprise value
#evToRevenueLTM
#evToEbitdaLTM

####FUNCTIONS THAT WE WILL NEED

#get_metrics:Gets financial metrics from the comps and the target from IEX
#add_COMP:Adds comparables to COMPS table from IEX
#add_VALUATION:Adds new valuation to VALUATION table from IEX. This only contains the default values
#update_VALUATION: As soon as a new comp is added to the valuation, a valuation is generated and the valuation already added to the table is updated
#get_output:Gets valuation output
#generate_valuation:Generates Valuation. Main function to call

def get_metrics(company,comp_tgt, valuationCompsDate,iex_api_key):
    #Preparing code
    fundamentals = [] #Fundamentals will store desired financial metrics of each company

    ##Fetching API
    #fundamentals_api obtains ebitda and revenue
    #both if we are dealing with the comp or with a tgt, we want the ebitdaLTM and the revenueLTM
    fundamentals_api="https://cloud.iexapis.com/stable/time-series/fundamentals/"+company+"/ttm?token="+iex_api_key+"&to="+valuationCompsDate+"&last=1"
    fundamentals_request=requests.get(fundamentals_api)
    ebitdaLTM = fundamentals_request.json()[0]['ebitdaReported']
    revenueLTM= fundamentals_request.json()[0]['revenue']

    
    if comp_tgt=="comp":
        #fundamental_valuations_api obtains enterpriseValue. Only when we are fetching a comp we are interested in enterpriseValue.
        
        fundamental_valuations_api = "https://cloud.iexapis.com/stable//time-series/FUNDAMENTAL_VALUATIONS/"+company+"/ttm?token="+iex_api_key
        fundamental_valuations_request=requests.get(fundamental_valuations_api)
        enterpriseValue = fundamental_valuations_request.json()[0]['enterpriseValue']

        #calculating evToEbitdaLTM
        evToEbitdaLTM=enterpriseValue/ebitdaLTM
        #adding evToEbitda to fundamentals
        fundamentals.append(evToEbitdaLTM)
    
        #calculating evToRevenueLTM
        evToRevenueLTM=enterpriseValue/revenueLTM
        #adding evToRevenue to fundamentals
        fundamentals.append(evToRevenueLTM)
        
        #if company is a comp: fundamentals=[evToEbitdaLTM,evToRevenueLTM]
    else:
        
        fundamentals.append(ebitdaLTM)
        fundamentals.append(revenueLTM)
        
        #if company is a tgt: fundamentals=[ebitdaLTM, revenueLTM]

    return fundamentals

def add_COMP(compSymbol,valuationId,valuationCompsDate,iex_api_key):

    fundamentals=get_metrics(compSymbol,"comp", valuationCompsDate,iex_api_key)
    evToEbitdaLTM=fundamentals[0]
    evToRevenueLTM=fundamentals[1]

    #If this dataset COMPS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS?&token="+iex_api_key
    comps=[
    {
        
        "compSymbol": compSymbol,
        "evToEbitdaLTM": evToEbitdaLTM,
        "evToRevenueLTM": evToRevenueLTM,
        "valuationId": valuationId
    }]

    #POST each comp into the COMPS dataset
    r = requests.post(url, json=comps)
    print("r de comps")
    print(r)
    return r

def update_VALUATION(footballFieldId, multiples,ev, valuationName,valuationCompsDate,iex_api_key):
    
    #desired_multiples=[evToEbitdaLTM,evToRevenueLTM]
    
    #Depending on the desired stat, we will want one row of multiples/ev or another.
    #However, even though the stat is changed, no recalculations should be made. All possible calculation should already be made
    #If Output=Mult:
    valuationMultAvEvEbitdaLTM=multiples.iloc[0]['evToEbitdaLTM'] #Stat=Av, Multiple=evToEbitdaLTM
    valuationMultMedEvEbitdaLTM=multiples.iloc[1]['evToEbitdaLTM'] #Stat=Median, Multiple=evToEbitdaLTM
    valuationMultHighEvEbitdaLTM=multiples.iloc[2]['evToEbitdaLTM']#Stat=High, Multiple=evToEbitdaLTM
    valuationMultLowEvEbitdaLTM=multiples.iloc[3]['evToEbitdaLTM']#Stat=Low, Multiple=evToEbitdaLTM
    valuationMultAvEvRevLTM=multiples.iloc[0]['evToRevenueLTM']#Stat=Av, Multiple=evToRevLTM
    valuationMultMedEvRevLTM=multiples.iloc[1]['evToRevenueLTM']#Stat=Median, Multiple=evToRevLTM
    valuationMultHighEvRevLTM=multiples.iloc[2]['evToRevenueLTM']#Stat=High, Multiple=evToRevLTM
    valuationMultLowEvRevLTM=multiples.iloc[3]['evToRevenueLTM']#Stat=Low, Multiple=evToRevLTM
    #If Output=Ev:
    valuationEvAvEvEbitdaLTM=ev.iloc[0]['evToEbitdaLTM']#Stat=Av, Multiple=evToEbitdaLTM
    valuationEvMedEvEbitdaLTM=ev.iloc[1]['evToEbitdaLTM']#Stat=Median, Multiple=evToEbitdaLTM
    valuationEvHighEvEbitdaLTM=ev.iloc[2]['evToEbitdaLTM']#Stat=High, Multiple=evToEbitdaLTM
    valuationEvLowEvEbitdaLTM=ev.iloc[3]['evToEbitdaLTM']#Stat=Low, Multiple=evToEbitdaLTM
    valuationEvAvEvRevLTM=ev.iloc[0]['evToRevenueLTM']#Stat=Av, Multiple=evToRevLTM
    valuationEvMedEvRevLTM=ev.iloc[1]['evToRevenueLTM']#Stat=Median, Multiple=evToRevLTM
    valuationEvHighEvRevLTM=ev.iloc[2]['evToRevenueLTM']#Stat=High, Multiple=evToRevLTM
    valuationEvLowEvRevLTM=ev.iloc[3]['evToRevenueLTM']#Stat=Low, Multiple=evToRevLTM
    
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/"+footballFieldId+"/"+valuationName+"/?&token="+iex_api_key
    valuations=[
    {
        
        "valuationMultAvEvEbitdaLTM":valuationMultAvEvEbitdaLTM,
        "valuationMultMedEvEbitdaLTM":valuationMultMedEvEbitdaLTM,
        "valuationMultHighEvEbitdaLTM":valuationMultHighEvEbitdaLTM,
        "valuationMultLowEvEbitdaLTM":valuationMultLowEvEbitdaLTM,
        "valuationMultAvEvRevLTM":valuationMultAvEvRevLTM,
        "valuationMultMedEvRevLTM":valuationMultMedEvRevLTM,
        "valuationMultHighEvRevLTM":valuationMultHighEvRevLTM,
        "valuationMultLowEvRevLTM":valuationMultLowEvRevLTM,
        "valuationEvAvEvEbitdaLTM":valuationEvAvEvEbitdaLTM,
        "valuationEvMedEvEbitdaLTM":valuationEvMedEvEbitdaLTM,
        "valuationEvHighEvEbitdaLTM":valuationEvHighEvEbitdaLTM,
        "valuationEvLowEvEbitdaLTM":valuationEvLowEvEbitdaLTM,
        "valuationEvAvEvRevLTM":valuationEvAvEvRevLTM,
        "valuationEvMedEvRevLTM":valuationEvMedEvRevLTM,
        "valuationEvHighEvRevLTM":valuationEvHighEvRevLTM,
        "valuationEvLowEvRevLTM":valuationEvLowEvRevLTM,
        "valuationCompsDate":valuationCompsDate,
        "valuationName":valuationName,
    }]

    #POST into the VALUATIONS dataset
    r = requests.put(url, json=valuations)
    

    return r

def get_output(basket_of_comps, valuationId, tgt, desired_multiples, valuationCompsDate,iex_api_key):

    comps_raw_data = []
    tgt_raw_data=[]
    
    #We obtain evToEbitdaLTM and evToRevenueLTM for the comps

    for comp in basket_of_comps:
        url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS/"+valuationId+"/"+comp+"&token="+iex_api_key
        r=requests.get(url).json()
        evToEbitdaLTM=r[0]['evToEbitdaLTM']
        evToRevenueLTM=r[0]['evToRevenueLTM']
        comps_raw_data.append([evToEbitdaLTM,evToRevenueLTM])
        

    #We obtain ebitdaLTM and revenueLTM for the tgt
    tgt_raw_data.append(get_metrics(tgt,"tgt",valuationCompsDate,iex_api_key))
  
    #Specify the columns for the tgt dataframe (ebitdaLTM and revenueLTM)
    
    desired_metrics=desired_multiples[:]
    for i in range(0,len(desired_metrics)):
        desired_metrics[i]=desired_metrics[i][4].lower()+desired_metrics[i][5:]
   
    #We will have 2 dataframes: comps_df and tgt_df.
    #comps_df will be a datafarme containing the raw_data(ev, evToEbitda, evToRevenue)
    #tgt_df will be a dataframe containing the raw_data(ebitda, revenue) of the tgt 
    
    comps_df = pd.DataFrame(comps_raw_data, columns = desired_multiples, index = basket_of_comps)
    tgt_df = pd.DataFrame(tgt_raw_data, columns = desired_metrics, index=[tgt])
    
    #multiples contains the avg, median, high and low output for each multiple
    #ev contains the av, median, high and low ev of the target
    multiples = pd.DataFrame(columns = desired_multiples, index = ['Avg', 'Median', 'High' ,'Low'])
    ev=pd.DataFrame(columns = desired_multiples, index = ['Avg', 'Median', 'High' ,'Low'])

    multiples.iloc[0] = comps_df.mean() #Comp avg ev, evToEbitda, evToRevenue
    multiples.iloc[1] = comps_df.median()#Comp median ev, evToEbitda, evToRevenue
    multiples.iloc[2] = comps_df.max()#Comp max ev, evToEbitda, evToRevenue
    multiples.iloc[3] = comps_df.min()#Comps min ev, evToEbitda, evToRevenue
    print(multiples)
    #ev is multiples*ebitda or revenue    
    ev['evToEbitdaLTM']=multiples['evToEbitdaLTM']*float(tgt_df['ebitdaLTM'])
    ev['evToRevenueLTM']=multiples['evToRevenueLTM']*float(tgt_df['revenueLTM'])
    

    output=[multiples,ev]
    
    #We add comps to our comps table. Let's re-think this in the future.
    #for i in range(0,len(comps_df.index)):
    #    add_COMP(comps_df.index[i], comps_df.iloc[i]['evToEbitdaLTM'], comps_df.iloc[i]['evToRevenueLTM'],valuationId,iex_api_key)
    return output

def retrieveTgt(userId, targetId, iex_api_key):
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/TARGETS/"+userId+"/"+targetId+"&token="+iex_api_key
    r=requests.get(url).json()
    tgt=r[0]['targetSymbol']
    return tgt

def retrieveValuationComps(userId, valuationId, iex_api_key):
    #How to obtain all queries from API
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS/"+valuationId+"&token="+iex_api_key
    r=requests.get(url).json()
    basket_of_comps=[]
    for comp in r:
        basket_of_comps.append(comp['compSymbol'])
    return basket_of_comps

def generate_valuation(userId, valuationId, targetId, desired_multiples, valuationName, valuationCompsDate,iex_api_key):
    #We obtain the tgt symbol:
    tgt=retrieveTgt(userId, targetId, iex_api_key)
    #And the basket of comps:
    basket_of_comps=retrieveValuationComps(userId, valuationId, iex_api_key)
    #If this dataset VALUATIONS is empty, the firs compId will be 1. From then on, each compId will be the previous compId+1.

    output=get_output(basket_of_comps, valuationId, tgt, desired_multiples,valuationCompsDate,iex_api_key)
    multiples=output[0]
    ev=output[1]

    update_VALUATION(userId, valuationId, multiples, ev, valuationName,valuationCompsDate,iex_api_key)

def add_VALUATION(footballFieldId, iex_api_key):
    now = datetime.now()
    timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
    timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
    valuationCompsDate=now.strftime("%m/%d/%Y")
    valuationType="COMPS"
    
    url_valuation_name="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/"+userId+"/?last=100&token="+iex_api_key
    resp = requests.get(url_valuation_name).json()
    valuationName="VALUATION "+str(len(resp)+1)
    url = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS?&token="+iex_api_key
    valuations=[
    {
        
        "footballFieldId":footballFieldId,
        "timeDateCreated":timeDateCreated,
        "valuationCompsDate":valuationCompsDate,
        "valuationName":valuationName,
        "valuationType":valuationType
    }]

    #POST into the VALUATIONS dataset
    r = requests.post(url, json=valuations)

    return r


