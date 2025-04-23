const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: 'Invalid token' });

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Token verification error:', err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' }); // More specific message
    }

    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
