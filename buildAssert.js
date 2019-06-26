const kotato = require("./build/npm/kotato");
const parser = new kotato.kotato.parser.Library();
console.log(`func out: ${parser.someLibraryMethod()}`);
