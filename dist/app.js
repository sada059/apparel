"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apparel_1 = __importDefault(require("./routes/v1/user/apparel"));
const order_1 = __importDefault(require("./routes/v1/user/order"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
async function initialize() {
    await setupAndloadUserRoutes();
    return app;
}
async function setupAndloadUserRoutes() {
    app.use('/apparel', apparel_1.default);
    app.use('/order', order_1.default);
    // sync("./routes/v1/user/*.ts").forEach(function (file) {
    //   app.use(`/${config.get("api.version")}`, require(path.resolve(file)));
    // });
}
app.initialize = initialize;
exports.default = app;
