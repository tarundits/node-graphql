import { gql } from "graphql-tag";

const userTypeDefs = gql`

  # User object
  type User {
    id: String
    first_name: String
    last_name: String
    email: String
    age: Int
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    hello: String
    welcome(name: String): String
    users: [User] #return array of users
    user(id: ID): User #return user by id
  }

  # Mutation
  type Mutation {
    create(first_name: String, last_name: String, age: Int, email: String, password: String): AuthPayload
    update(id: ID, first_name: String, last_name: String, age: Int, email: String): User
    delete(id: ID): User
    login(email: String!, password: String!): AuthPayload
  }
`;

export { userTypeDefs };
