import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query products($name: String, $category: ID, $id: ID) {
    products(filter: { category: $category, name: $name, id: $id }) {
      id
      name
      description
      categories {
        name
        id
      }
    }
  }
`;
