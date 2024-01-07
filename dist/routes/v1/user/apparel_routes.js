"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApparelController_1 = __importDefault(require("../../../controllers/ApparelController"));
const router = express_1.default.Router();
router.put('/:code/update-stock', ApparelController_1.default.updateApparelStock);
router.put('/apparel/update-multiple-stock', ApparelController_1.default.updateMultipleApparelStock);
exports.default = router;
