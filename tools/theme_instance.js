const shelljs = require("shelljs");
const {
  resolve: pathResolve,
  join: pathJoin,
} = require("path");
const { existsSync } = require("fs");
const assert = require("assert");

function getParentDirectory() {
  return pathResolve(__dirname, "..");
}

class ThemeInstance {
  constructor(...args) {
    this._prepare(...args);
  }
  _prepare({ configPackage, skipInstall }) {
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

    this.configPath = configPath;
  }

  _hexoCmdWithConfigs(cmd = "generate") {
    return shelljs.exec(
      `npx hexo ${cmd} --config "${this.configPath},_config.yml"`);
  }

  generate() {
    const result = this._hexoCmdWithConfigs("generate")

    if (result.code !== 0 || result.stderr) {
      throw new Error("The theme generation failed." + result.stderr);
    }
  }

  server() {
    const result = this._hexoCmdWithConfigs("server")

    if (result.code !== 0 || result.stderr) {
      throw new Error("The theme generation failed." + result.stderr);
    }
  }
}

module.exports = ThemeInstance;
