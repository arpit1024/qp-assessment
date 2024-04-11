import { Service } from "typedi";
import { GroceryItem } from "../models/groceryModel";
import { GroceryItemCollection } from "../databases/groceryItem";
import { ObjectId, Types } from "mongoose";
import { UserCollection } from "../databases/user";
import { BookingCollection } from "../databases/booking";
import { User } from "../models/userModel";
import moment from "moment";

@Service()
export class GroceryItemService {
  constructor(
    private readonly groceryItemCollection: GroceryItemCollection,
    private readonly userCollection: UserCollection,
    private readonly bookingCollection: BookingCollection,
  ) {}

  async createGroceryItem(payload: GroceryItem) {
    return this.groceryItemCollection.saveGroceryItem(payload);
  }
  async viewAllGroceries() {
    const allItems = await this.groceryItemCollection.getAllGroceryItems();
    const response = [...allItems].map((item: any) => {
      item.itemId = item._id;
      delete item._id;
      return item;
    });

    return response;
  }
  async deleteGroceryById(payload: string[]) {
    return this.groceryItemCollection.deleteGroceryItemByIds(payload);
  }
  async updateGrocery(id: string, payload: GroceryItem) {
    const groceryItem = await this.groceryItemCollection.findGroceryItem(id);
    if (!groceryItem) return new Error("Grocery item not found!");

    if (payload.name) groceryItem.name = payload.name;
    if (payload.price) groceryItem.price = payload.price;
    if (payload.category) groceryItem.category = payload.category;
    if (payload.brand) groceryItem.brand = payload.brand;
    if (payload.weight) groceryItem.weight = payload.weight;

    await groceryItem.save();

    return "OK";
  }
  async bookMultipleGroceries(userName: string, ids: string[]) {
    let user = await this.userCollection.findUserByUserName(userName);
    if (!user) {
      // save user
      user = await this.userCollection.saveUser(userName);
    }

    const groceryItems =
      await this.groceryItemCollection.bulkFindGroceries(ids);

    if (groceryItems.length !== ids.length) {
      return new Error("Not all id item are fetched");
    }

    const orderItems = {
      user: user._id,
      items: ids.map((id) => Types.ObjectId.createFromHexString(id)),
    };

    const bookingForUser = await this.bookingCollection.findBookingForUser(
      user.id,
    );
    if (bookingForUser) {
      bookingForUser.items.push(...orderItems.items);
      bookingForUser.save();
    } else {
      await this.bookingCollection.saveCollection(orderItems);
    }
    return "Order placed successfully";
  }

  async getBookingsOfAnItemById(id: string) {
    const response = await this.bookingCollection.findBookingForItem(id);

    if (!response || response.length == 0) {
      return "This item is never booked by anyone!";
    }

    const bookedStatusOfItem = response.map((entry) => {
      return {
        UserName: (entry.user as User).userName,
        bookedAt: entry.bookedAt,
      };
    });

    return {
      totalBookings: bookedStatusOfItem.length,
      bookingData: bookedStatusOfItem,
    };
  }

  async getTopBookedProducts() {
    const response = await this.bookingCollection.topBookedItems();
    return response;
  }

  async getItemBookedLastMonth() {
    const startDate = moment().subtract(1, 'month').startOf("month").toDate();
    const endDate = moment().subtract(1, 'month').endOf("month").toDate();

    const response = await this.bookingCollection.getItemBookedBetweenDates(
      startDate,
      endDate,
    );
    return response ?? [];
  }
}
