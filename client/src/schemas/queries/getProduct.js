import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query ($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
    }
  }
`;
