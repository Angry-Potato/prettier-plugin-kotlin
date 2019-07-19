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
      body: {
        type: "object"
      }
    },
    required: ["mods", "body"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const mods = path.map(print, "mods");
    return concat([
      ...mods,
      mods.length == 0 ? "" : " ",
      path.call(print, "body")
    ]);
  }
};
