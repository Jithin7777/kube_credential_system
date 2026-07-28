import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import logger from "../logger/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    logger.warn(
      {
        method: req.method,
        url: req.originalUrl,
      },
      err.message
    );

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  logger.error(err, "Unhandled error");

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};