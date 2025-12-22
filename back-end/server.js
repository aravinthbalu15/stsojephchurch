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
import oldPriestRoutes from './routes/oldPriestRoutes.js';
import acRouter from './routes/acRouter.js';
import parishRouter from './routes/parishRouter.js';
import vtRouter from "./routes/vtRoutes.js";
import ImgLinkRouter from './routes/imgLinkRouter.js';
import videoLinkRouter from './routes/videoLinkRouter.js';
// 🆕 Family Route
import familyRoutes from "./routes/familyRoutes.js";
const app = express();
const PORT = process.env.PORT || 9000;

/* ---------------------------------------
   FIX 1: Increase body limit (413 error)
---------------------------------------- */
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

/* ---------------------------------------
   FIX 2: Fix CORS error
---------------------------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      // ✅ CUSTOM DOMAIN (THIS WAS MISSING)
      "https://stjosephskamplar.org",
      "https://www.stjosephskamplar.org",

      // ⭐ Add all Vercel domains
      "https://stsojephchurch.vercel.app",
      "https://stsojephchurch-git-main-aravinthbalu15s-projects.vercel.app",
      "https://stsojephchurch-2crw1t6d0-aravinthbalu15s-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());



/* ---------------------------------------
   ROUTES
---------------------------------------- */
app.use('/api/videos', videoRoutes);
app.use('/api', adminRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/announcements', announcementRoutes);
app.use("/api/festival", festivalRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/heartconvent', heartConventRoutes);
app.use('/api/oldpriests', oldPriestRoutes);
app.use('/api/acmembers', acRouter);
app.use('/api/parish', parishRouter);
app.use('/api/visiting-time', vtRouter);
app.use('/api/imglink', ImgLinkRouter);
app.use('/api/videolink', videoLinkRouter);
// 🆕 Added
app.use("/api/family", familyRoutes);


import anbiyamRoutes from "./routes/anbiyamRoutes.js";
app.use("/api/anbiyam", anbiyamRoutes);

import presidentRoutes from "./routes/presidentRoutes.js";

app.use("/api/president", presidentRoutes);


/* ---------------------------------------
   404 Route Handler
---------------------------------------- */
app.use((req, res) => {
  res.status(404).send('Route not found');
});

/* ---------------------------------------
   MONGO CONNECTION
---------------------------------------- */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

/* ---------------------------------------
   SERVER START
---------------------------------------- */
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
