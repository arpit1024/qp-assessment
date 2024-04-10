import { Service } from "typedi";
import GroceryItemModel, { GroceryItem } from "../models/groceryModel";
import { ObjectId, Types } from "mongoose";

@Service()
export class GroceryItemCollection {
  private groceryItemModel;
  constructor() {
    this.groceryItemModel = GroceryItemModel;
  }

  async getAllGroceryItems() {
    return this.groceryItemModel.find().lean();
  }

  async saveGroceryItem(payload: GroceryItem) {
    return new this.groceryItemModel(payload).save();
  }

  async findGroceryItem(id: string) {
    return this.groceryItemModel.findOne({
      _id: Types.ObjectId.createFromHexString(id),
    });
  }

  async bulkFindGroceries(ids: string[]) {
    return this.groceryItemModel.find({
      _id: { $in: ids.map((id) => Types.ObjectId.createFromHexString(id)) },
    });
  }

  async deleteGroceryItemByIds(ids: string[]) {
    return this.groceryItemModel.deleteMany({
      _id: { $in: ids.map((id) => Types.ObjectId.createFromHexString(id)) },
    });
  }
}
