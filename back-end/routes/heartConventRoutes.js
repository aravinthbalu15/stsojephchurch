import express from 'express';
import multer from 'multer';
import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage
} from '../controllers/heartConventController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/heartconvent', upload.single('image'), uploadImage);
router.get('/heartconvent', getImages);
router.delete('/heartconvent/:id', deleteImage);
router.put('/heartconvent/:id', updateImage);

export default router;
