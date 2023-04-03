def delete_ff(iex_api_key, footballFieldTimeSeries, targetId):
  urL = "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/FOOTBALLFIELDS/" + targetId +"/"+footballFieldTimeSeries+"?&token=" + iex_api_key
  import requests
  footballField=requests.delete(urL)
  return footballField
