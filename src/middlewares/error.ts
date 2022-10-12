import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';
import { ZodError } from 'zod';
import ErrorCode from '../errors/ErrorCode';

const errorHandler: ErrorRequestHandler = (
  err: ErrorCode | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const { issues } = err;
    return res.status(400).json({ error: issues[0].message });
  }
  const { message, statusCode } = err;
  console.log(err.message);
  return res.status(statusCode || 500).json({ error: message });
};

export default errorHandler;
