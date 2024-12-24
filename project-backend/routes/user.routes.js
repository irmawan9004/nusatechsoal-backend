const express = require('express');
const router = express.Router();
const { updateUsername, updatePassword, updatePhoto } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');
const upload = require('../config/multer');  // Multer setup

// Route to update email
router.put('/update/username', authMiddleware, updateUsername);

// Route to update password
router.put('/update/password', authMiddleware, updatePassword);

// Route to update photo (using Multer to handle file upload)
router.put('/update/photo', authMiddleware, upload.single('photo'), updatePhoto); // 'photo' is the name of the field in form

module.exports = router;
