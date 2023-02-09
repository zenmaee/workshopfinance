##Installing packages we need
import subprocess
import sys

#Function to install packages:
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package]) 
install('flask')
install('flask_sqlalchemy')
install('flask_migrate')
install('flask_marshmallow')
install('flask_cors')
install('pandas')
install('requests')
install('termcolor')
install('pymysql')

##Installing libraries we need
from flask import current_app,jsonify,request
#Importing from my one modules/packages
from app import create_app, db
from models import Users, users_schema
from functions.user_identification import add_USERDATA
from functions.gen_valuation import add_VALUATION, add_COMP ,update_VALUATION, generate_valuation
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

@app.route('/valuations', methods = ['POST'])
def add_valuations():
    #First we get info from frontend
    footballFieldName=request.json['footballFieldName']
    userId=request.json['userId']
    footballFieldId=userId+footballFieldName
    #Then we send it to the database
    add_VALUATION(footballFieldId,iex_api_key)
    return "Successful VALUATION POST"

@app.route('/valuations/names', methods = ['PUT'])
def update_valuation_names():
    
    #This UPDATE will only change the valuation name. No recalculation should be done
    valuationCompsDate=request.json['footballFieldId']
    valuationId=request.json['valuationId']
    
    return "Successful POST"

@app.route('/valuations', methods = ['PUT'])
def generate_valuations():
    #When a user changes the valuation fields, the only one that will re-generate a new valuation is the asOfDate
    #This put will lead to a new valuation generation
    valuationCompsDate=request.json['footballFieldId']
    valuationId=request.json['valuationId']
    targetId=request.json['targetId']
    valuationName=request.json['valuationName']
    footballFieldName=request.json['footballFieldName']
    #Ver cómo coger valuationId
    #Ver cómo coger basketofcomps
    generate_valuation(valuationId, targetId, ["evToEbitdaLTM", "evToRevenueLTM"], valuationName, valuationCompsDate,iex_api_key,footballFieldName)
    return "Successful POST"

@app.route('/valuations', methods = ['GET'])


@app.route('/valuations', methods = ['DELETE'])

@app.route('/comps', methods = ['POST'])
def add_comps():
    compSymbol=request.json['compSymbol']
    valuationId=request.json['valuationId']
    valuationCompsDate=request.json['valuationCompsDate']

    add_COMP(compSymbol,valuationId,valuationCompsDate,iex_api_key)

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
    app.run(host='10.239.16.29', port=5000, debug=True) #changes every time we change wifi