app.get(
  "/users/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;

      await pool.query("UPDATE users SET token = NULL WHERE id = $1", [userId]);

      res.json({ msg: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
