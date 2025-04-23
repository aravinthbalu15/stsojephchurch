import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import adminRoutes from './routes/adminRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import festivalRoutes from './routes/festival.js';
import eventRoutes from "./routes/eventRoutes.js";
import heartConventRoutes from './routes/heartConventRoutes.js';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/api/videos', videoRoutes);
app.use('/api', adminRoutes);
app.use('/api/images', imageRoutes);  // ✅ Correctly wired
app.use('/api', announcementRoutes);
app.use("/api/festival", festivalRoutes);
app.use("/api/events", eventRoutes);
app.use('/api', heartConventRoutes);
import oldPriestRoutes from './routes/oldPriestRoutes.js';
app.use('/api/oldpriests', oldPriestRoutes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res) => {
  res.status(404).send('Route not found');
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
