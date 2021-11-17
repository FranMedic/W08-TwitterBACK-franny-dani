require("dotenv").config();

const dBInitializer = require("./database/index");
const { initializeServer } = require("./server/index");

const tuitahDB = process.env.MONGO_TUITAH_DB;
const port = process.env.PORT ?? process.env.SERVER_PORT_RS ?? 6000;

(async () => {
  try {
    await dBInitializer(tuitahDB);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
