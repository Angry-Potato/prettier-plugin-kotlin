const parse = require("./parse");
const print = require("./print");

/*
 * metadata pulled from linguist:
 * https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
 */

module.exports = {
  languages: [
    {
      name: "Kotlin",
      parsers: ["kotlin"],
      extensions: [".kt", ".ktm", ".kts"],
      filenames: [],
      interpreters: ["kotlin"],
      linguistLanguageId: 189,
      vscodeLanguageIds: ["kotlin"]
    }
  ],
  parsers: {
    kotlin: {
      parse,
      astFormat: "kotlin"
    }
  },
  printers: {
    kotlin: {
      print
    }
  },
  options: {},
  defaultOptions: {}
};
