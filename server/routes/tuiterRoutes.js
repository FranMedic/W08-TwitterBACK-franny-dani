const express = require("express");
const { getTuits } = require("../controllers/tuiterControllers");

const router = express.Router();

router.get("/", getTuits);
module.exports = router;
