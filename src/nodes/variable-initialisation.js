const {
  doc: {
    builders: { concat, hardline }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      mods: {
        type: "array",
        items: {
          type: "object"
        }
      },
      readOnly: {
        type: "boolean"
      },
      typeParams: {
        type: "array",
        items: {
          type: "object"
        }
      },
      typeConstraints: {
        type: "array",
        items: {
          type: "object"
        }
      },
      vars: {
        type: "array",
        items: {
          type: "object"
        }
      },
      delegated: {
        type: "boolean"
      },
      expr: {
        type: "object"
      }
    },
    required: [
      "mods",
      "readOnly",
      "typeParams",
      "typeConstraints",
      "vars",
      "delegated",
      "expr"
    ],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();

    const prefix =
      node.mods.length > 0 ? concat([...path.map(print, "mods"), " "]) : "";

    return concat([
      prefix,
      node.readOnly ? "val" : "var",
      " ",
      ...path.map(print, "vars"),
      " = ",
      path.call(print, "expr"),
      hardline
    ]);
  }
};
