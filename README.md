# Decentral Full-Stack Application Task

<img src="https://res.cloudinary.com/chuksmbanaso/image/upload/v1676099230/Screenshot_2023-02-11_at_08.04.48_nbnmcx.png" title="icon" alt="icon">

#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js...
2. Invoke in start()..
3. Setup .env in the root...
4. Add MONGO_URI with correct value...

#### Routers

- Blog.js
- User.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose...
- Hash Password (with bcryptjs)...
- Save User...
- Generate Token....
- Send Response with Token....

#### Login User

- Validate - email, password - in controller...
- If email or password is missing, throw BadRequest error...
- Find User
- Compare Passwords
- If no user or password does not match, throw Unauthenticated error
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors..
- Duplicate (Email)..
- Cast Error..

#### Security
- cors..


#### Models

---

### User

| field           | data_type | constraints |
| --------------- | --------- | ----------- |
| id              | string    | required    |
| username        | string    | required    |
| email           | string    | required    |
| password        | string    | required    |


### Post

| field        | data_type | constraints                                            |
| ------------ | --------- | ------------------------------------------------------ |
| id           | string    | required                                               |
| title        | string    | required                                               |
| description  | string    | required                                               |
| imageUrl     | string    | required                                               |
| timestamp    | boolean   | true                                                   |

#### APIS

### Login User

- Route: /api/v1/user/login
- Method: POST
- Body

```
 {
 "email": "john123@gmail.com",
 "password": "john123"
 }
```

- Responses
- Response Status: 200 OK

Success

```
{
    "result": {
        "_id": "6360e0bb9b4f1d36e4ae80af",
        "email": "john123@gmail.com",
        "username": "John Jane",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4xMjNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkd3E1b0FreUthWnd1VDJGbEozT3lhZUpsbElldFg3cno2bDljSXY1VkFVSHJ2UFdkUG1MZmUiLCJpZCI6IjYzNjBlMGJiOWI0ZjFkMzZlNGFlODBhZiIsImlhdCI6MTY2NzgwMTIwMCwiZXhwIjoxNjY3ODA0ODAwfQ.V0OXyhv44uvfT-WNRfT4T8IQVzeeWnyr2jF4C0tWtko"
}

```

### Register User

- Route: /api/v1/user/register
- Method: POST
- Body

  ```
  {
  "email": "kemi@gmail.com",
  "username": "Kemi",
  "password": "kemi123",
  "repeatPassword": "kemi123"
  }
  ```

- Responses
- Response Status: 200 OK

Success

```
{
    "result": {
        "id": "63e741286c35cf1e5cd14a7c",
        "username": "Kemi",
        "email": "kemi@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWlAZ21haWwuY29tIiwiaWQiOiI2M2U3NDEyODZjMzVjZjFlNWNkMTRhN2MiLCJpYXQiOjE2NzYwOTk4ODEsImV4cCI6MTY3NzgyNzg4MX0.OQxJpvj5bhJdkyTnO2h7X-fnTImX63i-OY_z1xUggOM"
}

```

### Create Post

- Route: /api/v1/posts/create
- Method: POST
- Body

  ```
 {
    "title": "yes",
    "description": "yes",
    "imageUrl": "yes"
 }
  ```


- Responses
- Response Status: 200 OK

Success


```
 {
    "newPost": {
        "title": "yes",
        "description": "yes",
        "imageUrl": "yes",
        "authorId": "63e481a63504a0752f4dffae",
        "authorName": "Joshua",
        "_id": "63e5fcdae4a3d7f505a2c309",
        "createdAt": "2023-02-10T08:14:18.841Z",
        "updatedAt": "2023-02-10T08:14:18.841Z",
        "__v": 0
    }
}
```


### Get All Posts

- Route: /api/v1/posts
- Method: GET

- Responses
- Response Status: 200 OK

Success



```
{
    "posts": [
        {
            "_id": "63e514ddfd5d17447baf4748",
            "title": "Natural language processing for contracts",
            "description": "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
            "imageUrl": "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
            "authorId": "63e4b2e68011ee43dae1d376",
            "authorName": "John Jane",
            "createdAt": "2023-02-09T15:44:29.646Z",
            "updatedAt": "2023-02-10T22:29:00.325Z",
            "__v": 0
        }
    ],

    "count": 1
}
```


### Get Single Post

- Route: /api/v1/posts/:id
- Method: GET

- Responses
- Response Status: 200 OK

Success



```
{
    "post": {
        "_id": "63e514ddfd5d17447baf4748",
        "title": "Natural language processing for contracts",
        "description": "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
        "imageUrl": "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
        "authorId": "63e4b2e68011ee43dae1d376",
        "authorName": "John Jane",
        "createdAt": "2023-02-09T15:44:29.646Z",
        "updatedAt": "2023-02-10T22:29:00.325Z",
        "__v": 0
    }
}
```


### Update Post

- Route: /api/v1/posts/update/:id
- Method: PATCH

- Body




```
 {
  "title": "Natural language processing for contracts",
  "description": "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
  "imageUrl": "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp"
}
```

- Responses
- Response Status: 200 OK

Success



```
{
    "_id": "63e514ddfd5d17447baf4748",
    "title": "Natural language processing for contracts",
    "description": "Manage high touch conversations in parallel. Drive engagement across your community. Build long term relationships with investors. Create personalized messages. that build trust. Demo at ETH SF with ZK-Starks, viewable on Youtube",
    "imageUrl": "https://ondecentral.com/static/4a73444ed18da690ecdb083b7929ae58/03d34/zkstark.webp",
    "authorId": "63e4b2e68011ee43dae1d376",
    "authorName": "John Jane",
    "createdAt": "2023-02-09T15:44:29.646Z",
    "updatedAt": "2023-02-11T07:27:44.485Z",
    "__v": 0
}
```


### Delete Post

- Route: /api/v1/posts/:id
- Method: DELETE

- Responses
- Response Status: 200 OK

Success



```
Post has been deleted successfully
```



