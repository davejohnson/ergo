const awsProfiler = require("aws-profile-handler");
const path = require("path");
const os = require("os");
const fs = require("fs-extra");
const misc = require("./misc");

const credentialsFile =
  process.env.AWS_SHARED_CREDENTIALS_FILE ||
  path.join(os.homedir(), ".aws", "credentials");

const aws = {
  credentialsFile,

  async isCliInstalled() {
    return misc.hasBin("aws");
  },

  async credentialsFileExists() {
    try {
      awsProfiler.listProfiles(credentialsFile);

      return true;
    } catch (err) {
      if (err.code === "ENOENT") {
        return false;
      }

      throw err;
    }
  },

  async getConfiguredProfiles() {
    try {
      return awsProfiler.listProfiles(credentialsFile);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }

      throw err;
    }
  },

  async addProfileToCredentialsFile(profileName, credentials) {
    await fs.ensureFile(credentialsFile);
    awsProfiler.addProfile(profileName, credentials, credentialsFile);
  },
};

module.exports = aws;
