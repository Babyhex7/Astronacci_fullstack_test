const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/articles", require("./articles.routes"));
router.use("/videos", require("./videos.routes"));
router.use("/users", require("./users.routes"));

module.exports = router;
