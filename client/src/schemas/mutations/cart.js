import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation addToCart($id: ID, $quantity: Int) {
    addToCart(input: { id: $id, quantity: $quantity }) {
      id
      quantity
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($id: ID, $quantity: Int) {
    removeFromCart(input: { id: $id, quantity: $quantity }) {
      id
      quantity
    }
  }
`;

export const GET_ALL_CART_ITEMS = gql`
  query getAllCartItems {
    getAllCartItems {
      id
      quantity
      name
      price
    }
  }
`;
