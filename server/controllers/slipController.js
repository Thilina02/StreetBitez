const multer = require('multer');
const Slip = require('../models/Slip');

// Function to handle slip upload
const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a slip' });
    }

    const slip = new Slip({ slipPath: req.file.path });
    await slip.save();

    return res.status(200).json({ message: 'Slip uploaded successfully' });
  } catch (error) {
    console.error('Error uploading slip', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = {
  handleUpload,
  uploadMiddleware: upload.single('slip'),
};
