import { Router } from "express";

import {
  createGroceryItem,
  deleteGroceryItem,
  getBookingsOfAnItemById,
  getItemBookedLastMonth,
  getTopBookedProducts,
  updateExistingGrocery,
  viewAllGroceries,
} from "../controllers";

const adminRoutes = Router();

/**
 1. creating new grocery item requires payload:
    name price category brand weight
 2. deleting a grocery need to send itemId in the payload
 3. updating a grocery requires exact same payload like creation
 */
adminRoutes.post("/add-new-grocery", createGroceryItem);
adminRoutes.post("/delete-grocery-items", deleteGroceryItem);
adminRoutes.post("/update-grocery-by-itemid", updateExistingGrocery);
adminRoutes.get("/view-all-groceries", viewAllGroceries);

/**
 * Management Routes
 */
adminRoutes.post("/get-bookings-data-of-item-by-id", getBookingsOfAnItemById);
adminRoutes.get("/get-top-booked-items", getTopBookedProducts);
adminRoutes.get("/get-items-booked-last-month", getItemBookedLastMonth);

export default adminRoutes;
