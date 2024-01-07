"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apparelData = require("../../data.json");
// Validate data structure and uniqueness of codes
apparelData.forEach((item) => {
    if (!item.code ||
        !Array.isArray(item.sizes) ||
        !item.sizes.every((size) => size.size && size.quantity !== undefined && size.price !== undefined)) {
        throw new Error("Invalid data structure for apparel items");
    }
});
// Check uniqueness of codes
const uniqueCodes = new Set();
apparelData.forEach((item) => {
    if (uniqueCodes.has(item.code)) {
        throw new Error("Duplicate code found for apparel items");
    }
    uniqueCodes.add(item.code);
});
