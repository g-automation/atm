"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/status', (req, res) => res.status(200).json({
    message: 'OK!',
}));
exports.default = router;
