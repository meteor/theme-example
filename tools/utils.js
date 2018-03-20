const defaultConfigNpm = "meteor-hexo-config";

function getConfigFromArguments() {
  if (process.argv.length > 4 || process.argv.length < 2) {
    throw new Error("Invalid number of arguments. Pass the npm " +
      "containing the name of the theme config (e.g. meteor-hexo-config, " +
      "apollo-hexo-config, etc.).  The presence of a second argument " +
      "will skip npm-installing them and expect to have it locally linked.");
  }

  return {
    configPackage: process.argv[2] || defaultConfigNpm,
    skipInstall: !! process.argv[3] && true || false,
  };
}

module.exports = {
  defaultConfigNpm,
  getConfigFromArguments,
};
