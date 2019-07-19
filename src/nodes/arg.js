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
          elems: {
            type: "array",
            items: {
              type: "object"
            }
          },
          raw: {
            type: "boolean"
          }
        },
        required: ["elems", "raw"]
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
    const node = path.getValue();

    const prefix = node.expr && node.expr.elems ? "" : "::";

    return node.expr.value
      ? node.expr.value.toString().trim()
      : concat([prefix, path.call(print, "expr")]);
  }
};
