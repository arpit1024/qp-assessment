import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "./userModel";
import { GroceryItem } from "./groceryModel";

export interface Booking {
  user: Types.ObjectId | User;
  items: Array<Types.ObjectId | GroceryItem>;
  bookedAt?: Date;
}

const BookingSchema: Schema = new Schema<Booking>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "GroceryItem", required: true }],
  bookedAt: { type: Date, required: true, default: Date.now },
});

const BookingModel = mongoose.model<Booking>("Booking", BookingSchema);

export default BookingModel;
