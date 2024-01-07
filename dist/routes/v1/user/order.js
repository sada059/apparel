"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../../../controllers/OrderController"));
const router = express_1.default.Router();
router.get('/checkFulfillment', OrderController_1.default.checkFulfillment);
router.get('/getLowestCost', OrderController_1.default.getLowestCost);
exports.default = router;
