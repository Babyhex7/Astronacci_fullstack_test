// Route aggregator - gabungkan semua routes
const express = require("express");
const router = express.Router();

// Import routes modular
router.use("/auth", require("./auth.routes"));
router.use("/articles", require("./articles.routes"));
router.use("/videos", require("./videos.routes"));
router.use("/users", require("./users.routes"));

module.exports = router;
