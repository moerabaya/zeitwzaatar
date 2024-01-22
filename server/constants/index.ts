export const Errors = {
  USER_ALREADY_EXISTS: {
    message: "User already exists.",
    statusCode: 403,
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
