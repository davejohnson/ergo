const inquirer = require("inquirer");

const packageManagers = ["yarn", "npm"];

async function promptForPackageManager({
  message = "Select a package manager",
} = {}) {
  const { packageManager } = await inquirer.prompt([
    {
      name: "packageManager",
      type: "list",
      message,
      choices: packageManagers,
    },
  ]);

  return packageManager;
}

module.exports = promptForPackageManager;
