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

# Create an application instance
# Define a route to fetch the avaialable articles
#getusers-not needed for now
app = create_app()
app.app_context().push()
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a" #add security


@app.route('/users', methods = ['GET'])
def get_users():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)

@app.route('/users', methods = ['POST'])
def add_users():
    #First we get info from frontend
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    password=request.json['password']

    #Then we send it to the database
    add_USERDATA(firstName, lastName, email, password,iex_api_key)

    return "Successful USERDATA POST"

@app.route('/users/<email>', methods = ['POST'])
def sign_ins(email):
    #First we get info from frontend

    password=request.json['password']
    print("hola?")
    #Then we send it to the database
    r=sign_in(email, password,iex_api_key)

    return r

@app.route('/valuations', methods = ['POST'])
def add_valuations():
    #First we get info from frontend
    footballFieldTimeSeries=request.json['footballFieldTimeSeries']
    userId=request.json['userId']
    footballFieldId=userId+footballFieldTimeSeries
    #Then we send it to the database
    add_VALUATION(footballFieldId,iex_api_key)
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
    userId=request.json['userId']
    footballFieldTimeSeries=request.json['footballFieldTimeSeries']
    valuationTimeSeries=request.json['valuationTimeSeries']
    footballFieldId=userId+footballFieldTimeSeries
    valuationCompsDate=request.json['valuationCompsDate']
    targetSymbol=request.json['targetSymbol']

    desired_multiples=["evToEbitdaLTM", "evToRevenueLTM"]
    #Ver cómo coger valuationId
    #Ver cómo coger basketofcomps
    generate_valuation(userId, targetSymbol, desired_multiples, valuationTimeSeries, valuationCompsDate,iex_api_key, footballFieldTimeSeries)

    return "Successful PUT"

@app.route('/valuations/<footballFieldId>', methods=['GET'])
def retrieve_valuations(footballFieldId):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/VALUATIONS/"+footballFieldId+"?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    print("estoy aqui")
    return resp

@app.route('/footballfields/<userId>/<footballFieldTimeSeries>', methods=['GET'])
def retrieve_footballfields(userId, footballFieldTimeSeries):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/FOOTBALLFIELDS/"+userId+"/"+footballFieldTimeSeries+"?last=1&token="+iex_api_key
    resp = requests.get(url).json()
    return resp

@app.route('/valuations', methods = ['DELETE'])

@app.route('/comps', methods = ['POST'])
def add_comps():
    compSymbol=request.json['compSymbol']
    valuationId=request.json['valuationId']
    valuationCompsDate=request.json['valuationCompsDate']

    add_COMP(compSymbol,valuationId,valuationCompsDate,iex_api_key)

@app.route('/footballFields/names/<userId>/<footballFieldTimeSeries>', methods = ['PUT'])
def update_ff_names(userId, footballFieldTimeSeries):
    
    #This UPDATE will only change the footballfield name. No recalculation should be done
    footballFieldName=request.json['footballFieldName']

    update_FF_NAME(userId, footballFieldTimeSeries,footballFieldName,iex_api_key)
    print("sucessful put")
    return "Successful PUT"

@app.route('/targets/<userId>/', methods=['GET'])
def retrieve_targets(userId):
    url="https://workshopfinance.iex.cloud/v1/data/workshopfinance/TARGETS/"+userId+"?last=100&token="+iex_api_key
    resp = requests.get(url).json()
    return resp

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
    app.run(host='192.168.1.56',port=5000, debug=True) #changes every time we change wifi
