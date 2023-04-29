# The Engineering Addendum
#### The engineering addendum has been created for any person beginning to work on Workshop Finance by Brendan Cahill. The purpose of this document is to save any future team weeks of detective work just and make develpers familiar with the current satus of work done. This document will present a walkthrough of any hurdles faced by the team.
#####  The intention of this document is to save time for developers working on this project and to give them a headstart on all the current progress made. It is expectec that any developer working on this project should update the engineering addendum to solve the purpose this document serves. 

<br/>

## The Gotchas of our project
* ### Backend 
  * #### Most of the hurdles faced by us were IEX cloud related. Since IEX cloud is our market data provider as well as our database host, most of the backend work was IEX related. 


  * #### Market Data provided: IEX was able to fulfill most of our data demands. We had smooth access to their data using basic API calls. We faced one problem with IEX cloud which because of which dated valuations were not implemented. IEX cloud does not have any data relating to backdated enterprise value. It is not able to provide enterprise value for a company on a certain date given the knowledge the market had on that date. This was IEX's only failiure as a data provider. When using thier enterprise value data it is also important to note that their data is not in accordance with an as of date.  


  * #### API calls: Most API calling was smooth. We began development with an API URL supplied to us by IEX cloud. This URL was later changed by IEX thereby making our pausing few functions of our working product. Other than this hiccup, most API calls from IEX cloud were smooth. Alot of time was spent by us going through the API documentaion and understanding the functions of this API. Use [this link](https://link-url-here.org) to access the API documentation from IEX cloud. The three main functions our app performs with the IEX cloud database are [read](https://iexcloud.io/documentation/getting-started/write-and-read-data.html), [add](https://iexcloud.io/documentation/getting-started/write-and-read-data.html), [delete](https://iexcloud.io/docs/apperate-apis/data/delete-data), and [update](https://iexcloud.io/documentation/managing-your-data/update-data.html).

  * #### Database hosting: The database host service was a bumpy road. We were able to send commands to the database smoothly but sometimes the database would fail to perform the request. IEX cloud database would log the command it its 'logs', but fail to successfully perform the request made by the client(Us). Many times the database would fail to update and delete rows from IEX cloud. We contacted IEX cloud for the same but they did not have any substantial solution. 

  * #### Python related backend challenges: Finance concepts were slightly challenging to implement. [This link](https://www.investopedia.com/terms/c/comparable-company-analysis-cca.asp#:~:text=A%20comparable%20company%20analysis%20(CCA)%20is%20a%20process%20used%20to,%2C%20such%20as%20EV%2FEBITDA.) will give you an easy overview of the finance concepts implemented by us. 

  * #### Other backend challenges: Othe than the core challenges listed above we had a smooth sail in terms of backend developments. 





* ### Frontend 

## The Current State of the project
#### Currently we have a fully working MVP of the application. We, a team of four engineers, worked in cohesion to deliver this MVP. 
#### The text given below summarizes the functionality and the purpose of the app.
* ### Purpose of the project: 
  * #### Workshop Finance is a deal idea generation tool, allowing users to quickly build valuations. The application enables a user to evaluate a given company based on a variety of metrics, (e.g. similar companies, trading multiples, time periods) and arrive at a valuation for a given company. The app then performs the necessary calculations and presents results through a unique visualization called a Football Field, a graphic which typically appears in investment banking pitch books. The mobile application allows users to create, refine, and view this football field directly through the app. Workshop Finance aims to enable deal idea generation, client communication (i.e. pitching to clients, initializing cases), and deal execution across the industry. It will become the primary medium through which users “tell the story” of a company’s valuation—the crux of any corporate finance pitch. This first-of-its-kind application will power the art of valuation through a combination of strict corporate finance practices and innovative user experience.


* ### Functionality achieved by us: 
  * #### Currently the app can perform a wide variety of functionality. We have come very far in terms of backend and frontend functionality. 
  * #### The following is a log list of functionality performed by the appication: 

    * #### User profiling: The app is able to create user profiles for each customer. This profile can be created through the user's email as well as their google account. User's also have an option of resetting their pasword incase they forget it. 
    * #### About page: Our app features an about page which tells the user about Workshop Finance. 
    * #### Football field: Each user can create a foodball field. The user can perform various updates to the elements of a football field e.g. Name, valuations, etc. 
    * #### Valuations: Valuations are a subset of foofball fields. Each football field has various valutions. The user can edit and update these valuations. The user can perform changes to valuations and its elements.
    * #### Basket of comparables: Each valuation has a basket of comparable companies. The user can edit and update the set of these comparable companies. The user can add more companies to this basket of delete existing companies in this "basket of comparables".
