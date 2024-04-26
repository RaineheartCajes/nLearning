import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set the uploads directory relative to the server root, not the current file location
const uploadsDir = path.join(__dirname, '../uploads'); // Adjusted path to one level up

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir); // The destination is now correctly pointing to 'uploads/'
  },
  filename: function(req, file, cb) {
    // Save with the fieldname, timestamp, and original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check File Type
const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allowed extensions
  const filetypes = /pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: PDFs Only!'));
  }
};

// Initialize upload
export const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});
