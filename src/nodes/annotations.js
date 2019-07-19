const {
  doc: {
    builders: { concat, join, group, indent, softline, line, hardline }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      target: {
        type: "string"
      },
      anns: {
        type: "array",
        items: {
          type: "object",
          properties: {
            names: {
              type: "array",
              items: {
                type: "string"
              }
            },
            typeArgs: {
              type: "array",
              items: {
                type: "object"
              }
            },
            args: {
              type: "array",
              items: {
                type: "object"
              }
            }
          },
          required: ["names", "typeArgs", "args"]
        }
      }
    },
    required: ["anns"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();

    const target = node.target
      ? concat([
          node.target
            .toString()
            .toLowerCase()
            .trim(),
          ":"
        ])
      : "";

    return concat(["@", target, ...path.map(print, "anns")]);
  }
};
