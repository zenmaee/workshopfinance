import pandas as pd
import requests
from time import time
from datetime import datetime
from time import time


#SAME AS GEN_VALUATION:
#update_FF_NAME
#add_FOOTBALLFIELD
#deleting Valuations in FootballField

def add_FOOTBALLFIELD(targetId,footballFieldType,footballFieldTimeSeries,iex_api_key):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+targetId+"/?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    print("targetId")
    print(targetId)
    targetSymbol=targetId.split("-")[1]
    footballFieldName="FOOTBALL FIELD "+targetSymbol+" "+str(len(resp)+1)
    now = datetime.now()
    timeDateCreated = now.strftime("%m/%d/%Y %H:%M:%S")# timeDateCreated value has to be fixed, can not be editted. It contains the
    timeDateCreated = timeDateCreated[:6]+timeDateCreated[8:-3] #time and date of when the valuation was generated for the first time
    #footballFieldTimeSeries=str(int(time()*1000000))

    url= "https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS?&token="+iex_api_key
    footballField=[
    {
        "footballFieldName":footballFieldName,
        "footballFieldTimeSeries":footballFieldTimeSeries,
        "footballFieldType":footballFieldType,
        "targetId":targetId,
        "timeDateCreated": timeDateCreated

    }
  ]
    r = requests.post(url, json=footballField)
    if r.status_code==200:

        return footballField


def update_FF_NAME(targetId, footballFieldTimeSeries,footballFieldName,iex_api_key):
    
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+targetId+"/"+footballFieldTimeSeries+"?token="+iex_api_key
    print(url)
    footballField=requests.get(url).json()
    print(footballField)
    footballField[0]['footballFieldName']=footballFieldName
    print("Ff")
    print(footballField)
    url="https://workshopfinance.iex.cloud/v1/record/WORKSHOPFINANCE/FOOTBALLFIELDS?duplicateKeyHandling=replace&wait=true&token="+iex_api_key
    print(footballField)
    r=requests.post(url, json=footballField)
    
    if r.status_code==200:
       ret="Successful FF Name update"
    else:
      ret="Unsuccessful FF Name update"

    print(ret)
    return ret

def delete_FOOTBALLFIELD(iex_api_key, footballFieldTimeSeries, targetId):
  #1. Obtain valuations of that FF
    footballFieldId=targetId+"-"+footballFieldTimeSeries
    urL_valuations = "https://workshopfinance.iex.cloud/v1/data/WORKSHOPFINANCE/VALUATIONS/" +footballFieldId +"?last=200&token=" + iex_api_key
    valuations=requests.get(urL_valuations).json()
    print("valuations")
    print(valuations)
    if valuations!=[]:
          
      for valuation in valuations:
        print(valuation)
        valuationId=footballFieldId+"-"+valuation['valuationTimeSeries']
        #valuationId=footballFieldId
        urL_comps = "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/COMPS/" +valuationId +"?last=200&token=" + iex_api_key
        comps=requests.get(urL_comps).json()
        if comps != []:
          for comp in comps:
              url_delete="https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/COMPS/" +valuationId + "/" + comp['compSymbol']+ "?&token=" + iex_api_key
              r=requests.delete(url_delete)
              print(r)
              if r.status_code==200:
                print("ok")
                continue
              else:
                ret="Error deleting comps from valuations from FF"
                print (ret)
                return ret
      url_delete =  "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/VALUATIONS/" + footballFieldId +"/"+valuation['valuationTimeSeries']+"?&token=" + iex_api_key
      r=requests.delete(url_delete)
      if r.status_code!=200:
        ret = "Error deleting valuation"       
        print(ret)
        return (ret)  


    url_delete = "https://WORKSHOPFINANCE.iex.cloud/v1/data/WORKSHOPFINANCE/FOOTBALLFIELDS/" + targetId +"/"+footballFieldTimeSeries+"?&token=" + iex_api_key
    r=requests.delete(url_delete)
    if r.status_code==200:
        ret = "Success deleting FF"
        print(ret)
        return ret
    else:
        ret =  "Error deleting FF"
        print(ret)
        return ret


    
