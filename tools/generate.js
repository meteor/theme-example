const {
  generate,
  prepare,
} = require("./utils.js");

const { configPath } = prepare();
generate(configPath);