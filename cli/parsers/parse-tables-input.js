// .arc
//
//     @app
//     testapp
//
//     @tables
//     people
//       pplID *String
//       stream true
//
//     cats
//       pplID *String
//       catID **String
//
// arcObj
//
//     arc: {
//       app: [ 'testapp' ],
//       tables: [
//         { people: { pplID: '*String', stream: true } },
//         { cats: { pplID: '*String', catID: '**String' } }
//       ]
//     }
//
function parseTablesInput(values) {
  const [table, ...rawKeys] = values;

  const parsedKeys = [];
  for (const rawKey of rawKeys) {
    // rawKey: "stream"
    // becomes { type: "stream", stream: true }
    if (rawKey === "stream") {
      parsedKeys.push({
        type: "stream",
        stream: true,
      });

      continue;
    }

    // rawKey: "pplID*String"
    // becomes { key: 'pplID', partitionKey: 'String' }
    // rawKey: "pplID**String"
    // becomes { key: 'pplID', sortKey: 'String' }
    const attrs = {
      type: "key",
      name: "",
      partitionKey: "",
      sortKey: "",
    };

    let currentlyReading = "name";
    for (let i = 0; i < rawKey.length; i++) {
      const currentChar = rawKey[i];
      const nextChar = rawKey[i + 1];

      if (currentChar === "*" && nextChar === "*") {
        currentlyReading = "sortKey";
        i++;
        continue;
      }

      if (currentChar === "*") {
        currentlyReading = "partitionKey";
        continue;
      }

      attrs[currentlyReading] += currentChar;
    }

    parsedKeys.push(attrs);
  }

  const arcStructure = {
    [table]: parsedKeys.reduce((accu, key) => {
      if (key.type === "stream") {
        accu.stream = key.stream;
      }

      if (key.type === "key") {
        if (key.sortKey) {
          accu[key.name] = "**" + key.sortKey;
        } else {
          accu[key.name] = "*" + key.partitionKey;
        }
      }

      return accu;
    }, {}),
  };

  return arcStructure;
}

module.exports = parseTablesInput;
