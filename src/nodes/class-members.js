const {
  doc: {
    builders: { concat, hardline, indent }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      block: {
        type: "object"
      }
    },
    required: ["block"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    return concat([
      "init {",
      indent(indent(hardline)),
      path.call(print, "block"),
      indent(hardline),
      "}",
      hardline
    ]);
  }
};
