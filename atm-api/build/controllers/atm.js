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
exports.withdraw = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, amount } = req.query;
        const account = yield Account_1.default.findOne({ accountNumber });
        if (!account)
            return res.status(400).send('Account not found');
        if (account.balance < amount)
            return res.status(400).send('Insufficient balance');
        let amountRemaining = amount;
        let banknotes = { '100': 0, '50': 0, '20': 0, '10': 0 };
        [100, 50, 20, 10].forEach(note => {
            while (amountRemaining >= note) {
                amountRemaining -= note;
                banknotes[note]++;
            }
        });
        if (amountRemaining > 0)
            return res
                .status(400)
                .send('The requested amount cannot be withdrawn with the available banknotes');
        account.balance -= amount;
        yield account.save();
        return res.status(200).json({
            message: 'Withdrawal successful!',
            banknotes: banknotes,
            balance: account.balance,
        });
    }
    catch (error) {
        return res.status(500).send(`Internal server error: ${error}`);
    }
});
exports.withdraw = withdraw;
