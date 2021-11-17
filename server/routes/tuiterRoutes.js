const express = require("express");
const { getTuits, getTuitById } = require("../controllers/tuiterControllers");

const router = express.Router();

router.get("/", getTuits);
router.get("/:id", getTuitById);

module.exports = router;
