const multer = require('multer');
const path = require('path');

// Set up storage engine for Multer (storing files on disk)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Path where uploaded files will be stored (ensure this folder exists)
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and the original file extension
    const ext = path.extname(file.originalname);  // Get file extension
    cb(null, `${Date.now()}${ext}`);  // The filename will be a timestamp followed by the file extension
  }
});

// File filter to accept only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Only allow image files
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only images are allowed.'));
  }
  cb(null, true);  // Accept the file
};

// Multer configuration object
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },  // Set file size limit to 5MB
});

module.exports = upload;
