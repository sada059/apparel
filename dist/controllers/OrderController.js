"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileUtils_1 = require("../utils/fileUtils");
class OrderController {
    async checkFulfillment(req, res) {
        const { orderItems } = req.body;
        const apparelData = (0, fileUtils_1.readDataFromFile)(); // Get apparel data from file
        let sizeInfo;
        for (const orderItem of orderItems) {
            const foundApparel = apparelData.find((item) => item.code === orderItem.code);
            if (foundApparel) {
                sizeInfo = foundApparel.sizes.find((size) => size.size === orderItem.size);
            }
            else {
                res
                    .status(400)
                    .json({
                    message: "Requested apparel code is not found, order cannot be fulfilled",
                });
            }
            if (!sizeInfo || sizeInfo.quantity < orderItem.quantity) {
                res
                    .status(400)
                    .json({
                    message: "stock is insufficient for given size, order cannot be fulfilled",
                });
            }
        }
        res.status(200).json({ message: "Order can be fulfilled" });
    }
    async getLowestCost(req, res) {
        const apparelData = (0, fileUtils_1.readDataFromFile)(); // Get apparel data from file
        let totalCost = 0;
        let sizeInfo;
        const { orderItems } = req.body;
        for (const orderItem of orderItems) {
            const foundApparel = apparelData.find((item) => item.code === orderItem.code);
            if (foundApparel) {
                sizeInfo = foundApparel.sizes.find((size) => size.size === orderItem.size);
            }
            else {
                res.status(500).json({ message: "Requested item is not found" });
            }
            if (sizeInfo) {
                const price = sizeInfo.price;
                const quantity = orderItem.quantity;
                totalCost += price * quantity; // Calculate the total cost for the order item
            }
            else {
                res
                    .status(400)
                    .json({
                    message: "size not matching",
                });
            }
        }
        res.status(200).json({ message: `Total Cost of the order is ${totalCost}` });
    }
}
exports.default = new OrderController();
