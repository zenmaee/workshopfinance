
import hashlib
import requests
FirstName1 = ""
LastName1 = ""
password = ""
Email1 = ""


def Add_USERDATA(FirstName,LastName,Email,Password):
  email_lower = Email.lower()
  EmailHash = hashlib.sha256(email_lower.encode('utf-8')).hexdigest()
  url_to_check = "https://cloud.iexapis.com/v1/data/WORKSHOPFINANCE/USERDATA/"+EmailHash+"?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  exists = len(requests.get(url_to_check).json())
  if ( exists != 0 ):
    return "Email Exists"
  
  url_to_add = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/USERDATA?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  PasswordHash = hashlib.sha256(password.encode('utf-8')).hexdigest()
  
  r = requests.post(url_to_add, json=[
    {
      "FirstName": FirstName,
      "LastName": LastName,
      "UserID": EmailHash,
      "Email": Email,
      "Password": PasswordHash
    }
  ])
  
  return r

Add_USERDATA(FirstName1, LastName1, Email1, password )
# If signup is successful <Response [200]>. If email exists "Email Exists".