"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../controllers/accounts");
const router = (0, express_1.Router)();
router.get('/', accounts_1.getAccounts);
router.post('/create', accounts_1.createAccount);
exports.default = router;
