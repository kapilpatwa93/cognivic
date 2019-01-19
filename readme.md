# Carworkz-Scraper
## Technologies
##### MongoDB version : 3.4.7
##### NodeJS version : 8.4.0
##### Framework : Express(4.15.5)

## APIs
#### 1) Scrap WebPage
endpoint : /api/scrap (GET)

Scraps : [https://www.carworkz.com/mumbai/regular-service](https://www.carworkz.com/mumbai/regular-service) created on **(25-03-2018)**.
 *#Note* : It may not work if structure of the dom changes


#### 2) Reset Data
endpoint : /api/reset (GET)

Clears all the documents from the *Service Centre* collection.


#### 3) Search Service Centre
endpoint : /api/search (POST)

Request object :  application/json

* **name** : string - name of the service centre[case insensitive]
* **authorized_by** : array of string - name of the company (eg.tata,maruti)[case insensitive]
* **services** : array of string - services provided by the centres (eg. reqular,paid)[case insensitive]
* **features** : array of string - features of the service centres (eg. pickup,card,cashless)[case insensitive]
* **min_ratings** : number - will show the centres having rating more than equal to this

All the above parameters are required(non empty) when included in the request object


### How to run?
1) Download
2) ` npm install`
3) `npm start` or  `node ./bin/www`

