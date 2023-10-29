"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const atm_1 = require("../controllers/atm");
const router = (0, express_1.Router)();
router.put('/withdraw', atm_1.withdraw);
exports.default = router;
