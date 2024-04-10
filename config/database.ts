import { connect } from "mongoose";
import { Service } from "typedi";
import { EnvironmentVariables } from "./envVariable";

@Service()
export class DatabaseModels {
  constructor(private readonly ENV_VARIABLES: EnvironmentVariables) {
    connect(this.ENV_VARIABLES.MONGO_URI)
      .then(() => {
        console.log("Mongo DB Connected");
      })
      .catch((err: any) => {
        console.error(
          "Error connecting to mongo : " + this.ENV_VARIABLES.MONGO_URI + err,
        );
      });
  }
}
