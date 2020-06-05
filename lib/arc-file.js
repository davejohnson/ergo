const parser = require("@architect/parser");
const fs = require("fs-extra");
const equal = require("fast-deep-equal");
const arcValidation = require("./arc-validation");
const ArcValidationError = require("./errors/ArcValidationError");
const ValueAlreadyExistsForPragmaError = require("./errors/ValueAlreadyExistsForPragmaError");

const arcFile = {
  async writePragmaAndValue({
    dir = process.cwd(),
    pragma,
    value,
    shouldReplaceValue,
  }) {
    const { arcObj, filepath } = arcFile._readArcFile(dir);

    arcFile._addPragmaValueToArcObj(arcObj, {
      pragma,
      value,
      shouldReplaceValue,
    });

    const errors = arcValidation.validateArcObj(arcObj);
    if (errors) {
      throw new ArcValidationError({ errors, filepath });
    }

    await arcFile._writeArcFile(filepath, arcObj);
  },

  async writeAppNameReplacingOld({ dir = process.cwd(), value }) {
    const { arcObj, filepath } = arcFile._readArcFile(dir);

    if (arcObj.app) {
      arcObj.app = [];
    }

    arcFile._addPragmaValueToArcObj(arcObj, {
      pragma: "app",
      value,
    });

    const errors = arcValidation.validateArcObj(arcObj);
    if (errors) {
      throw new ArcValidationError({ errors, filepath });
    }

    await arcFile._writeArcFile(filepath, arcObj);
  },

  async writeToTables({ dir = process.cwd(), value }) {
    const { arcObj, filepath } = arcFile._readArcFile(dir);

    if (!arcObj.tables) {
      arcObj.tables = [];
    }

    // value is something like { people: { pplID: '*String', onke: '*Number', stream: true } }
    // So the table-name is the only key of the object:
    const tableName = Object.keys(value)[0];
    let tableAlreadyExisted = false;
    for (const existingTable of arcObj.tables) {
      const existingTableName = Object.keys(existingTable)[0];

      if (existingTableName === tableName) {
        // Merge into existing table
        tableAlreadyExisted = true;
        Object.assign(existingTable[tableName], value[tableName]);

        break;
      }
    }
    if (!tableAlreadyExisted) {
      arcObj.tables.push(value);
    }

    const errors = arcValidation.validateArcObj(arcObj);
    if (errors) {
      throw new ArcValidationError({ errors, filepath });
    }

    await arcFile._writeArcFile(filepath, arcObj);
  },

  _readArcFile(dir) {
    const { arc, filepath, errors } = parser.read({ cwd: dir });
    if (errors) {
      throw new ArcValidationError({ errors, filepath });
    }

    return { arcObj: arc, filepath };
  },

  async _writeArcFile(filepath, arcObj) {
    const output = parser.stringify(arcObj);

    await fs.writeFile(filepath, output);
  },

  _addPragmaValueToArcObj(
    arcObj,
    { pragma, value, shouldReplaceValue = () => false }
  ) {
    if (!arcObj[pragma]) {
      arcObj[pragma] = [];
    }

    // Remove or replace any existing entries
    const indexesToRemove = [];
    arcObj[pragma].forEach((existingValue, i) => {
      const valueExists = equal(existingValue, value);
      if (shouldReplaceValue(existingValue)) {
        indexesToRemove.push(i);
      } else if (valueExists) {
        throw new ValueAlreadyExistsForPragmaError({
          pragma,
          value: existingValue,
        });
      }
    });
    // Remove indexes in reverse to not cause shifts in
    // indexes while removing items
    indexesToRemove.reverse().forEach((index) => {
      arcObj[pragma].splice(index, 1);
    });

    if (value) {
      arcObj[pragma].push(value);
    }
  },
};

module.exports = arcFile;
