import { CustomError } from "./custom-error";

export class UnautorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('unauthorized');
    Object.setPrototypeOf(this, UnautorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}