#                                <img src="reibo.png" alt="drawing" width="200"/>

# REIBO can be found at:
https://reibo.herokuapp.com

# What is reibo?

REIBO is an API designed to showcase the developers skills with regards to back end development. The API
can be used to conduct many HTTP related actions such as get,post,patch,delete various articles, comments, users and topics. This API utilises services such as EXPRESS, Node.js, Postgresql. In essence, REIBO was designed to recreate some of the functions utilised in many apps seen today.

# Setup instructions:

- First: set up and move in to a new directory
- Second: clone this repository by copying and pasting this command in your terminal.
```
https://github.com/Hammamsgit/Backend-Portfolio-Project.git 

```

(Make sure you create a suitable directory)


- install dependencies by running the following command:
```
npm i

```
(This should install all dependencies needed e.g. jest, supertest, dotenv etc)

- once this is done, then begin seeding the database
(all necessary steps have been pretaken)

make sure the script section in your package.json looks like this:

```
  "scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js",
    "test": "jest",
    "prepare": "husky install",
    "start": "node listen.js"
  
  },
  ```

- for security purposes, create two .env.* files in your directory.
the file names should look like this:

``` 
.env.development

.env.test
```
- copy the following in to your .env.development file:
```
PGDATABASE=nc_news
```
- copy the following in to your .env.test file:
```
PGDATABASE=nc_news_test
```
(This is to distinguish between our test mode and developer mode; each have their own database)



- next: start the server by running this command:

``` 
npm run setup-dbs

```
test files are located in the __tests__ folder.
- when testing, type the following command (from the directory containing this folder) in to your terminal:
```
npm t

```
this should perform all the tests included in this folder


# Version

this project was created using:

 - (PostgreSQL) 14.1 

 - Node.js v15.14.0






