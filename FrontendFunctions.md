# Frontend functions
### This is a list of all functions we worked on. It also gives a brief description of what each function is about. Any "Gotchas" faced by me are also highlighted here.  


* ### SignUp.js: Page where user registers
  * #### handleCheckEmail: Validates email
  * #### checkPasswordValidity: Password must not contain Whitespaces
  * #### isContainsUppercase: Checks uppercase in password
  * #### isContainsLowercase: Checks lowercase in password
  * #### isContainsNumber: Checks digit in password
  * #### isValidLength: Checks password is 8-16 char log
  * #### addUsers: adds user to database
  * #### handleLogin: Uses all mentioned functions to check if a user can be added to database
* ### SignUpSignIn.js: Sign in if user already has account, goes to sign up otherwise
  * #### retrieveTargets: Retrieves the targets of the user who signed in
  * #### signIn: Logs in into the user's account
* ### Profile_About.js: Provides account information
* ### HomeScreen.js: Home screen to which you can access our 3 main screens: FootballField, Coverage and Profile_About
  * #### signIn: Logs in into the user's account



#### add_valuations:Receives valuation data from frontend and sends it to add_VALUATION.
* #### update_valuation_names: Receives use valuation name from frontend and sends it to update_VALUATION_NAME
* #### update_VALUATION_METRIC: Receives new valuation metric from frontend and sends it to update_VALUATION_METRIC
* #### update_valuation_stat:Receives new valuation stat from frontend and sends it to update_VALUATION_STAT
* #### update_valuation_spread:Receives new valuation spread from frontend and sends it to update_VALUATION_SPREAD
* #### update_valuation_color:Receives new valuation spread from frontend and sends it to update_VALUATION_COLOR
* #### generate_valuations: Receives valuation and football field info to genenrate a valuation by calling the function generate_valautions
* #### retrieve_valuations: GETs valuations
* #### retireve_comps: GETs comps
* #### retrieve_footballfields_bytarget: GET football fields by targets
* #### retrieve_footballfields: GET football fields by targets and footballfieldTimeSeries
* #### add_comps: POST comps. Receives comp and valuation data and sends it to add_COMP
* #### delete_comps: DELETE comps. Receives comp and valuation data and sends it to delete_COMP
* #### update_ff_names: Receives football field data and sends it to update_FF_NAME
* #### add_targets: Receives football field data and sends it to add_TARGET
* #### retreieve_targets: Retrieves targets by userId
* #### retreieve_targets: Retrieves targets by symbol
* #### add_footballfields: Receives data about targets and football fields and sends it to add_FOOTBALLFIELD 
* #### delete_footballfields: Receives data about targets and football fields and sends it to delete_FOOTBALLFIELD
* #### delete_valuations: ceives data about football fields and valuations and sends it to delete_VALUATION
* #### search_ticker: GETs a company's name and ticker depending on its ticker

* ### get-pip.py
* ### manage.py
* ### models.py
* ### routes.py: 
* ### gen_valuation.py 
  * #### get_metrics:Gets financial metrics from the comps and the target from IEX
  * #### add_COMP:Adds comparables to COMPS table from IEX
  * #### update_VALUATION:Update the valuation's calculations. As soon as a new comp is added to the valuation, a valuation is generated and the valuation already added to the table is updated
  * #### get_output: Obtains the outputs (both the multiples and the enterprise value) of a valuation
  * #### retrieve_valuation_comps: Retrieves the comps that belong to a valuation
  * #### generate_valuation: Generates a valuation. Then calls update_VALUATION to update the valuation with the valuation generated
  * #### add_VALUATION:Adds new valuation to VALUATION table from IEX. This only contains the default values
  * #### update_VALUATION_NAME: Updates the name of the "valuation" in the database.
  * #### update_VALUATION_METRIC: Updates the field "metric" in our VALUATIONS table.
  * #### update_VALUATION_STAT:  Updates the field "stat" in our VALUATIONS table.
  * #### update_VALUATION_SPREAD: Updates the field "spread" in our VALUATIONS table.
  * #### update_VALUATION_COLOR: Updates the field "color" in our VALUATIONS table.
  * #### delete_VALUATION: Deletes a "valuation" in the database.
  * #### delete_COMP: Deletes a  "comp" in the database.
* ### Targets.py
  * #### add_TARGET: Adds a target to the dataset
* ### user_identification.py
  * #### add_USERDATA: Creates a user profile. Adds user data to the database so that login can be facilitated at anytime. 
  * #### sign_in: Authenticates user's login credentials at the backend. Does this by cross checking the the user credentials with the user database in IEX cloud. 
* ### testing.py: File to test python functions
