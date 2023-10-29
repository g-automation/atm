"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const status_1 = __importDefault(require("./routes/status"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const atm_1 = __importDefault(require("./routes/atm"));
const app = (0, express_1.default)();
const uri = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/cluster0';
mongoose_1.default
    .connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api', status_1.default);
app.use('/accounts', accounts_1.default);
app.use('/atm', atm_1.default);
const PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
