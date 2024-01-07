import { Request, Response } from "express";
import { Apparel } from "../models/Apparel";
import { readDataFromFile, writeDataToFile } from "../utils/fileUtils";

class ApparelController {
  public async updateApparelStock(req: Request, res: Response): Promise<void> {
    const { code } = req.params;
    const { size, quantity, price } = req.body;

    try {
      // Reading the apparel data from data.json file
      const apparelData: Apparel[] = await readDataFromFile();

      // First finding index of apparel item based on code
      const apparelItemIndex = apparelData.findIndex(
        (item) => item.code === code
      );

      if (apparelItemIndex !== -1) {
        // Update the stock quantity for the item
        const apparelItemSize = apparelData[apparelItemIndex].sizes.find(
          (apparelSize) => apparelSize.size === size
        );

        if (apparelItemSize) {
          apparelItemSize.quantity = quantity;
          apparelItemSize.price = price;
        }
        // Write the updated data back to the file
        await writeDataToFile(apparelData);

        res.status(200).json({ message: "Stock updated successfully" });
      } else {
        res.status(404).json({ message: "Apparel item not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error updating stock", error: error.message });
      } else {
        res.status(500).json({ message: "Error updating stock", error });
      }
    }
  }

  public async updateMultipleApparelStock(
    req: Request,
    res: Response
  ): Promise<void> {
    const updates = req.body; // array of updates containing code, size, and quantity for each item

    try {
      const apparelData: Apparel[] = await readDataFromFile();

      for (const update of updates) {
        const { code, size, quantity, price } = update;

        // Find the specific apparel item based on code
        const apparelItemIndex = apparelData.findIndex(
          (item) => item.code === code
        );

        if (apparelItemIndex !== -1) {
          const apparelItemSize = apparelData[apparelItemIndex].sizes.find(
            (apparelSize) => apparelSize.size === size
          );

          if (apparelItemSize) {
            apparelItemSize.quantity = quantity;
            apparelItemSize.price = price;
          }
        } else {
          res
            .status(400)
            .json({
              message: `Item with code ${code} and size ${size} not found.`,
            });
        }
      }

      // Write the updated data back to the file
      await writeDataToFile(apparelData);

      res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error updating stock", error: error.message });
      } else {
        res.status(500).json({ message: "Error updating stock", error });
      }
    }
  }
}

export default new ApparelController();
