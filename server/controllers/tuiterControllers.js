const debug = require("debug")("tuit:controller");
const chalk = require("chalk");
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res) => {
  const tuits = await Tuit.find();
  debug(chalk.green("gETTING THEMM"));
  res.json(tuits);
};

const getTuitById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const searchTuit = await Tuit.findById(id);
    if (searchTuit) {
      debug(chalk.green("loaded tuit ʕ •ᴥ•ʔゝ☆"));
      res.json(searchTuit);
    } else {
      const error = new Error("Tuit not found (╯°□°）╯︵ ┻━┻");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const deleteTuit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const searchTuit = await Tuit.findByIdAndDelete(id);
    if (searchTuit) {
      debug(chalk.green("deleted item ʕ •ᴥ•ʔゝ☆ "));
      res.json(searchTuit);
    } else {
      const error = new Error("Tuit not found  (╯°□°）╯︵ ┻━┻");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createTuit = async (req, res, next) => {
  try {
    const tuit = req.body;
    const newTuit = await Tuit.create(tuit);
    debug(chalk.green("created item"));
    res.status(201).json(newTuit);
  } catch (error) {
    error.code = 400;
    error.message = "fallo";
    next(error);
  }
};

const createLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tuit = await Tuit.findById(id);
    if (tuit) {
      tuit.likes += 1;
      await tuit.save();
      res.status(200).json(tuit);
    } else {
      const error = new Error("Tuit not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.message = "Cannot search the tuit";
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getTuits,
  getTuitById,
  deleteTuit,
  createTuit,
  createLike,
};
