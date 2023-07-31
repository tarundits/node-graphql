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

### Create User

```graphql
mutation createUser($first_name: String, $last_name: String, $age: Int, $email: String, $password: String) {
  create(
      first_name: $first_name, 
      last_name: $last_name, 
      age: $age, 
      email: $email, 
      password: $password
    ) {
        token
        user {
            id
            first_name
            last_name
            email
            age
        }
  }
}
```

```json
{
  "first_name": "Test",
  "last_name": "User",
  "age": 37,
  "email": "test.user@ditstek.com",
  "password": "12345678"
}
```

### Get Single User

```graphql
query getSingleUser($userId: ID) {
  user(id: $userId) {
    first_name
    last_name
  }
}
```

```json
{
  "userId": "DNHVrtZVaUMlJ0_n5SA7g"
}
```

### Update User

```graphql
mutation updateUser($first_name: String, $last_name: String, $age: Int, $email: String, $updateId: ID) {
  update(first_name: $first_name, last_name: $last_name, age: $age, email: $email, id: $updateId) {
    id
    first_name
    last_name
    email
    age
  }
}
```

```json
{
  "age": 23,
  "updateId": "DNHVrtZVaUMlJ0_n5SA7g"
}
```

### Delete User
```graphql
mutation deleteStudent($deleteId: ID) {
    delete(id: $deleteId) {
        id
    }
}
```

```json
{
    "deleteId": "DNHVrtZVaUMlJ0_n5SA7g"
}
```