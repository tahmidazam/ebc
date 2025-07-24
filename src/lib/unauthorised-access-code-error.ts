export class UnauthorisedAccessCodeError extends Error {
  constructor() {
    const message = "Invalid access code";
    super(message);
    this.name = "InvalidAccessCodeError";
    Object.setPrototypeOf(this, UnauthorisedAccessCodeError.prototype);
  }
}
