"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataToFile = exports.readDataFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
const DATA_FILE = 'data.json';
const readDataFromFile = () => {
    try {
        const data = fs_1.default.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading data from file:', error);
        return [];
    }
};
exports.readDataFromFile = readDataFromFile;
const writeDataToFile = (data) => {
    try {
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    }
    catch (error) {
        console.error('Error writing data to file:', error);
    }
};
exports.writeDataToFile = writeDataToFile;
