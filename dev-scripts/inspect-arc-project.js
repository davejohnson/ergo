const parser = require("@architect/parser");
const fs = require("fs");
const path = require("path");

let dir = process.argv[2];

if (!dir) {
  console.error(
    `Usage: node scripts/inspect-arc-project <path-to-arc-project>`
  );
  process.exit(1);
}

dir = path.resolve(process.cwd(), dir);

const { arc, errors, filepath } = parser.read({ cwd: dir });
console.log(arc);
if (errors) {
  console.error(errors);
  process.exit(1);
}

const arcFile = fs.readFileSync(filepath, "utf-8");

console.log(arcFile);
console.dir(arc, { depth: null });
