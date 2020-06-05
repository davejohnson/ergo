const { camelCase } = require("camel-case");

// Rules taken from https://arc.codes/reference/arc/http
function getValidRoutePathFromString(str) {
  const sanitizedParts = str
    .split("/")
    .map((part) => {
      const isParam = part.startsWith(":");
      if (isParam) {
        part = part.slice(1);
      }

      // Must begin with a letter:
      // Strip any characters from the beginning of the string that aren't letters
      while (!/^[a-zA-Z]/.test(part) && part.length > 0) {
        part = part.slice(1);
      }

      // Dashes and underscores are not allowed
      part = camelCase(part);

      if (isParam) {
        return ":" + part;
      }

      return part;
    })
    .filter((part) => !!part);

  return "/" + sanitizedParts.join("/");
}

module.exports = getValidRoutePathFromString;
