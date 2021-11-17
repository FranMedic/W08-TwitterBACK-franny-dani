const express = require("express");

const router = express.Router();

router.get("/", getTuits);
module.exports = router;
