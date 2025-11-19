import express from 'express';
import { createPresident, getPresidents, updatePresident, deletePresident } from '../controllers/presidentController.js';

const router = express.Router();

router.post('/president', createPresident);
router.get('/presidents', getPresidents);
router.put('/president/:id', updatePresident);
router.delete('/president/:id', deletePresident);

export default router;
