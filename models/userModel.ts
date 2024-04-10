import mongoose, { Schema, Document, Types } from "mongoose";
import { GroceryItem } from "./groceryModel";

export interface User extends Document {
  userName: string;
  // Add other user properties as needed
}

const UserSchema: Schema = new Schema<User>({
  userName: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
