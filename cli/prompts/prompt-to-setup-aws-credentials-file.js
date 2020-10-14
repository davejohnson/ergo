const aws = require("../../lib/aws");
const promptForInput = require("./prompt-for-input");

async function promptToInstallArcCLI() {
  console.log("Missing AWS credentials file. Let's set this up now");

  const aws_access_key_id = await promptForInput({
    message: "Enter aws_access_key_id",
    required: true,
  });

  const aws_secret_access_key = await promptForInput({
    message: "Enter aws_secret_access_key",
    password: true,
    required: true,
  });

  const profileName = await promptForInput({
    message: "Enter profile name",
    default: "default",
    required: false,
  });

  await aws.addProfileToCredentialsFile(profileName, {
    aws_access_key_id,
    aws_secret_access_key,
  });

  console.log(`✅ Created AWS credentials file: ${aws.credentialsFile}`);
}

module.exports = promptToInstallArcCLI;
