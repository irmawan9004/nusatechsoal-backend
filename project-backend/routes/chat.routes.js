const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chat.controller');
const authMiddleware = require('../middleware/auth');

router.post('/message', authMiddleware, sendMessage);

module.exports = router;
