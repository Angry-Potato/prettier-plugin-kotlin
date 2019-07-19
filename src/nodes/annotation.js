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
    required: ["names", "typeArgs", "args"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();

    const annotation = concat([join(".", node.names)]);
    const args =
      node.args && node.args.length > 0
        ? group(
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
        : "";

    return concat([annotation, args]);
  }
};
