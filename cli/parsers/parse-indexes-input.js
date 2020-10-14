// @app
// testapp
//
// @tables
// accounts
//   accountID *String
//
// @indexes
// accounts
//   email *String
//
// accounts
//   created *String
//
// {
//   app: [ 'testapp' ],
//   tables: [ { accounts: { accountID: '*String' } } ],
//   indexes: [
//     { accounts: { email: '*String' } },
//     { accounts: { created: '*String' } }
//   ]
// }
const parseTablesInput = require("./parse-tables-input");

function parseIndexesInput(values) {
  // table syntax is the same as indexes syntax, so we
  // re-use the tables-input parser
  return parseTablesInput(values);
}

module.exports = parseIndexesInput;
