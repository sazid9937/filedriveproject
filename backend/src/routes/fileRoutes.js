import express from 'express';
import multer from 'multer';
import File from '../models/file.model.js';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';


// cloudinary.config({ 
//     cloud_name: 'dxkcongal', 
//     api_key: '989356826191937', 
//     api_secret: '-BcdN_M8LmqyXgbft-pNI_2O14A' 
// });
// Derive __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../uploads/files'));
//     },
//     filename: function (req, file, cb) {
//         crypto.randomBytes(12, function (err, bytes) {
//             if (err) {
//                 return cb(err);
//             }
//             const uniqueSuffix = bytes.toString("hex");
//             const extension = path.extname(file.originalname);
//             const filename = file.fieldname + '-' + uniqueSuffix + extension;
//             cb(null, filename);
//         });
//     }
// });

// const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name:'dxkcongal',
    api_key: '989356826191937',
    api_secret: '-BcdN_M8LmqyXgbft-pNI_2O14A',
  });
  
  const router = express.Router();
  
  // Configure multer for file uploads
  const storage = multer.memoryStorage(); // Use memory storage for Cloudinary upload
  const upload = multer({ storage: storage });
  
  // POST /upload - Upload a file with a title
  router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      const title = req.body.title;
      const userId = req.body.userId;
  
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }
  
      // Upload to Cloudinary
      const uploadStream  = await cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Automatically detect file type
        async (error, result) => {
          if (error) {
            throw error;
          }
  
          // Save file details in the database
          const newFile = new File({
            title: title,
            filename: result.public_id,
            path: result.secure_url,
            size: file.size,
            mimetype: file.mimetype,
            userId: userId,
            isFavorite:false
          });
  
          await newFile.save();
  
          res.send({
            message: 'File uploaded and saved to database successfully!',
            file: result.secure_url,
          });
        }
      );
  
      uploadStream.end(file.buffer);
  
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      res.status(500).send({
        message: 'Error uploading file',
        error: error.message,
      });
    }
  });

export default router;
