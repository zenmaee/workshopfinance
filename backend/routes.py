##Installing packages we need
import subprocess
import sys

#Function to install packages:
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package]) 
#install('flask')
#install('flask_sqlalchemy')
#install('flask_migrate')
#install('flask_marshmallow')
#install('flask_cors')
#install('pandas')
#install('requests')
#install('termcolor')
#install('pymysql')

##Installing libraries we need
from flask import current_app,jsonify,request
#Importing from my one modules/packages
from app import create_app, db
from models import Users, users_schema
from functions.user_identification import *
from functions.gen_valuation import *
from functions.gen_footballfield import *
from functions.targets import *

# Create an application instance
# Define a route to fetch the avaialable articles
#getusers-not needed for now
app = create_app()
app.app_context().push()
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a" #add security


@app.route('/users', methods = ['GET'])
def get_users():
    url="https://cloud.iexapis.com/v1/data/WORKSHOPFINANCE/USERDATA/58abd882fba88d5d5d5f86aa60c1f825480353c496d0ebecb74760fc69001380?&token=sk_29735f4ddf4a47efb27623b229dda54a"
    resp = requests.get(url).json()
    print("estoy aqui")
    return resp 

@app.route('/users', methods = ['POST'])
def add_users():
    #First we get info from frontend
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    password=request.json['password']

    #Then we send it to the database
    r=add_USERDATA(firstName, lastName, email, password,iex_api_key)
    print(r)
    if r=="Email Exists":
        return r
    else:
        return  "Successful USERDATA POST"

@app.route('/users/<email>', methods = ['POST'])
def sign_ins(email):
    #First we get info from frontend

    password=request.json['password']
    #Then we send it to the database
    r=sign_in(email, password,iex_api_key)

    return r

@app.route('/valuations', methods = ['POST'])
def add_valuations():
    #First we get info from frontend
    footballFieldTimeSeries=request.json['footballFieldTimeSeries']
    targetId=request.json['targetId']
    valuationTimeSeries=request.json['valuationTimeSeries']

    footballFieldId=targetId+"-"+footballFieldTimeSeries

    #stat=
    
    #Then we send it to the database
    add_VALUATION(footballFieldId,iex_api_key, valuationTimeSeries)
    return "Successful VALUATION POST"

@app.route('/valuations/names', methods = ['PUT'])
def update_valuation_names():
    
    #This UPDATE will only change the valuation name. No recalculation should be done
    userId=request.json['userId']
    valuationName=request.json['valuationName']
    footballFieldTimeSeries=request.json['footballFieldTimeSeries']
    valuationTimeSeries=request.json['valuationTimeSeries']

    update_VALUATION_NAME(userId, footballFieldTimeSeries,valuationTimeSeries,valuationName,iex_api_key)

    return "Successful PUT"

@app.route('/valuations', methods = ['PUT'])
def generate_valuations():
    #When a user changes the valuation fields, the only one that will re-generate a new valuation is the asOfDate
    #This put will lead to a new valuation generation
    targetId=request.json['targetId']
    footballFieldTimeSeries=request.json['footballFieldTimeSeries']
    valuationTimeSeries=request.json['valuationTimeSeries']
    footballFieldId=targetId+footballFieldTimeSeries
    targetSymbol=request.json['targetSymbol']

    desired_multiples=["evToEbitdaLTM", "evToRevenueLTM"]
    #Ver cómo coger valuationId
    #Ver cómo coger basketofcomps
    generate_valuation(targetId, targetSymbol, desired_multiples, valuationTimeSeries, iex_api_key, footballFieldTimeSeries)

    return "Successful PUT"

@app.route('/valuations/<footballFieldId>', methods=['GET'])
def retrieve_valuations(footballFieldId):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/"+footballFieldId+"?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    print("estoy aqui")
    return resp

@app.route('/comps/<valuationId>', methods=['GET'])
def retrieve_comps(valuationId):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/COMPS/"+valuationId+"?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    return resp

@app.route('/footballfields/<targetId>/', methods=['GET'])
def retrieve_footballfields_bytarget(targetId):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+targetId+"?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    return resp

@app.route('/footballfields/<targetId>/<footballFieldTimeSeries>', methods=['GET'])
def retrieve_footballfields(targetId, footballFieldTimeSeries):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+targetId+"/"+footballFieldTimeSeries+"?last=1&token="+iex_api_key
    resp = requests.get(url).json()
    return resp

