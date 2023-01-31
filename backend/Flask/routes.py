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

##Installing libraries we need
from flask import current_app,jsonify,request
from app import create_app
from app import db
import models
from models import Multiples, multiples_schema,  various_multiples_schema

# Create an application instance
app = create_app()
multiplesDf=models.multiples
# Define a route to fetch the avaialable articles

@app.route("/multiples", methods=["GET"], strict_slashes=False)
def multiplesGen():
    comps=Multiples(0, round (multiplesDf.iloc[0].pe,3), round(multiplesDf.iloc[0].evEbitda,3), round(multiplesDf.iloc[0].evEbit,3), round (multiplesDf.iloc[0].evRevenue, 3))
    tgt=Multiples(1, round (multiplesDf.iloc[1].pe,3), round(multiplesDf.iloc[1].evEbitda,3), round(multiplesDf.iloc[1].evEbit,3),round(multiplesDf.iloc[1].evRevenue,3))
    
    multiples = [comps,tgt]
    results = various_multiples_schema.dump(multiples)

    return jsonify(results)


if __name__ == "__main__":
	app.run(debug=True)