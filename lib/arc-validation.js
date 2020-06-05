const validateArcObj = require("@architect/parser/src/compat/validate");

const arcValidation = {
  getAvailableRuntimes() {
    return [
      `nodejs12.x`,
      `nodejs10.x`,
      `deno`,
      `python3.7`,
      `python3.6`,
      `ruby2.5`,
    ];
  },

  getAvailableAwsRegions() {
    return [
      "us-east-2",
      "us-east-1",
      "us-west-1",
      "us-west-2",
      "af-south-1",
      "ap-east-1",
      "ap-south-1",
      "ap-northeast-3",
      "ap-northeast-2",
      "ap-southeast-1",
      "ap-southeast-2",
      "ap-northeast-1",
      "ca-central-1",
      "cn-north-1",
      "cn-northwest-1",
      "eu-central-1",
      "eu-west-1",
      "eu-west-2",
      "eu-south-1",
      "eu-west-3",
      "eu-north-1",
      "me-south-1",
      "sa-east-1",
    ];
  },

  isValidRuntime(runtime) {
    return arcValidation.getAvailableRuntimes().includes(runtime);
  },

  isValidAwsRegion(region) {
    return arcValidation.getAvailableAwsRegions().includes(region);
  },

  isValidHttpVerb(string) {
    return ["get", "post", "put", "patch", "delete"].includes(string);
  },

  validateArcObj(arcObj) {
    return validateArcObj(arcObj);
  },
};

module.exports = arcValidation;
