# Backend Functions
### This is a list of all functions I worked on. It also gives a brief description of what each function is about. Any "Gotchas" faced by me are also highlighted here.  

* ### EV_Function.ipynb: ipynb containing all progress made by the team on producing an as of dated valution. The code uses Intrnio API to look for specific quarterly or yearly filing for a particular company. It then uses these filings of a particular as of date to produce the enterprise value. 
* ### FLask_learn.ipynb: Flask learning tutorial for the team.
* ### workshop_fin_rough.ipynb: Initial learning tutotial and experimentation done by the team. 
* ### gen_footballfield.py
  * #### add_FOOTBALLFIELD
  * #### update_FF_NAME: Updates the name of the "football field" in the database. 
  * #### delete_FOOTBALLFIELD: deletes a particular "football field" from the database.      
* ### app.py
* ### get-pip.py
* ### manage.py
* ### models.py
* ### routes.py
* ### gen_valuation.py 
  * #### get_metrics:Gets financial metrics from the comps and the target from IEX
  * #### add_COMP:Adds comparables to COMPS table from IEX
  * #### add_VALUATION:Adds new valuation to VALUATION table from IEX. This only contains the default values
  * #### update_VALUATION: As soon as a new comp is added to the valuation, a valuation is generated and the valuation already added to the table is updated
  * #### get_output:Gets valuation output
  * #### generate_valuation:Generates Valuation. Main function to call  
  * #### get_output: 
  * #### retrieve_valuation_comps
  * #### update_VALUATION_NAME: Updates the name of the "valuation" in the database.
  * #### update_VALUATION_CHANGES
  * #### update_VALUATION_METRIC
  * #### update_VALUATION_STAT
  * #### update_VALUATION_SPREAD
  * #### update_VALUATION_COLOR
  * #### delete_VALUATION: Deletes the "valuation" in the database.
  * #### delete_COMP
* ### Targets.py
  * #### add_TARGET
* ### user_identification.py
  * #### add_USERDATA: Creates a user profile. Adds user data to the database so that login can be facilitated at anytime. 
  * #### sign_in: Authenticates user's login credentials at the backend. Does this by cross checking the the user credentials with the user database in IEX cloud. 
* ### testing.py
* ### testing2.py
* ### testing3.py
* ### testing4.py
* ### testing5.py
* ### testing6.py
* ### testing7.py
