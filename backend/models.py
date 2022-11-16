import pandas as pd
from app import ma
from app import db
import requests
import numpy as np
from termcolor import colored as cl

basket_of_comps = ['MSFT', 'AMZN', 'GOOGL', 'FB', 'BABA', 'NVDA', 'PYPL', 'INTC', 'NFLX'] #Later, basket of comps will be obtained from javascript interaction
ticker = basket_of_comps
tgt_ticker = 'AAPL' # Add target company here. Later, target will be obtained from javascript interaction
ticker.append(tgt_ticker) # Combination of comps and target

def get_metrics(stock):
    iex_api_key = 'sk_29735f4ddf4a47efb27623b229dda54a'
    fundamentals = []
    
    p = "https://cloud.iexapis.com/stable/stock/"+stock+"/price?token="+iex_api_key
    m = "https://cloud.iexapis.com/stable/stock/"+stock+"/stats?token="+iex_api_key
    pe = "https://cloud.iexapis.com/stable/stock/"+stock+"/stats?token="+iex_api_key
    ebitda = "https://cloud.iexapis.com/stable/time-series/fundamentals/"+stock+"/quarterly?token="+iex_api_key
    ebit = "https://cloud.iexapis.com/stable/time-series/fundamentals/"+stock+"/quarterly?token="+iex_api_key
    rev = "https://cloud.iexapis.com/stable/time-series/fundamentals/"+stock+"/quarterly?token="+iex_api_key
    ev = "https://cloud.iexapis.com/stable/stock/"+stock+"/advanced-stats?token="+iex_api_key

    raw_price = requests.get(p)
    price = raw_price.json()    
    fundamentals.append(price) 

    raw_marketcap = requests.get(m)
    marketcap = raw_marketcap.json()['marketcap']
    fundamentals.append(marketcap)    
 
    raw_peRatio = requests.get(pe)
    peRatio = raw_peRatio.json()['peRatio']
    fundamentals.append(peRatio)
    
    raw_ebitda = requests.get(ebitda)
    ebitda = raw_ebitda.json()[0]['ebitdaReported']
    fundamentals.append(ebitda)
        
    raw_ebit = requests.get(ebit)
    ebit = raw_ebit.json()[0]['ebitReported']
    fundamentals.append(ebit)
    
    raw_revenue = requests.get(rev)
    revenue = raw_revenue.json()[0]['revenue']
    fundamentals.append(revenue)
    
    raw_entvalue = requests.get(ev)
    entvalue = raw_entvalue.json()['enterpriseValue']
    fundamentals.append(entvalue)
    
      
    return fundamentals #funadamentals=[price, marketcap, peRatio, ebitda, ebit, revenue, entvalue] of stock

raw_data = []
for company in ticker:
  raw_data.append(get_metrics(company))
fundamentals = pd.DataFrame(raw_data, columns = ['price', 'marketcap', 'pe', 'ebitda', 'ebit', 'revenue', 'ev'], index = ticker)
#Obtaining desired multiples: pe, ev/ebitda, ev/ebit, ev/revenue

valuation_multiples = fundamentals[['pe',	'ebitda',	'ebit',	'revenue']].copy() #Only multiple columns
valuation_multiples_copy = valuation_multiples
valuation_multiples = valuation_multiples.rename(columns = {'ebitda':'evEbitda', 'ebit':'evEbit', 'revenue':'evRevenue'})
valuation_multiples ['evEbitda'] = fundamentals['ev'] / valuation_multiples_copy['ebitda']
valuation_multiples ['evEbit'] = fundamentals['ev'] / valuation_multiples_copy['ebit']
valuation_multiples ['evRevenue']  = fundamentals['ev'] / valuation_multiples_copy['revenue']

#multiples is dataframe containing comparison between comps and target

multiples = pd.DataFrame(columns = ['pe', 'evEbitda', 'evEbit', 'evRevenue'], index = ['Comp avg', 'Comp avg/tgt'] )
#multiples.iloc[:, 0] = range(0,2) # not needed?
comps_df = valuation_multiples[:len(ticker)-1] # Obtaining data of all companies excluding target
tgt_df = valuation_multiples.iloc[-1] # Obtaining data of target
multiples.iloc[0] = comps_df.sum() / (len(ticker))
multiples.iloc[1] = tgt_df / multiples.iloc[0]


class Multiples(db.Model):
    type = db.Column (db.Integer, primary_key=True) #type 0 is comp, type 1 is tgt
    pe = db.Column(db.Float, nullable=False)
    evEbitda = db.Column(db.Float, nullable=False)
    evEbit = db.Column(db.Float, nullable=False)
    evRevenue = db.Column(db.Float, nullable=False)

    def __init__(self, type, pe, evEbitda, evEbit, evRevenue):
        self.type=type
        self.pe=pe
        self.evEbitda=evEbitda
        self.evEbit=evEbit
        self.evRevenue=evRevenue

# Generate marshmallow Schemas from your models
class MultiplesSchema(ma.Schema):
    class Meta:
         #Fields to expose
        fields = ("type","pe", "evEbitda", "evEbit", "evRevenue")


multiples_schema = MultiplesSchema()
various_multiples_schema = MultiplesSchema(many=True)

