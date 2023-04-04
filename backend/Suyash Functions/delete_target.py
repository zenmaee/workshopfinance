def delete_targets(userId, targetSymbol):
  url = "https://workshopfinance.iex.cloud/v1/data/WORKSHOPFINANCE/TARGETS/" + userId + "/" + targetSymbol + "?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  import requests
  r = requests.delete(url)
  return r
