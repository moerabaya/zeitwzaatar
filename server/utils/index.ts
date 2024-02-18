import { Errors } from '../constants'

export type ErrorCode = keyof typeof Errors

export const getErrorCode = (errorName: ErrorCode) => {
  return Errors[errorName]
}
