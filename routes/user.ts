import { Router } from "express";
import { bookMultipleGroceries, viewAllGroceries } from "../controllers";

const userRoutes = Router();

userRoutes.post("/view-all-groceries", viewAllGroceries);
userRoutes.post("/book-multiple-groceries", bookMultipleGroceries);

export default userRoutes;
