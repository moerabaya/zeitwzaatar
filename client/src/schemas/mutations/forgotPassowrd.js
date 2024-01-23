import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword(
    $email: String!
    $password: String!
    $newPassword: String!
  ) {
    forgotPassword(
      input: { email: $email, password: $password, newPassword: $newPassword }
    ) {
      email
    }
  }
`;
