import express from 'express';
import multer from 'multer';
import { createMember, getMembers, updateMember, deleteMember } from '../controllers/acController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Simple local upload before sending to Cloudinary

router.post('/', upload.single('image'), createMember);
router.get('/', getMembers);
router.put('/:id', upload.single('image'), updateMember);
router.delete('/:id', deleteMember);

export default router;
