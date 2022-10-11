import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const { issues } = err;
    return res.status(400).json({ message: issues[0].message });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const catalogedError = errorCatalog[messageAsErrorType];

  if (catalogedError) {
    const { error, statusCode } = catalogedError;
    return res.status(statusCode).json({ error });
  }
  console.log(err.message);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
