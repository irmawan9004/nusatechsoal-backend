const express = require('express');
const router = express.Router();
const { googleAuth, googleAuthCallback, googleAuthSuccess } = require('../controllers/auth.controller');

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthSuccess);

module.exports = router;