// routes/ImgLinkRouter.js
import express from 'express';
import multer from 'multer';
import { uploadImage, getImages, updateImage, deleteImage } from '../controllers/imgLinkController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), uploadImage);
router.get('/', getImages);
router.put('/:id', upload.single('image'), updateImage);
router.delete('/:id', deleteImage);

export default router;
