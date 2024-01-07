import { Request, Response } from "express";
// import { Order } from '../models/Order';
import { Apparel } from "../models/Apparel";
import { readDataFromFile } from "../utils/fileUtils";

class OrderController {
  public async checkFulfillment(req: Request, res: Response): Promise<void> {
    const { orderItems } = req.body;
    const apparelData: Apparel[] = readDataFromFile(); // Get apparel data from file
    let sizeInfo;
    for (const orderItem of orderItems) {
      const foundApparel = apparelData.find(
        (item) => item.code === orderItem.code
      );

      if (foundApparel) {
        sizeInfo = foundApparel.sizes.find(
          (size) => size.size === orderItem.size
        );
      } else {
        res
          .status(400)
          .json({
            message:
              "Requested apparel code is not found, order cannot be fulfilled",
          });
      }

      if (!sizeInfo || sizeInfo.quantity < orderItem.quantity) {
        res
          .status(400)
          .json({
            message:
              "stock is insufficient for given size, order cannot be fulfilled",
          });
      }
    }
    res.status(200).json({ message: "Order can be fulfilled" });
  }

  public async getLowestCost(req: Request, res: Response): Promise<void> {
    const apparelData: Apparel[] = readDataFromFile(); // Get apparel data from file
    let totalCost = 0; let sizeInfo;
    const { orderItems } = req.body;

    for (const orderItem of orderItems) {
      const foundApparel = apparelData.find(
        (item) => item.code === orderItem.code
      );

      if (foundApparel) {
        sizeInfo = foundApparel.sizes.find(
            (size) => size.size === orderItem.size
          );
      } else {
        res.status(500).json({ message: "Requested item is not found" });
      }

      if (sizeInfo) {
        const price = sizeInfo.price as number;
        const quantity = orderItem.quantity as number;
        totalCost += price * quantity; // Calculate the total cost for the order item
      } else {
        res
        .status(400)
        .json({
          message:
            "size not matching",
        });
      }

    }
    res.status(200).json({ message: `Total Cost of the order is ${totalCost}` });
  }

}

export default new OrderController();
