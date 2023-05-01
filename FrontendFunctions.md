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
  * #### retrieveFootballFields: Retrieves list of user's Football fields
  * #### getLatestFF: Obtains latest Football Field of the user
* ### Coverage.js: Page to show list of football fields and targets
  * #### addFootballField: Adds a new football field from a target
  * #### addPrivateTarget: Adds a private company as a target
  * #### addPublicTarget: Adds a public company as a target
  * #### retrieveTargetData: Retrieves data from a target
  * #### searchTicker: Searches a company by its ticker
* ### FootballField.js: Page where football field is displayed, and where valuations are displayed. We can either visualize the football field controls or the valuation controls.
  * #### setTableValues: Creates a table with a minimum value and a maximum value depending on the valuations
  * #### searchTicker: Searches a company by its ticker
  * #### retrieveComps: Retrieves the comps of a valuations
  * #### calculateMedian: Obtains median multiple out of set of comps
  * #### calculateAverage: Obtains average multiple out of set of comps
  * #### deleteComp: Deletes comp from valuation
  * #### updateValuation: Updates either the stat, the metric, the color or the spread of a valuation
  * #### addComp: Adds a comp to a valuation
  * #### updateFootballFieldName: Changes the football field's name
  * #### addValuation: Adds a new valuation to the football field
  * #### deleteFootballField: Deletes football field from target
  * #### retrieveValuations: Retrieves the valuations from a football field
  * #### valuationNumbers: Gets only the numbers from the valuation that are needed to visualize it graphically
  * #### generateValuation: Connects with backend to generate a new valuation, when a new Comp is added to the basket of comps.
  * #### deleteValuation: Deletes valuation from football field


