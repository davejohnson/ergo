class ProjectDirExistsError extends Error {
  constructor({ dir }) {
    super(`The Project directory already exists: ${dir}`);
    this.name = "ProjectDirExistsError";
    this.dir = dir;
  }
}

module.exports = ProjectDirExistsError;
