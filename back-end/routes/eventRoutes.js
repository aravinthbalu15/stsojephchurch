// server/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Event = require('../models/eventModel');
const multer = require('multer');
const stream = require('stream');
const upload = multer(); // memory storage for buffering



// Upload Event (POST)
// server/routes/eventRoutes.js
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                return res.status(500).json({ message: "Upload failed", error });
            }

            const newEvent = new Event({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category, // 🆕 Add category
                image: result.secure_url
            });

            await newEvent.save();
            res.status(200).json(newEvent);
        });

        const streamifier = require('streamifier');
        streamifier.createReadStream(req.file.buffer).pipe(result);
    } catch (error) {
        console.error("Error uploading event:", error);
        res.status(500).json({ message: 'Failed to upload event' });
    }
});

// server/routes/eventRoutes.js
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        if (!events) {
            return res.status(404).json({ message: 'No events found' });
        }
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);  // Log full error
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});


// Delete Event (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: 'Failed to delete event' });
    }
});

module.exports = router;
