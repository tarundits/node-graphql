import { gql } from "graphql-tag";
import { userTypeDefs } from "./users/userTypeDefs";
// You can also import other type definitions for properties and rooms if needed

const typeDefs = gql`
  ${userTypeDefs}
`;

export { typeDefs };
