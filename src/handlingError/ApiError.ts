//Server error handlers--> all the error handlers
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string, stack = '') {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
