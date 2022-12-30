# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
1. npm install

```

 ### Before startup 
Setup a .env file with the following variables, e.g.:
```
MONGO_URL = mongodb+srv://dinh1:cis4339@4339project.c0anf4a.mongodb.net/test
```

### Compiles and hot-reloads for development
```
1. npm start
2. to quit connection: CTRL + C
```
# project-cis_4339_project_17

# Project Overview
<p>
This project uses MongoDB, Express, and NodeJS. <br>
 In order to get access to the database, you can use the MONGO_URL above and connect to Compass <br>
 All the collections in the model schema are related with client_id and multiple information can be retrieved from the database using client_id. <br>
 There were basic CRUD operations for each collection in the schema. <br>
 Additional information will be retrieved through different endpoints in this project.
 <p>


#### 1. CLIENT CRUD OPERATIONS
```
The API Documentation for the ClientData collection can be found at: 
https://documenter.getpostman.com/view/23632811/2s83zfRR1J
```
#### 2. EVENTS CRUD OPERATIONS
```
The API Documentation for the EventsData collection can be found at:
https://documenter.getpostman.com/view/17835609/2s83zfRR5i
```


#### 3. INTAKE FORM CRUD OPERATIONS
```
The API Documentation for the IntakeData collection can be found at:
https://documenter.getpostman.com/view/23632811/2s83zfRR5k
```

#### 4. ORGANIZATION CRUD OPERATIONS
```
The API Documentation for the Organization collection can be found at:
https://documenter.getpostman.com/view/23632785/2s83zfRR5m
```