const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("tuit:server");

const chalk = require("chalk");
const {
  notFoundHandler,
  generalErrorMiddleware,
} = require("./middleware/errors");

const app = express();
app.use(cors());

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Listen to port: ${port}`));
    });

    server.on("error", (error) => {
      debug(chalk.red("we have an error"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`The port ${port} is already in use (╯°□°）╯︵ ┻━┻`));
        reject(error);
      }
    });
    resolve(server);
  });

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  debug(chalk.green("REQUEST ARRIVED ʕง•ᴥ•ʔง"));
  next();
});

app.use(notFoundHandler);
app.use(generalErrorMiddleware);

module.exports = { initializeServer, app };
