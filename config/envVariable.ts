import { config } from "dotenv";
import { Service } from "typedi";

@Service()
export class EnvironmentVariables {
  NODE_ENV: "local" | "development" | "staging" | "production";
  MONGO_URI: string;
  JWT_SECRET_KEY: string;

  constructor() {
    config();
    this.NODE_ENV = process.env.NODE_ENV || ("local" as any);
    this.MONGO_URI = process.env.MONGO_URI as string;
    this.JWT_SECRET_KEY = (process.env.JWT_SECRET_KEY || "justademo") as string;
  }
}
