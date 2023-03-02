
import hashlib
import requests

#add_USERDATA: Adds new user when there is a Sign Up
#signIn: Verifies if the user is introducing the password properly

def add_USERDATA(firstName,lastName,email,password, iex_api_key):
  email_lower = email.lower()
  emailHash = hashlib.sha256(email_lower.encode('utf-8')).hexdigest()
  url_to_check = "https://cloud.iexapis.com/v1/data/WORKSHOPFINANCE/USERDATA/"+emailHash+"?&token="+iex_api_key
  exists = len(requests.get(url_to_check).json())
  print("email add")
  print(email)
  print("emailHash add")
  print(emailHash)
  if ( exists != 0 ):
    return "Email Exists"
  
  url_to_add = "https://workshopfinance.iex.cloud/v1/data/workshopfinance/USERDATA?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  passwordHash = hashlib.sha256(password.encode('utf-8')).hexdigest()
  
  r = requests.post(url_to_add, json=[
    {
      "firstName": firstName,
      "lastName": lastName,
      "userId": emailHash,
      "email": email,
      "password": passwordHash
    }
  ])
  
  return r


def sign_in(email,password,iex_api_key):
  email_lower = email.lower()
  emailHash = hashlib.sha256(email_lower.encode('utf-8')).hexdigest()
  print("email")
  print(email)
  print("emailHash")
  print(emailHash)

  url_to_check = "https://cloud.iexapis.com/v1/data/WORKSHOPFINANCE/USERDATA/"+emailHash+"?&token="+iex_api_key
  resp = requests.get(url_to_check).json()
  if ( len(resp) == 0 ):
    return "User Does Not Exist"  
  db_password = resp[0]['password']  
  password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
  if(db_password == password_hash ):
    return "Correct password"
  else:
    return "Incorrect Password"  