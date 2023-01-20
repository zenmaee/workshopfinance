from datetime import datetime
from functions.gen_valuation import generate_valuation

#token
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a"
# datetime object containing current date and time. We will need this for several purposes.
now = datetime.now()

# Basket_of_comps and tgt_ticker will later be obtained from javascript user interaction
basket_of_comps = ['MSFT', 'AMZN', 'GOOGL', 'KO'] #List of comparables within a valuation
tgt_ticker = 'AAPL' #Target company. This value will be obtained from the FootballField object

#This may change when we increase the scope
desired_multiples=["enterpriseValue", "evToEbitdaLTM", "evToRevenueLTM"]

#Testing values. Later, we will obtain these values with communication across the application
valuationId=0
ownerId="inunezg@bu.edu"
timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
print(timeDateCreated)
valuationName='Testing1'
footballFieldId=0
valuationSpread=0.1 #10%
asOfDate="Today" #asOfDate is the comps date field that the user reads when generating the Valuation
valuationType="COMPS"

if asOfDate=="Today":#valuationCompsDate is the comps date that goes into our dataset
    valuationCompsDate=now.strftime("%m/%d/%Y")
    print (valuationCompsDate)
else:
    valuationCompsDate=asOfDate

generate_valuation(basket_of_comps, tgt_ticker, desired_multiples, ownerId, timeDateCreated, valuationName, footballFieldId, valuationSpread, valuationCompsDate,valuationType,iex_api_key)
