import { Service } from "typedi";
import UserModel from "../models/userModel";

@Service()
export class UserCollection {
  private userCollection;
  constructor() {
    this.userCollection = UserModel;
  }

  async findUserByUserName(userName: string) {
    return this.userCollection.findOne({ userName });
  }

  async saveUser(userName: string) {
    return new this.userCollection({ userName }).save();
  }
}
