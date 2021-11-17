const debug = require("debug")("tuit:controller");
const chalk = require("chalk");
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res) => {
  const tuits = await Tuit.find();
  debug(chalk.green("gETTING THEMM"));
  res.json(tuits);
};

const getTuitById = async (req, res, next) => {
  const { id } = req.paramas;
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

module.exports = {
  getTuits,
  getTuitById,
};
