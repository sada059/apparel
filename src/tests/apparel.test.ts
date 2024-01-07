import { Request, Response } from "express";
import fs from "fs";
import { Apparel } from "../models/Apparel";
import ApparelController from "../controllers/ApparelController";

// Mocking readDataFromFile and writeDataToFile functions
jest.mock("../utils/fileUtils", () => ({
  readDataFromFile: jest.fn(),
  writeDataToFile: jest.fn(),
}));

describe("ApparelController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updateApparelStock: should update the stock of a single apparel item", async () => {
    const apparelData: Apparel[] = [
      {
        code: "A001",
        name: "Sample Apparel",
        color: "blue",
        category: "jeans",
        sizes: [
          { size: "M", quantity: 10, price: 20 },
          { size: "L", quantity: 15, price: 25 },
        ],
      },
    ];

    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValueOnce(
      JSON.stringify(apparelData)
    );

    const req = {
        params: { code: "A001" },
        body: { size: "M", quantity: 12, price: 22 },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await ApparelController.updateApparelStock(req, res);

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Stock updated successfully" });
  });
});
