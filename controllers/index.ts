import { Request, Response } from "express";
import Container from "typedi";
import {
  bookingSchemaValidation,
  groceryItemSchema,
  itemIdsValidator,
} from "../validations";
import { GroceryItemService } from "../services/groceryItem";

export async function createGroceryItem(req: Request, res: Response) {
  try {
    const validatePayload = groceryItemSchema.validate(req.body);
    if (validatePayload.error) {
      return res.status(400).send(validatePayload.error.message);
    }
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.createGroceryItem(
      validatePayload.value,
    );
    return res.sendStatus(201);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}
export async function viewAllGroceries(req: Request, res: Response) {
  try {
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.viewAllGroceries();
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}
export async function deleteGroceryItem(req: Request, res: Response) {
  try {
    const { itemIds } = req.body;
    const validatePayload = itemIdsValidator.validate(req.body);
    if (validatePayload.error) {
      return res.status(422).send(validatePayload.error.message);
    }
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.deleteGroceryById(itemIds);
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}
export async function updateExistingGrocery(req: Request, res: Response) {
  try {
    const itemId = req.body.itemId;
    const validatePayload = groceryItemSchema.validate(req.body);
    if (validatePayload.error) {
      return res.status(400).send(validatePayload.error.message);
    }
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.updateGrocery(itemId, req.body);
    if (response instanceof Error) {
      return res.status(422).send(response.message);
    }
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}

export async function bookMultipleGroceries(req: Request, res: Response) {
  try {
    const validatePayload = bookingSchemaValidation.validate(req.body);
    if (validatePayload.error) {
      return res.status(400).send(validatePayload.error.message);
    }
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.bookMultipleGroceries(
      req.body.userName,
      req.body.itemIds,
    );
    if (response instanceof Error) {
      return res.status(422).send(response.message);
  }
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}

export async function getBookingsOfAnItemById(req: Request, res: Response) {
  try {
    if (!req.body.itemId) {
      return res.send("itemId is required");
    }
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.getBookingsOfAnItemById(
      req.body.itemId,
    );
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}

export async function getTopBookedProducts(req: Request, res: Response) {
  try {
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.getTopBookedProducts();
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}

export async function getItemBookedLastMonth(req: Request, res: Response) {
  try {
    const groceryService = Container.get(GroceryItemService);
    const response = await groceryService.getItemBookedLastMonth();
    return res.send(response);
  } catch (err: any) {
    console.error(`error in creating grocery item: ${err}`);
    return res.sendStatus(500);
  }
}
