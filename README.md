# Ally Doc

> Ally Doc is an e-health platform and an affordable health service that provides you with complete health solutions and trusted to fulfill you and your family’s health. With Ally Doc, you can directly contact your doctor via chat, call or video call. Ally Doc feature helps covid-infected patients that are doing self isolation at home, by easily getting teleconsultation help.

> Easy Navigation :

-   [User Endpoints](#user-endpoints)
    -   [Create User](#post-usercreate)
    -   [Login User](#post-userlogin)
    -   [Get all Users](#get-user)
    -   [Get User by Id](#get-userid)
    -   [Update User Image](#patch-/userimageid)
    -   [Update User Data](#patch-userid)
    -   [Update User Payment](#patch-userpaymentid)
    -   [Delete User](#delete-userid)
-   [Admin Endpoints](#admin-endpoints)
    -   [Create Admin](#post-adminregister)
    -   [Login Admin](#post-adminlogin)
-   [Doctor Endpoints](#doctor-endpoints)

## USER ENDPOINTS

### POST /user/create

> Create New User

_Request Params_

```
Not needed
```

_Request Headers_

```
Not needed
```

_Request Body_

```
Multipart/form-data
{
    "email": <email> : String (Required),
    "password": <password> : String (Required),
    "username": <username> : String (Required),
    "height": <height> : Number (Required),
    "weight": <weight> : Number (Required),
    "age": <age> : Number (Required),
    "phone_number": <phone number> : String (Required),
    "gender": <gender> : String (Required),
    "display_picture": <Image file> : File (Required)
}
```

_Response ( 201 - OK )_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.        eyJpZCI6IjYxMjMyOGRjYWZkN2Y5MDAxMzNkYWYzMCIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjI5Njk0MTcyfQ.wOJ6POwuz7CSUF_SsctYEaM7ctprtfhUBCw_EXa210k"
}
```

_Response ( 400 - Bad Request)_

```
{
  "msg": "Email is required, Password is required, Username is required, Height is required, Weight is required, Age is required, Phone Number is required"
}
```

_response (500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error'
}
```

### POST /user/login

> Login User

_Request Headers_

```
Not needed
```

_Request Params_

```
Not needed
```

_Request Body_

```
{
    "email": <email> : String (Required),
    "password": <password> : String (Required)
}
```

_Response ( 200 - OK )_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjEwNWVkODRhNTg4MDAxMzI4NmI4NyIsImVtYWlsIjoid2lsc29uQG1haWwuY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2Mjk2OTQ4NDd9.MUSDW3L1wEDQoFygnJtUowfzqp0qjC7dxnZnZjXLhZA"
}
```

_Response ( 400 - Bad Request )_

```
{
    "msg": "Email is required"
}
{
    "msg": "Password is required"
}
{
    "msg": "Invalid email/password"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error"
}
```

### GET /user

> Find all Users

_Request Headers_

```
{
    "access_token": <ADMIN access token>
}
```

_Request Params_

```
Not Needed
```

_Request Body_

```
Not Needed
```

_Response ( 200 - OK )_

```
[
    {
        "role": "User",
        "_id": "6120d2c530d05d0013c78f35",
        "email": "test@mail.com",
        "username": "test",
        "display_picture": "https://ik.imagekit.io/gubdxdpscil/   Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
        "height": 100,
        "weight": 100,
        "age": 100,
        "phone_number": "asdfasdf",
        "gender": "Male",
        "timestamp": "2021-08-21T10:17:41.064Z",
        "__v": 0
    }
]
```

_Response ( 401 - Unauthorized )_

```
{
  "msg": "You are not logged in"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error"
}
```

### GET /user/:id

> Find user by Id

_Request Headers_

```
{
    "access_token": <User access token>
}
```

_Request Params_

```
{
    "id": <user id>
}
```

_Request Body_

```
Not Needed
```

_Response ( 200 - OK )_

```
{
    "payment": {
        "card_number": "",
        "cvv": "",
        "expiry_month": "",
        "expiry_year": ""
    },
    "role": "User",
    "_id": "6120d2c530d05d0013c78f35",
    "email": "test@mail.com",
    "username": "test",
    "display_picture": "https://ik.imagekit.io/gubdxdpscil/   Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
    "height": 100,
    "weight": 100,
    "age": 100,
    "phone_number": "asdfasdf",
    "gender": "Male",
    "timestamp": "2021-08-21T10:17:41.064Z",
    "__v": 0
}
```

_Response ( 401 - Unauthorized )_

```
{
    "msg": "You are not logged in"
}
```

_Response ( 404 - Not Found )_

```
{
    "msg": "User not found"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error"
}
```

### PATCH /user/image/:id

> Update User Display Picture

_Request Headers_

```
    "access_token": <User access token>
```

_Request Params_

```
{
    "id": <user id>
}
```

_Request Body_

```
{
    "display_picture": <Image file>
}
```

_Response ( 201 - Created )_

```
{
    "msg": "Profile picture updated successfully"
}
```

_Response ( 401 - Unauthorized )_

```
{
    "msg": "You are not logged in"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error"
}
```

### PATCH /user/:id

> Update User Data

_Request Headers_

```
{
    "access_token": <user access token>
}
```

_Request Params_

```
{
    "id": <user id>
}
```

_Request Body_

```
{
    {
        "email": <new email> : String (Required),
        "height": <new height> : Number (Required),
        "weight": <new weight> : Number (Required),
        "age": <new age> : Number (Required),
        "phone_number": <new phone number> : String (Required)
    }
}
```

_Response ( 201 - Created )_

```
{
    "payment": {
        "card_number": "",
        "cvv": "",
        "expiry_month": "",
        "expiry_year": ""
    },
    "role": "User",
    "_id": "6120d2c530d05d0013c78f35",
    "email": "asdf",
    "username": "test",
    "display_picture": "https://ik.imagekit.io/gubdxdpscil/Screenshot_20190618-201202_2_ZqWKa7ZEy.jpg",
    "height": 100,
    "weight": 100,
    "age": 1,
    "phone_number": "asdfasdf",
    "gender": null,
    "timestamp": "2021-08-21T10:17:41.064Z",
    "__v": 0
}
```

_Response ( 400 - Bad Request )_

```
{
    "msg": "Email cannot be empty"
}
{
    "msg": "Height cannot be empty"
}
{
    "msg": "Weight cannot be empty"
}
{
    "msg": "Age cannot be empty"
}
{
    "msg": "Phone Number cannot be empty"
}
```

_Response ( 401 - Unauthorized )_

```
{
    "msg": "You are not logged in"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error"
}
```

-   [Go to Top](#ally-doc)

### PATCH /user/payment/:id

> Update user payment

_Request Headers_

```
{
    "access_token": <user access token>
}
```

_Request Params_

```
{
    "id": <user id>
}
```

_Request Body_

```
{
    "card_number": <user card number> : String (Required),
    "cvv": <user cvv> : String (Required),
    "expiry_month": <user card exp month> : String (Required),
    "expiry_month": <user card exp year> : String (Required),
}
```

_Response ( 200 - OK )_

```
{
    "msg": "Payment updated successfully"
}
```

_Response ( 400 - Bad Request )_

```
{
    "msg": "Card Number cannot be empty"
}
{
    "msg": "CVV cannot be empty"
}
{
    "msg": "Expiry month cannot be empty"
}
{
    "msg": "Expiry year cannot be empty"
}
```

_Response ( 401 - Unauthorized )_

```
{
    "msg": "You are not logged in"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "msg": "Internal Server Error"
}
```

### DELETE /user/:id

> Delete User

_Request Headers_

```
{
    "access_token": <user access token>
}
```

_Request Params_

```
{
    "id": <user id>
}
```

_Request Body_

```
Not needed
```

_Response ( 200 - OK )_

```
{
    "msg": "User deleted successfully"
}
```

_Response ( 401 - Unauthorized )_

```
{
    "msg": "You are not logged in"
}
```

_Response ( 404 - Not Found )_

```
{
    "msg": "User not found"
}
```

## ADMIN ENDPOINTS

### POST /admin/register

> Register admin

_Request Headers_

```
Not needed
```

_Request Params_

```
Not needed
```

_Request Body_

```
{
    "email": <email> : String (Required),
    "password": <password> : String (Required),
    "username": <username> : String (Required)
}
```

_Response ( 201 - Created )_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0OTI2NjM1M2MzMDAyMDQxM2UyMSIsInVzZXJuYW1lIjoiYXNkZiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYyOTcwMjQzOH0.rtSel1SoQB64K1SFM3Z2IpeJexUlhWtZzC6SJI6MR3I"
}
```

_Response ( 400 - Bad Request )_

```
{
    "message": "email cannot be empty"
}
{
    "message": "password cannot be empty"
}
{
    "message": "username cannot be empty"
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "message": "Internal Server Error"
}
```

### POST /admin/login

> Login User

_Request Headers_

```
Not Needed
```

_Request Params_

```
Not Needed
```

_Request Body_

```
{
    "email": <email>,
    "password": <password>
}
```

_Response ( 200 - OK )_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM0ZWQ3NjM1M2MzMDAyMDQxM2UzNSIsInVzZXJuYW1lIjoiYXNkZiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYyOTcwMzkwM30.w1OGEoMYtjW5dl3uqXNmXxLy-uScCMI9kWev1pZMoM0"
}
```

_Response ( 401 - Unauthorized )_

```
{
    "message": "Email/Password is Wrong"
}
{
    "message": "Data Not Found" // Kalo password salah
}
```

_Response ( 500 - Internal Server Error )_

```
{
    "message": "Internal Server Error"
}
```

-   [Go to Top](#ally-doc)

## DOCTOR ENDPOINTS

-   [Go to Top](#ally-doc)
