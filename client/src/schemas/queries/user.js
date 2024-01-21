import { gql } from "@apollo/client";

export const USER = gql`
  query {
    user {
      id
      firstname
      lastname
      email
      avatar
    }
  }
`;
