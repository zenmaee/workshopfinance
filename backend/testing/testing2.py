import pandas as pd
import requests
from time import time
from datetime import datetime
from functions.gen_valuation import add_VALUATION
now = datetime.now()
timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time 
print(timeDateCreated-1)
print(type(timeDateCreated))

add_VALUATION(0,"0", "sk_29735f4ddf4a47efb27623b229dda54a")