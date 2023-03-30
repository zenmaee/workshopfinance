
iex_api_key = "OjAwYjk1OWYxZGEzYWQ2Y2VjN2YyMWExY2RkMTM2Y2Uz"
# front sends new company name
new_company_ticker = "chut"
targetId = "58abd882fba88d5d5d5f86aa60c1f825480353c496d0ebecb74760fc69001380-AAPL"
footballFieldTimeSeries = "1678854046573000"
userID = "58abd882fba88d5d5d5f86aa60c1f825480353c496d0ebecb74760fc69001380"
# add exception handling for each api I have called.

def update_target(new_company_ticker, iex_api_key, footballFieldTimeSeries, targetId):
  import requests
  url1="https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/FOOTBALLFIELDS/"+ targetId +"/"+footballFieldTimeSeries+"?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  footballField=requests.get(url1).json()
  string = footballField[0]['targetId']
  words = string.split('-')
  userID = words[0]
  t = userID + "-" + new_company_ticker
  footballField[0]['targetId'] = t
  url="https://WORKSHOPFINANCE.iex.cloud/v1/record/WORKSHOPFINANCE/FOOTBALLFIELDS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  r=requests.post(url, json=footballField)
  return r
