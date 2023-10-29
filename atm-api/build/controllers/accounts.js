"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.getAccounts = void 0;
const uuid_1 = require("uuid");
const Account_1 = __importDefault(require("../models/Account"));
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber } = req.query;
        const accounts = accountNumber
            ? yield Account_1.default.findOne({ accountNumber })
            : yield Account_1.default.find();
        return res.status(200).json(accounts);
    }
    catch (error) {
        return res.status(500).send(`Internal server error: ${error}`);
    }
});
exports.getAccounts = getAccounts;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = new Account_1.default({ accountNumber: (0, uuid_1.v4)() });
        yield account.save();
        return res.status(200).json({
            message: 'Account created successfully!',
            account,
            balance: account.balance,
        });
    }
    catch (error) {
        return res.status(500).send(`Error creating a new account: ${error}`);
    }
});
exports.createAccount = createAccount;
