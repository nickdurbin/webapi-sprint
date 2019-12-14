const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");

module.exports = server => {
  server.use(logger());
  server.use(helmet());
  server.use(cors());
};