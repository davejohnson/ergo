const inquirer = require("inquirer");
const misc = require("../../lib/misc");

async function promptForFolderName({ message }) {
  const { appName } = await inquirer.prompt([
    {
      name: "appName",
      type: "input",
      message,
      validate: (input) => {
        if (input.length === 0) {
          return "Please enter a value";
        }

        if (!misc.isValidFolderName(input)) {
          return "Not a valid folder name";
        }

        return true;
      },
    },
  ]);

  return appName;
}

module.exports = promptForFolderName;
