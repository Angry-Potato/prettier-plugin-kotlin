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
      token: {
        type: "string"
      }
    },
    required: ["token"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    switch (node.token.toLowerCase()) {
      case "eq":
        return " == ";
      case "dot":
        return ".";
      default:
        throw new Error(`UNKNOWN_OPERATOR = ${node.token.toLowerCase()}`);
    }
  }
};
