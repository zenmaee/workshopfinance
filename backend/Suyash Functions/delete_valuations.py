def delete_valuation(footballFieldId, valuationTimeSeries):
  url = "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/VALUATIONS/" + footballFieldId + "/" + valuationTimeSeries + "?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  import requests
  r = requests.delete(url)
  return r

