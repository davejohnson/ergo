const inquirer = require("inquirer");

async function promptForInput({
  message,
  default: _default,
  password = false,
  required = false,
}) {
  const { input } = await inquirer.prompt([
    {
      name: "input",
      type: password ? "password" : "input",
      message,
      default: _default,
      validate: (input) => {
        if (required && input.length === 0) {
          return "Please enter a value";
        }

        return true;
      },
    },
  ]);

  return input;
}

module.exports = promptForInput;
