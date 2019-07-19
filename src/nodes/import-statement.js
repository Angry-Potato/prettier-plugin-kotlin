const {
  doc: {
    builders: { concat, literalline }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      wildcard: {
        type: "boolean"
      },
      names: {
        type: "array",
        items: {
          type: "string"
        }
      },
      alias: {
        type: "string"
      }
    },
    required: ["wildcard", "names"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    const names = node.wildcard ? [...node.names, "*"] : node.names;
    const alias = node.alias ? [" as ", node.alias] : [];

    return concat(["import ", names.join("."), ...alias, literalline]);
  }
};
