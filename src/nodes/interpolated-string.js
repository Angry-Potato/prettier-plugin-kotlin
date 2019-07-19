const {
  doc: {
    builders: { concat, join }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      raw: {
        type: "boolean"
      },
      elems: {
        type: "array",
        items: {
          type: "object",
          properties: {
            str: {
              type: "string"
            }
          },
          required: ["str"]
        }
      }
    },
    required: ["raw", "elems"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    const stringParts = path.map(print, "elems");
    if (node.elems.length > 1) {
      return concat([
        '"',
        join(
          "$",
          stringParts.map(elem => {
            elem.parts.shift();
            elem.parts.pop();

            return elem;
          })
        ),
        '"'
      ]);
    }
    return concat(stringParts);
  }
};
