# ecommerce_server


**CREATE products**
----
    create new products

* **URL**

    /products

* **Method:**
  
    `POST`
    
*  **URL Params**

    not needed

* **Data Params**

    `name=[string]`,
    `image_url=[string]`,
    `price=[double]`,
    `stock=[integer]`,
    `userId=[integer]`

* **Success Response:**

  * **Code:** 201 CREATED<br />
    **Content:** `
    { 
        "id": 1,
        "name": "Playstation 5",
        "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
        "price": 5000000,
        "stock": 13,
        "userId": 3,
        "updatedAt": "2020-11-10T04:50:25.905Z",
        "createdAt": "2020-11-10T04:50:25.905Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : [
        "Name is required",
        "Image_url is required",
        "Price is required",
        "Price cannot be below zero",
        "Stock is required",
        "Stock cannot be below zero",
        ] 
    }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**GET products**
----
    Get all products

* **URL**

    /products

* **Method:**
  
    `GET`

*  **URL Params**

    not needed

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{
    "productList": [
        {
            "id": 1,
            "name": "Playstation 5",
            "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
            "price": 5000000,
            "stock": 13,
            "userId": 3,
            "createdAt": "2020-11-10T04:50:25.905Z",
            "updatedAt": "2020-11-10T04:50:25.905Z",
            "User": {
                "id": 3,
                "email": "admin@gmail.com",
                "password": "$2a$10$51WXo0l.XAC.Iq17r2mgbOfaG7JeovZp4QCmKKNDAbzdJh.nLwON2",
                "role": "admin",
                "createdAt": "2020-11-10T04:47:44.878Z",
                "updatedAt": "2020-11-10T04:47:44.878Z"
            }
        },
        {
            "id": 2,
            "name": "Playstation 4",
            "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
            "price": 4000000,
            "stock": 13,
            "userId": 3,
            "createdAt": "2020-11-10T04:50:25.905Z",
            "updatedAt": "2020-11-10T04:50:25.905Z",
            "User": {
                "id": 3,
                "email": "admin@gmail.com",
                "password": "$2a$10$51WXo0l.XAC.Iq17r2mgbOfaG7JeovZp4QCmKKNDAbzdJh.nLwON2",
                "role": "admin",
                "createdAt": "2020-11-10T04:47:44.878Z",
                "updatedAt": "2020-11-10T04:47:44.878Z"
            }
        }
    ],
    "loggedInUser": "admin@gmail.com"
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**GET product**
----
    Get one product

* **URL**

    /products/:id

* **Method:**
  
    `GET`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    {
        "id": 1,
        "name": "Playstation 5",
        "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
        "price": 5000000,
        "stock": 13,
        "userId": 3,
        "createdAt": "2020-11-10T04:50:25.905Z",
        "updatedAt": "2020-11-10T04:50:25.905Z"
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`


**UPDATE product**
----
    Update specific product

* **URL**

    /products/:id

* **Method:**
  
    `PUT`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    `name=[string]`,
    `image_url=[string]`,
    `price=[double]`,
    `stock=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
   {
        "id": 1,
        "name": "Xbox One",
        "image_url": "https://www.pikpng.com/pngl/b/99-990866_xbox-one-x-png-xbox-one-x-console.png",
        "price": 1500000,
        "stock": 9,
        "userId": 3,
        "createdAt": "2020-11-10T04:50:25.905Z",
        "updatedAt": "2020-11-10T04:58:07.638Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : [
        "Name is required",
        "Image_url is required",
        "Price is required",
        "Price cannot be below zero",
        "Stock is required",
        "Stock cannot be below zero",
        ] 
    }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`



**DELETE product**
----
    delete one product 

* **URL**

    /products/:id

* **Method:**
  
    `DELETE`

*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    not needed

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: 'product success to delete' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**REGISTER**
----
    register user

* **URL**

    /register

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    `{
        "id": 14,
        "email": "suma@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : ['Please use email format', 'Email is required', 'Password is required', 'Password too short'] }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**LOGIN**
----
    login user

* **URL**

    /login

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZWRlQGdtYWlsLmNvbSIsImlhdCI6MTYwMzgwOTA3MH0.ZOvOmP8v4sPgbE5sAxM2jeNPNPi9hr-UTllXyYaPw9A`
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ error : 'Wrong email/password' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`


**LOGIN GOOGLE**
----
    login user google

* **URL**

    /googleLogin

* **Method:**
  
    `POST`

*  **URL Params**

    **Required:**
 
    not needed

* **Data Params**

    `email=[string]`,
    `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZWRlQGdtYWlsLmNvbSIsImlhdCI6MTYwMzgwOTA3MH0.ZOvOmP8v4sPgbE5sAxM2jeNPNPi9hr-UTllXyYaPw9A`
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ error : 'Wrong email/password' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server is busy" }`