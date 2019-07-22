const {
  doc: {
    builders: { concat }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      stmts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            expr: {
              type: "object"
            }
          },
          required: ["expr"]
        }
      }
    },
    required: ["stmts"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    return concat(path.map(print, "stmts"));
  }
};
