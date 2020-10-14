class ValueAlreadyExistsForPragmaError extends Error {
  constructor({ pragma, value }) {
    const prettyValue = Array.isArray(value)
      ? value.join(" ")
      : JSON.stringify(value);

    super(`Value already exists for pragma @${pragma}: ${prettyValue}`);
    this.name = "ValueAlreadyExistsForPragmaError";
    this.pragma = pragma;
    this.value = value;
  }
}

module.exports = ValueAlreadyExistsForPragmaError;
