const inquirer = require("inquirer");
const arcValidation = require("../../lib/arc-validation");

const runtimes = arcValidation.getAvailableRuntimes();

async function promptForRuntime({
  message = "Select a runtime",
  allowNone = false,
} = {}) {
  const choices = [...runtimes.map((runtime) => ({ value: runtime }))];

  if (allowNone) {
    choices.unshift({ value: null, name: "None" });
  }

  const { runtime } = await inquirer.prompt([
    {
      name: "runtime",
      type: "list",
      message,
      choices,
    },
  ]);

  return runtime;
}

module.exports = promptForRuntime;
