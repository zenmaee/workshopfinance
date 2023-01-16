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
from app import create_app
from app import db
from models import Users, users_schema
from app import create_app
from functions import user_identification
# Create an application instance
# Define a route to fetch the avaialable articles
#getusers-not needed for now
app = create_app()
app.app_context().push()
iex_api_key="sk_29735f4ddf4a47efb27623b229dda54a"
@app.route('/users', methods = ['GET'])
def get_users():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)


#@app.route('/get/<id>/', methods = ['GET'])
#def post_details(id):
#    article = Articles.query.get(id)
#    return article.schema.jsonify(article)

@app.route('/users', methods = ['POST'])
def add_article():
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    password=request.json['password']

    user_identification.add_USERDATA(firstName, lastName, email, password,iex_api_key)
    return "Successful POST"

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
    app.run(host='192.168.1.158', port=5000, debug=True) #changes every time we change wifi