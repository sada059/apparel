"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ApparelController_1 = __importDefault(require("../controllers/ApparelController"));
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
        const apparelData = [
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
        fs_1.default.readFileSync.mockReturnValueOnce(JSON.stringify(apparelData));
        const req = {
            params: { code: "A001" },
            body: { size: "M", quantity: 12, price: 22 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await ApparelController_1.default.updateApparelStock(req, res);
        expect(fs_1.default.readFileSync).toHaveBeenCalledTimes(1);
        expect(fs_1.default.writeFileSync).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Stock updated successfully" });
    });
});
