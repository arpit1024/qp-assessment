import { Service } from "typedi";
import { ObjectId, Types } from "mongoose";
import BookingModel, { Booking } from "../models/booking";

@Service()
export class BookingCollection {
  private bookingModel;
  constructor() {
    this.bookingModel = BookingModel;
  }

  async saveCollection(payload: Booking) {
    return new this.bookingModel(payload).save();
  }

  async findBookingForItem(id: string) {
    return this.bookingModel.find({ items: id }).populate("user").lean();
  }

  async findBookingForUser(id: ObjectId) {
    return this.bookingModel.findOne({ user: id });
  }

  async topBookedItems() {
    return this.bookingModel.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "groceryitems",
          localField: "_id",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      { $unwind: "$itemDetails" },
      { $project: { _id: 1, name: "$itemDetails.name", count: 1 } },
    ]);
  }

  async getItemBookedBetweenDates(startDate: Date, endDate: Date) {
    return this.bookingModel
      .find({
        bookedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate("items")
      .populate("user")
      .lean();
  }
}
