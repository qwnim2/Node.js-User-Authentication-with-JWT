# Node.js User Authentication with JWT
This Node.js application provides a basic authentication system using bcrypt and JSON Web Tokens (JWT). Users can register and log in to access protected resources.



## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/node-authentication.git
```

2. Install dependencies:
```
npm install
```
3. Add environment variables in the `.env` file:
```
ACCESS_TOKEN_SECRET=<Your_ACCESS_TOKEN_SECRET>
REFRESH_TOKEN_SECRET=<Your_REFRESH_TOKEN_SECRET>
```
---
## Usage 
Start the server
```
npm run devStart
```

## Example
Test APIs with Postman or REST Client

1. Registration endpoint /register
```
POST http://localhost:3000/register
Content-Type: application/json

{
    "name": "Tommy",
    "password": "123"
}
```
Response with the hashed password
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 75
ETag: W/"4b-2fBDaZOYYC/FK6yawmtSkT0OhIE"
Date: Wed, 22 Mar 2023 09:11:47 GMT
Connection: close

Your hased PW: $2a$10$Em4cbO4ZxMbNb2byERveSOpGBmOBKHpg5ZdKvInCxySPW26TU.HFC
```

2. Another user registration with the same password

```
POST http://localhost:3000/register
Content-Type: application/json

{
    "name": "Tyler",
    "password": "123"
}
```
Same password, but different hased password
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 75
ETag: W/"4b-qz4TxSFMdMtWVVrK5pkcOY+y70E"
Date: Wed, 22 Mar 2023 09:14:45 GMT
Connection: close

Your hased PW: $2a$10$XUAgD0blUNHz3P//y3cYIOCHK6bwnAC49f3n8fjgnebquNhHtaUYS
```

3. Login with name: Tommy, password: 123, endpoint /login

```
# @name Auth
POST http://localhost:3000/login
Content-Type: application/json

{
    "name": "Tommy",
    "password": "123"
}
```
If successful, you will get your token
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 270
ETag: W/"10e-b2YRBgZvhBqPAo0sX/hw6sXDZ3I"
Date: Wed, 22 Mar 2023 09:16:52 GMT
Connection: close

{
  "accessToken": "<Your_Token>"
}
```

4. Retrieve the user list with your token, endpoint /userlist
```
GET http://localhost:3000/userlist
Authorization: Bearer {{Auth.response.body.accessToken}}
```
Example user list
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 225
ETag: W/"e1-vsnG9Lp7MzTYelSVmVdapQj2eXw"
Date: Wed, 22 Mar 2023 09:20:09 GMT
Connection: close

[
  {
    "id": "1679476801204",
    "name": "Tommy",
    "password": "$2a$10$HbZgejjez53DNxF3BXTrle39sSAZLt.8pFceynbNbgZw0Kyx38t2q"
  },
  {
    "id": "1679476804601",
    "name": "Tyler",
    "password": "$2a$10$nqnQnLVf/iyIKKEnaG4ize/isH8nPazJRkGOLaT0yJsZXqpIora4W"
  }
]
```
5. Try without token

```
GET http://localhost:3000/userlist
```
Get unauthorized
```
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 12
ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
Date: Wed, 22 Mar 2023 09:21:58 GMT
Connection: close

Unauthorized
```

6. Try an invalid token

```
GET http://localhost:3000/userlist
Authorization: Bearer Invalid_Token
```
Get forbidden
```
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 9
ETag: W/"9-PatfYBLj4Um1qTm5zrukoLhNyPU"
Date: Wed, 22 Mar 2023 09:22:46 GMT
Connection: close

Forbidden
```