@app.route('/valuations', methods = ['DELETE'])

@app.route('/comps', methods = ['POST'])
def add_comps():
    compSymbol=request.json['compSymbol']
    valuationId=request.json['valuationId']

    r=add_COMP(compSymbol,valuationId,iex_api_key)
    print(r)
    return r

@app.route('/footballFields/names/<targetId>/<footballFieldTimeSeries>', methods = ['PUT'])
def update_ff_names(targetId, footballFieldTimeSeries):
    
    #This UPDATE will only change the footballfield name. No recalculation should be done
    footballFieldName=request.json['footballFieldName']
    print("footballFieldName")
    print(footballFieldName)
    r=update_FF_NAME(targetId, footballFieldTimeSeries,footballFieldName,iex_api_key)
    return "Successful PUT"

@app.route('/targets/<type>', methods=['POST'])
def add_targets(type):
    print("here")
    userId=request.json['userId']
    targetName=request.json['targetName']
    sectorName=request.json['sectorName']
    subsectorName=request.json['subsectorName']
    targetRevenueLTM=request.json['targetRevenueLTM']
    targetEbitdaLTM=request.json['targetRevenueLTM']
    
    print(targetRevenueLTM)

    if type=="private":
        targetSymbol=request.json['targetName']
        
    else:
        targetSymbol=request.json['targetSymbol']
    
    r=add_TARGET(userId, targetName, targetSymbol, sectorName, subsectorName, targetRevenueLTM, targetEbitdaLTM, type, iex_api_key)
    if r==200:

        return "Successful Target Post"
    else:
        return "UNSuccessful Target Post"

@app.route('/targets/<userId>/', methods=['GET'])
def retrieve_targets(userId):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/TARGETS/"+userId+"?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    return resp

@app.route('/targets/public/<tgtSymbol>', methods=['GET'])
def retrieve_pub_targets(tgtSymbol):
    fundamentals_url="https://cloud.iexapis.com/stable/time-series/fundamentals/"+tgtSymbol+"/ttm?token="+iex_api_key
    stock_url="https://cloud.iexapis.com/stable/stock/"+tgtSymbol+"/company?token="+iex_api_key
    fundamentals_resp = requests.get(fundamentals_url).json()[0]
    stock_resp = requests.get(stock_url).json()
    ebitda=fundamentals_resp['ebitdaReported']
    revenue=fundamentals_resp['revenue']
    name=stock_resp["companyName"]
    sector=stock_resp["sector"]

    resp={
        "ebitda":ebitda,
        "revenue":revenue,
        "name":name,
        "sector":sector,
        "type":"Public"
    }
    return resp

@app.route('/footballFields', methods=['POST'])
def add_footballfields():

    targetSymbol=request.json['targetSymbol']
    userId=request.json['userId']
    footballFieldType=request.json['footballFieldType']
    footballFieldTimeSeries = request.json['footballFieldTimeSeries']

    targetId=userId+"-"+targetSymbol
    #Then we send it to the database
    r = add_FOOTBALLFIELD(targetId,footballFieldType,footballFieldTimeSeries,iex_api_key)
    

    return {"success": r}

@app.route('/footballFields', methods=['DELETE'])
def delete_footballfields():
    footballFieldTimeSeries = request.json['footballFieldTimeSeries']
    targetId = request.json['targetId']
    
    print("delete ffs")
    r=delete_FOOTBALLFIELD(iex_api_key, footballFieldTimeSeries, targetId)
    
    return r

@app.route('/ticker/<input>', methods=['GET'])
def search_ticker(input):
    url1 = "https://cloud.iexapis.com/stable/search/" + input + "?token=" + iex_api_key
    temp1 = requests.get(url1)
    op1 = temp1.json()
    res1 = [ (sub['symbol'], sub['name']) for sub in op1 ]
    return res1

#@app.route('/update/<id>/', methods = ['PUT'])
#def update_article(id):
#    article= Articles.query.get(id)

#    title=request.json['title']
#    body=request.json['body']

#    article.title = title
#    article.body = body

#    db.session.commit()
#    return articles_schema.jsonify(article)

#@app.route('/delete/<id>/', methods = ['DELETE'])
#def article_delete(id):
#    article = Articles.query.get(id)
#    db.session.delete(article)
#    db.session.commit()

#    return articles_schema.jsonify(article)
if __name__=="__main__":
    app.run(host='10.239.21.226',port=5000, debug=True) #changes every time we change wifi
