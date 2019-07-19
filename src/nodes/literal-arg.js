const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      expr: {
        type: "object",
        properties: {
          value: {
            type: "string"
          },
          form: {
            type: "string"
          }
        },
        required: ["value", "form"]
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
    return path.call(print, "expr");
  }
};
