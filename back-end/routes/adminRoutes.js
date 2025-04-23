const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

router.post('/admin/register', adminController.register);
router.post('/admin/login', adminController.login);
router.get('/admin/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ valid: true, adminId: req.admin._id });
});
router.get('/admin/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard', admin: req.admin });
});

module.exports = router;
