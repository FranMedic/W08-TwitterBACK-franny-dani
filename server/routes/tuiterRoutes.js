const express = require("express");
const {
  getTuits,
  getTuitById,
  deleteTuit,
  createTuit,
  createLike,
} = require("../controllers/tuiterControllers");

const router = express.Router();

router.get("/", getTuits);
router.get("/:id", getTuitById);
router.delete("/delete/:id", deleteTuit);
router.post("/create", createTuit);
router.patch("/:id", createLike);

module.exports = router;
