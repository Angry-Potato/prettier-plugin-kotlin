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
      expr: {
        type: "object",
        properties: {
          name: {
            type: "string"
          }
        },
        required: ["name"]
      },
      asterisk: {
        type: "boolean"
      }
    },
    required: ["asterisk", "expr"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    return concat(["::", path.call(print, "expr")]);
  }
};
