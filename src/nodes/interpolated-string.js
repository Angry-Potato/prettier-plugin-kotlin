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
          type: "object"
          //   properties: {
          //     str: {
          //       type: "string"
          //     }
          //   },
          //   required: ["str"]
        }
      }
    },
    required: ["raw", "elems"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

const trimQuotes = node => {
  if (node.parts) {
    if (node.parts[0] == '"') {
      node.parts.shift();
    }
    if (node.parts[node.parts.length - 1] == '"') {
      node.parts.pop();
    }
  }

  return node;
};

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    const stringParts = path.map(print, "elems");
    if (node.elems.length > 1) {
      const baseString = trimQuotes(stringParts.shift());
      return concat([
        '"',
        baseString,
        ...stringParts.map(elem => {
          return concat(["${", trimQuotes(elem), "}"]);
        }),
        '"'
      ]);
    }
    return concat(stringParts);
  }
};
