const { paramCase } = require("param-case");

// Rules taken from https://arc.codes/reference/arc/app
function getValidAppNameFromString(str) {
  // Lowercase alphanumeric string
  str = str.toLowerCase();

  // Must begin with a letter:
  // Strip any characters from the beginning of the string that aren't letters
  while (!/^[a-z]/.test(str) && str.length > 0) {
    str = str.slice(1);
  }

  // Dashes allowed; underscores not allowed
  str = paramCase(str);

  // Maximum of 10 characters
  str = str.slice(0, 10);

  return str;
}

module.exports = getValidAppNameFromString;
