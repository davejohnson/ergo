const { paramCase } = require("param-case");

// Rules taken from https://arc.codes/reference/arc/events
function getValidEventNameFromString(str) {
  // Lowercase alphanumeric string
  str = str.toLowerCase();

  // Must begin with a letter:
  // Strip any characters from the beginning of the string that aren't letters
  while (!/^[a-z]/.test(str) && str.length > 0) {
    str = str.slice(1);
  }

  // Dashes allowed; underscores not allowed
  str = paramCase(str);

  // Maximum of 50 characters
  str = str.slice(0, 50);

  return str;
}

module.exports = getValidEventNameFromString;
