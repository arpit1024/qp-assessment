// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import Container from "typedi";
// import { EnvironmentVariables } from "../config/envVariable";
// import { UserModel } from "../models/userModel";

// const envVariables = Container.get(EnvironmentVariables);

// export async function userAuthentication(req: Request, res: Response, next: NextFunction) {
//   const startTime = +Date.now();
//   const clientIp = (req.headers["X-Forwarded-For"] as string) || req.ip;
//   const xAuthToken = req.headers["x-auth-token"];
//   try {
//     const accessToken =
//       ((req.headers["authorization"] ||
//         req.headers["Authorization"]) as string) || undefined;
//     if (!accessToken) {
//       return res.status(401).send("Token Not Provided");
//     }

//     const userObj = jwt.verify(accessToken, envVariables.JWT_SECRET_KEY);
//     req.user = userObj as User;
//     return next();
//   } catch (error: any) {
//     console.log(error);
//     if (error.message == "invalid token")
//       return res.status(401).send("Unauthorized!");
//     return res.sendStatus(500);
//   }
// }
