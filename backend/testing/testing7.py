import pandas as pd
import requests
from time import time
from datetime import datetime

get_url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/Tester3FF%20Test/1676081515625045?token=sk_29735f4ddf4a47efb27623b229dda54a"
r=requests.get(get_url).json()[0]

r['valuationName']="hola"
print(r)
