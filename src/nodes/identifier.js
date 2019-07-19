const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      name: {
        type: "string"
      }
    },
    required: ["name"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    return node.name.trim();
  }
};
