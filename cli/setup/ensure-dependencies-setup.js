const arcCli = require("../../lib/arc-cli");
const aws = require("../../lib/aws");
const promptToInstallArcCli = require("../prompts/prompt-to-install-arc-cli");
const promptToSetupAwsCredentialsFile = require("../prompts/prompt-to-setup-aws-credentials-file");

async function ensureDependenciesSetup() {
  const [
    arcCliInstalled,
    awsCredentialsExists,
    awsCliInstalled,
  ] = await Promise.all([
    arcCli.isInstalled(),
    aws.credentialsFileExists(),
    aws.isCliInstalled(),
  ]);

  let showSetupSuccessMessage = false;

  if (!arcCliInstalled) {
    await promptToInstallArcCli();
    console.log("");
    showSetupSuccessMessage = true;
  }

  if (!awsCredentialsExists) {
    await promptToSetupAwsCredentialsFile();
    console.log("");
    showSetupSuccessMessage = true;
  }

  if (!awsCliInstalled) {
    console.log(
      "⚠️  AWS CLI not found. You won't be able to fully use Ergo/Architect without it"
    );
    console.log(
      "👉 Visit https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html to install"
    );
    console.log("");
  }

  if (showSetupSuccessMessage) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("🎉 You're now all set to start using Ergo! Enjoy!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("");
  }
}

module.exports = ensureDependenciesSetup;
