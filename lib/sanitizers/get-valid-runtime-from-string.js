const arcValidation = require("../arc-validation");

function getValidRuntimeFromString(runtime) {
  runtime = runtime.toLowerCase();

  // Allows us to just say e.g. 'region us'
  if (!arcValidation.isValidRuntime(runtime)) {
    runtime =
      arcValidation.getAvailableRuntimes().find((r) => r.startsWith(runtime)) ||
      runtime;
  }

  return runtime;
}

module.exports = getValidRuntimeFromString;
