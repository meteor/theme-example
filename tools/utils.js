const shelljs = require("shelljs");
const {
  resolve: pathResolve,
  join: pathJoin,
} = require("path");
const { existsSync } = require("fs");
const assert = require("assert");

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

function getParentDirectory() {
  return pathResolve(__dirname, "..");
}

function prepare() {
  const { configPackage, skipInstall } = getConfigFromArguments();

  console.log(`Preparing to use ${configPackage} config package. ${skipInstall}`);

  // Work in the parent directory.
  shelljs.cd(getParentDirectory());

  if (! skipInstall) {
    const skipPackageJsons = "--no-package-lock --no-save";

    // Install theme and configuration package, but don't save the
    // changes, as that would cause local (and unnecessary) changes to the
    // package.json and package-lock.json files.
    //
    // NOTE: Due to a 'bug?' in npm (https://github.com/npm/npm/issues/17927),
    // the use of any other `npm install` commands after this will cause
    // these two packages to be removed!
    assert.strictEqual(
      shelljs.exec(`npm install ${skipPackageJsons} meteor-theme-hexo ${configPackage}`).code,
      0,
      "An error occurred while installing npm packages for the 'theme-example'.");
  }

  // This is the expected path to the _config.yml in the config package.
  const configPath = pathJoin("node_modules", configPackage, "_config.yml");

  // Make sure that the config package we've just installed has exposed a
  // _config.yml in the expected location.
  assert.ok(
    existsSync(pathResolve(".", configPath)),
    "The _config.yml couldn't be found at: " + configPath);

  return {
    configPath,
  }
}

function generate(configPath) {
  const result =
    shelljs.exec(`npx hexo generate --config "${configPath},_config.yml"`);

  if (result.code !== 0 || result.stderr) {
    throw new Error("The theme generation failed." + result.stderr);
  }
}

function server(configPath) {
  const result =
    shelljs.exec(`npx hexo server --config "${configPath},_config.yml"`);

  if (resultHexoGenerate.code !== 0 || resultHexoGenerate.stderr) {
    throw new Error("The theme generation failed." +
      resultHexoGenerate.stderr);
  }
}

module.exports = {
  generate,
  prepare,
  server,
};