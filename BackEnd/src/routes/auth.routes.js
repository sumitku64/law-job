import express from 'express';
import multer from 'multer';
import path from 'path';
import { register, login, getCurrentUser } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use the parent directory of src for uploads
    const uploadsPath = path.join(process.cwd(), '..', 'uploads');
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .png and .pdf format allowed!'), false);
    }
  }
});

const uploadFields = upload.fields([
  { name: 'idProofFront', maxCount: 1 },
  { name: 'idProofBack', maxCount: 1 },
  { name: 'lawDegree', maxCount: 1 },
  { name: 'studentId', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);

router.post('/register', uploadFields, register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

export default router; 