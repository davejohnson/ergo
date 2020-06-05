const inquirer = require("inquirer");

async function promptForBool({
  message = "Yes or no?",
  default: _default,
} = {}) {
  const { bool } = await inquirer.prompt([
    {
      name: "bool",
      type: "confirm",
      message,
      default: _default,
    },
  ]);

  return bool;
}

module.exports = promptForBool;
