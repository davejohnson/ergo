const fs = require("fs-extra");
const execa = require("execa");
const ProjectDirExistsError = require("./errors/ProjectDirExistsError");

const WINDOWS = process.platform === "win32";

const misc = {
  async createProjectDir({ dir }) {
    try {
      await fs.mkdir(dir);
    } catch (err) {
      if (err.code === "EEXIST") {
        throw new ProjectDirExistsError({ dir });
      }

      throw err;
    }
  },

  isValidFolderName(folderName) {
    // Taken from https://stackoverflow.com/a/31918294/1240061
    // eslint-disable-next-line no-control-regex
    const invalidFolderNameRegex = /[<>:"/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;

    return !invalidFolderNameRegex.test(folderName);
  },

  async hasBin(bin) {
    return execa(WINDOWS ? "where" : "which", [bin])
      .then(() => true)
      .catch(() => false);
  },

  async getInstalledPackageManagers() {
    const packageMangagers = [];

    const [hasNpm, hasYarn] = await Promise.all([
      misc.hasBin("npm"),
      misc.hasBin("yarn"),
    ]);

    if (hasNpm) {
      packageMangagers.push("npm");
    }

    if (hasYarn) {
      packageMangagers.push("yarn");
    }
    return packageMangagers;
  },
};

module.exports = misc;
