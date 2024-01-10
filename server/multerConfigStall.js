const multer = require('multer');
const path = require('path');

// Define storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded images will be stored
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const timestamp = Date.now();
    cb(null, `${timestamp}${extname}`); // Rename the uploaded file with a timestamp
  },
});

// Create a multer instance with the specified storage options
const multerstallUpload = multer({ storage });

module.exports = multerstallUpload;
