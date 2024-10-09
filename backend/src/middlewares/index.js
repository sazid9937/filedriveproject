import multer from 'multer';

// Set up multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with original name
  },
});

const upload = multer({ storage: storage });
