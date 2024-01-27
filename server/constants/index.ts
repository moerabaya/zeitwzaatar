export const Errors = {
  USER_ALREADY_EXISTS: {
    message: "User already exists.",
    statusCode: 403,
  },
  PRODUCT_DOESNT_EXIST: {
    message: "Product doesn't exist.",
    statusCode: 404,
  },
  CART_DOESNT_EXIST: {
    message: "Cart doesn't exist.",
    statusCode: 404,
  },
  PASSWORD_DONT_MATCH: {
    message:
      "The password you entered don't match with existing account password",
    statusCode: 401,
  },
  ACCOUNT_NOT_FOUND: {
    message:
      "Account not found. Please check your email or register for a new account.",
    statusCode: 404,
  },
  INVALID_PASSWORD: {
    message: "Invalid password. Please check your password and try again.",
    statusCode: 401,
  },
  ACCOUNT_SUSPENDED: {
    message: "Invalid password. Please check your password and try again.",
    statusCode: 401,
  },
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
};
