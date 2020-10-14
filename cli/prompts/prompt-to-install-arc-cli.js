const misc = require("../../lib/misc");
const promptForBool = require("./prompt-for-bool");
const promptForPackageManager = require("./prompt-for-package-manager");
const arcCli = require("../../lib/arc-cli");

async function promptToInstallArcCLI() {
  const packageManagers = await misc.getInstalledPackageManagers();
  if (packageManagers.length === 0) {
    console.error(
      "❌ Error: You don't seem to have a package manager installed. Please install yarn or npm to proceed."
    );
    console.log(
      "👉 Visit https://yarnpkg.com/getting-started/install or https://www.npmjs.com/get-npm for more info."
    );
    process.exit(1);
  } else if (packageManagers.length === 1 && packageManagers[0] === "yarn") {
    const proceed = await promptForBool({
      message: "Architect CLI not found. Install now using yarn?",
      default: true,
    });
    if (!proceed) {
      console.error(
        "❌ Architect CLI is required. Please install manually: yarn global add @architect/architect"
      );
      process.exit(1);
    }
  } else if (packageManagers.length === 1 && packageManagers[0] === "npm") {
    const proceed = await promptForBool({
      message: "Architect CLI not found. Install now using npm?",
      default: true,
    });
    if (!proceed) {
      console.error(
        "❌ Architect CLI is required. Please install manually: npm install -g @architect/architect"
      );
      process.exit(1);
    }
  } else {
    console.log(
      "Architect CLI not found. Please select your preferred package manager and we'll install it for you"
    );
    const packageManager = await promptForPackageManager();
    console.log("Installing...");
    if (packageManager === "yarn") {
      await arcCli.installWithYarn();
    } else {
      await arcCli.installWithNpm();
    }
    console.log(`✅ Installed @architect/architect using ${packageManager}`);
  }
}

module.exports = promptToInstallArcCLI;
