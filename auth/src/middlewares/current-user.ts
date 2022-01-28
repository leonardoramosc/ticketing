import { Request, Response, NextFunction } from "express";
import { Jwt } from "../services/jwt";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = req.session?.jwt;

  if (!jwt) {
    return next();
  }

  try {
    const currentUser = Jwt.getPayload(jwt) as UserPayload;
    req.currentUser = currentUser;
  } catch (err) {}

  next();
};
