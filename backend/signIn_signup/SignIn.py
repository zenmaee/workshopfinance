import hashlib
import requests

def SignIn(Email,Password):
  email_lower = Email.lower()
  EmailHash = hashlib.sha256(email_lower.encode('utf-8')).hexdigest()
  url_to_check = "https://cloud.iexapis.com/v1/data/WORKSHOPFINANCE/USERDATA/"+EmailHash+"?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  resp = requests.get(url_to_check).json()
  if ( len(resp) == 0 ):
    return "User Does Not Exist"  
  DB_password = resp[0]['Password']  
  PasswordHash = hashlib.sha256(password.encode('utf-8')).hexdigest()
  if(DB_password == PasswordHash ):
    return "correct password"
  else:
    return "Incorrect Password"  



password = "12gshbxs"
Email1 = "Sanjaybhatia@gmail.com"
SignIn(Email1,password)