const {
  doc: {
    builders: { concat, literalline, join }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      pkg: {
        type: "object",
        properties: {
          mods: {
            type: "array",
            items: {
              type: "object"
            }
          },
          names: {
            type: "array",
            items: {
              type: "string"
            }
          }
        },
        required: ["mods", "names"]
      },
      anns: {
        type: "array",
        items: {
          type: "object"
        }
      },
      imports: {
        type: "array",
        items: {
          type: "object"
        }
      },
      decls: {
        type: "array",
        items: {
          type: "object"
        }
      },
      tokens: {
        type: "array",
        items: {
          type: "object"
        }
      }
    },
    required: ["anns", "imports", "decls"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
    const rootNode = path.getValue();
    var children = [];

    if (rootNode.anns && rootNode.anns.length > 0) {
      const fileAnnotations = join("\n", path.map(print, "anns"));
      children.push(fileAnnotations);
    }

    if (rootNode.pkg) {
      if (rootNode.anns && rootNode.anns.length > 0) {
        children.push(literalline, literalline);
      }
      children.push(path.call(print, "pkg"));
    }
    if (rootNode.imports && rootNode.imports.length > 0) {
      if (rootNode.pkg) {
        children.push(literalline);
      }
      children.push(...path.map(print, "imports"));
    }
    if (rootNode.decls && rootNode.decls.length > 0) {
      if (rootNode.imports && rootNode.imports.length > 0) {
        children.push(literalline, literalline);
      }
      children.push(...path.map(print, "decls"));
    }

    return concat(children);
  }
};
