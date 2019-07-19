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
      expr: {
        type: "object",
        properties: {
          name: {
            type: "string"
          }
        },
        required: ["name"]
      },
      typeArgs: {
        type: "array"
      },
      args: {
        type: "array",
        items: {
          type: "object"
        }
      }
    },
    required: ["typeArgs", "expr", "args"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    return concat([
      path.call(print, "expr"),
      group(
        concat([
          "(",
          indent(
            concat([
              softline,
              join(concat([",", line]), path.map(print, "args"))
            ])
          ),
          softline,
          ")"
        ])
      )
    ]);
  }
};
