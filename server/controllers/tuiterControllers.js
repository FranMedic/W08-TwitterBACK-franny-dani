const debug = require("debug")("tuit:controller");
const chalk = require("chalk");
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res) => {
  const tuits = await Tuit.find();
  debug(chalk.green("gETTING THEMM"));
  res.json(tuits);
};

module.exports = {
  getTuits,
};
