import { Errors } from "../constants";

export type ErrorCode = keyof typeof Errors;

export class ServerError extends Error {
  constructor(message: ErrorCode) {
    super(message);
    return new Error(message);
  }

  static getError(errorName: ErrorCode) {
    return Errors[errorName];
  }
}

// ServerError = ServerErrorC
// global.server
