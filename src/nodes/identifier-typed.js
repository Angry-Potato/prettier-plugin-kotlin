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
      name: {
        type: "string"
      },
      type: {
        type: "object",
        properties: {
          mods: {
            type: "array"
          },
          ref: {
            type: "object"
          }
        },
        required: ["mods", "ref"]
      }
    },
    required: ["name", "type"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    return concat([node.name, ": ", path.call(print, "type")]);
  }
};
