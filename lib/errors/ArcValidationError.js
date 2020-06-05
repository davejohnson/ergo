class ArcValidationError extends Error {
  constructor({ errors, filepath }) {
    super(errors);
    this.name = "ArcValidationError";
    this.filepath = filepath;
    this.errors = errors;
  }
}

module.exports = ArcValidationError;
