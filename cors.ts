import { NextFunction, Request, Response } from "express";

export function cors(req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Expose-Headers", [
    "Authorization",
    "authorization",
  ]);
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
}
