import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "./userModel";

export interface GroceryItem extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  category?: string;
  brand?: string;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

const GroceryItemSchema: Schema = new Schema<GroceryItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  weight: { type: Number },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

GroceryItemSchema.index({ name: 1 });

const GroceryItemModel = mongoose.model<GroceryItem>(
  "GroceryItem",
  GroceryItemSchema,
);

export default GroceryItemModel;
