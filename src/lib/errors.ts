export class AppError extends Error {
  constructor(
    message: string,
    public status = 400,
    public headers: Record<string, string> = {},
  ) {
    super(message);
    this.name = "AppError";
  }
}
