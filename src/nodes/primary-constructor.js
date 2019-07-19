const {
  doc: {
    builders: { concat, join, group, indent, softline, line }
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
      params: {
        type: "array",
        items: {
          type: "object"
        }
      }
    },
    required: ["mods", "params"],
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
      node.mods.length == 0
        ? ""
        : concat([" ", join(" ", path.map(print, "mods")), " constructor"]);

    return concat([
      prefix,
      group(
        concat([
          "(",
          indent(
            concat([
              softline,
              join(concat([",", line]), path.map(print, "params"))
            ])
          ),
          softline,
          ")"
        ])
      )
    ]);
  }
};
