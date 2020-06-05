const inquirer = require("inquirer");
const arcValidation = require("../../lib/arc-validation");

const regions = arcValidation.getAvailableAwsRegions();

async function promptForAwsRegion({
  message = "Select an aws region",
  allowNone = false,
} = {}) {
  const choices = [...regions.map((region) => ({ value: region }))];

  if (allowNone) {
    choices.unshift({ value: null, name: "None" });
  }

  const { region } = await inquirer.prompt([
    {
      name: "region",
      type: "list",
      message,
      choices,
    },
  ]);

  return region;
}

module.exports = promptForAwsRegion;
