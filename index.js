// Protected route example: File upload for planet images
app.post(
  "/planets/:id/image",
  authorize,
  upload.single("image"),
  async (req, res) => {
    const planetId = req.params.id;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ msg: "No image uploaded" });
    }

    try {
      await pool.query("UPDATE planets SET image = $2 WHERE id = $1", [
        planetId,
        image.path,
      ]);

      res.json({ msg: "Image uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
