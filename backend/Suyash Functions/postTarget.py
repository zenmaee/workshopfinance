def PostTarget(userID, TargetName, sectorName, subsectorName, revenueVal, ebitdaVal, target_symb, company_type):
  import requests
  now = datetime.now()
  timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
  timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
  url_to_add = "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/TARGETS?&token=sk_29735f4ddf4a47efb27623b229dda54a"
  r = requests.post(url_to_add, json=[
    {
        "userId": userID,
        "targetName": TargetName,
        "targetSector": sectorName,
        "targetSubsector": subsectorName,
        "targetRevenueLTM": revenueVal,
        "targetEbitdaLTM": ebitdaVal,
        "timeDateCreated": timeDateCreated, # generate this inside the function.
        "targetSymbol": target_symb,
        "type": company_type

    }
  ])
  return r 
