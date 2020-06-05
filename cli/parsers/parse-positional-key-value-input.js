// Example:
// ['region', 'hello', '', ' ', 'stack', 'node']
// becomes:
// { region: 'hello', stack: 'node' }
function parsePositionalKeyValueInput(input) {
  input = input.map((v) => v.trim()).filter((v) => !!v);

  const parsedValues = {};

  for (let i = 0; i < input.length; i++) {
    const word = input[i];
    const nextWord = input[i + 1];

    parsedValues[word] = nextWord;
    i++;
  }

  return parsedValues;
}

module.exports = parsePositionalKeyValueInput;
