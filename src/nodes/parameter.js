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
      mods: {
        type: "array",
        items: {
          type: "object"
        }
      },
      readOnly: {
        type: "boolean"
      },
      name: {
        type: "string"
      },
      type: {
        type: "object"
      }
    },
    required: ["mods", "name", "type"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    const { mods, name } = node;

    const type = node.type ? concat([": ", path.call(print, "type")]) : "";
    const varType = node.hasOwnProperty("readOnly")
      ? node.readOnly
        ? "val "
        : "var "
      : "";

    const prefix =
      mods.length == 0 ? "" : concat([...path.map(print, "mods"), " "]);

    return concat([prefix, varType, name, type]);
  }
};
