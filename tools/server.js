const {
  generate,
  prepare,
  server,
} = require("./utils.js");

const { configPath } = prepare();
generate(configPath);
server(configPath);