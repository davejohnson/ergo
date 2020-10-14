const arcValidation = require("../arc-validation");

function getValidAwsRegionFromString(region) {
  region = region.toLowerCase();

  // Allows us to just say e.g. 'region us'
  if (!arcValidation.isValidAwsRegion(region)) {
    region =
      arcValidation
        .getAvailableAwsRegions()
        .find((r) => r.startsWith(region)) || region;
  }

  return region;
}

module.exports = getValidAwsRegionFromString;
