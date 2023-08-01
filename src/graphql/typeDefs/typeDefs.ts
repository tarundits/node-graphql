import { gql } from "graphql-tag";
import { userTypeDefs } from "./users/userTypeDefs";
import { bookTypeDefs } from "./books/bookTypeDefs";

// You can also import other type definitions for properties and rooms if needed

const typeDefs = gql`
  ${userTypeDefs}
  ${bookTypeDefs}
`;

export { typeDefs };
