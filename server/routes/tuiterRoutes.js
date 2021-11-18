const express = require("express");
const { validate } = require("express-validation");
const {
  getTuits,
  getTuitById,
  deleteTuit,
  createTuit,
  createLike,
} = require("../controllers/tuiterControllers");
const tuitValidation = require("../schemas/tuitValidation");

const router = express.Router();

router.get("/", getTuits);
router.get("/:id", getTuitById);
router.delete("/delete/:id", deleteTuit);
router.post("/create", validate(tuitValidation), createTuit);
router.patch("/:id", createLike);

module.exports = router;
