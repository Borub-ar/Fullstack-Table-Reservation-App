class AppError extends Error {
  errorCode: number;
  statusCode: number;
  fields?: string[];

  constructor(errorCode: number, message: string, statusCode: number, fields?: string[]) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.fields = fields ?? [];
  }
}

export default AppError;
