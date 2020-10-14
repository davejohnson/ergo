const { paramCase } = require("param-case");

// Rules taken from https://arc.codes/reference/arc/tables
function getValidTableNameFromString(str) {
  // Lowercase alphanumeric string
  str = str.toLowerCase();

  // Must begin with a letter:
  // Strip any characters from the beginning of the string that aren't letters
  while (!/^[a-z]/.test(str) && str.length > 3) {
    str = str.slice(1);
  }

  // Dashes allowed; underscores not allowed
  str = paramCase(str);

  // Between 3 and 255 characters
  str = str.slice(0, 255);

  return str;
}

module.exports = getValidTableNameFromString;
