const execa = require("execa");
const fs = require("fs-extra");
const path = require("path");

const git = {
  async runGitInit({ dir = process.cwd() } = {}) {
    await execa("git", ["init"], { cwd: dir });
  },

  async createGitIgnoreFile({ dir = process.cwd() } = {}) {
    const gitignoreEntries = ["node_modules", ".DS_Store", "*.log"];

    await fs.writeFile(
      path.join(dir, ".gitignore"),
      gitignoreEntries.join("\n")
    );
  },
};

module.exports = git;
