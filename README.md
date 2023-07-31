# Architecture
Node and GraphQL
## Getting started

The command below will install all node_modules, link required packages and start the application.

`npm install && npm run dev`

## Postman Query

### User Login

```graphql
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            id
            last_name
            age
        }
    }
}
```

```json
{
    "email": "test@testgmail.com",
    "password": "12345678"
}
```

### Get All Users

```graphql
query getUsers {
    users {
        id
        first_name
        last_name
        email
        age
    }
}
```