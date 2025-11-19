import express from 'express';
import multer from 'multer';
import {
  createParishMember,
  getParishMembers,
  updateParishMember,
  deleteParishMember
} from '../controllers/parishController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), createParishMember);
router.get('/', getParishMembers);
router.put('/:id', upload.single('image'), updateParishMember); // 👈 upload added here
router.delete('/:id', deleteParishMember);

export default router;
