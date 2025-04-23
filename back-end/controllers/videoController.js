// Upload video
exports.uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file || !title) {
      return res.status(400).json({ message: "Video and title are required" });
    }

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'video', folder: 'videos' },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();

    // Save video metadata in the database
    const newVideo = new Video({
      title,
      public_id: result.public_id,
      secure_url: result.secure_url,
    });

    await newVideo.save();

    res.status(201).json({ message: "✅ Video uploaded successfully", video: newVideo });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: "❌ Upload failed", error: err.message });
  }
};

