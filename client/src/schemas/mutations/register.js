import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      firstname
      email
    }
  }
`;
