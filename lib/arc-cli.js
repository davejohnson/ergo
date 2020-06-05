const execa = require("execa");
const misc = require("./misc");

const arcCli = {
  async isInstalled() {
    return misc.hasBin("arc");
  },

  async installWithYarn() {
    await execa("yarn", ["global", "add", "@architect/architect"]);
  },

  async installWithNpm() {
    await execa("npm", ["add", "-g", "@architect/architect"]);
  },

  async init({ dir = process.cwd(), appName } = {}) {
    const args = ["init"];
    if (appName) {
      args.push(appName);
    }
    await execa("arc", args, { cwd: dir });
  },
};

module.exports = arcCli;
