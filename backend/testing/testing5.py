import pandas as pd
import requests
from time import time
from datetime import datetime

url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/CARS?&token=sk_29735f4ddf4a47efb27623b229dda54a"

r=requests.get(url).json()
current_date=r[0]['current_date']
estimated_value=r[0]['estimated_value']
make=r[0]['make']
mileage=r[0]['mileage']
model="F-250"
owner_count=r[0]['owner_count']
purchase_date=r[0]['purchase_date']
vin=r[0]['vin']
year=r[0]['year']

json=[
    {"current_date":current_date,"estimated_value":estimated_value,"make":make,"mileage":mileage,"model":model,"owner_count":owner_count,"purchase_date":purchase_date,"vin":vin,"year":year}
]

url_post="https://cloud.iexapis.com/v1/record/WORKSPACE/CARS?duplicateKeyHandling=true&wait=true&token=sk_29735f4ddf4a47efb27623b229dda54a" 
r = requests.put(url, json=json)
print(r.content)