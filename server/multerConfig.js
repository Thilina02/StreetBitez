// multerConfig.js

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'stallUploads/'); // Save uploaded files to the 'stallUploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename the file to include a timestamp
  },
});

const upload = multer({ storage });

module.exports = upload;