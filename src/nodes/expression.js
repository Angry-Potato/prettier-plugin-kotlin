const {
  doc: {
    builders: { concat, join }
  }
} = require("prettier");
const djv = require("djv");
const env = new djv();
const jsonSchema = {
  naked: {
    properties: {
      lhs: {
        type: "object"
      },
      oper: {
        type: "object"
      },
      rhs: {
        type: "object"
      }
    },
    required: ["lhs", "oper", "rhs"],
    additionalProperties: false
  },
  wrapped: {
    properties: {
      expr: {
        type: "object"
      }
    },
    required: ["expr"],
    additionalProperties: false
  },
  wrapped2: {
    properties: {
      expr: {
        type: "object",
        properties: {
          lhs: {
            type: "object"
          },
          oper: {
            type: "object"
          },
          rhs: {
            type: "object"
          }
        },
        required: ["lhs", "oper", "rhs"]
      },
      asterisk: {
        type: "boolean"
      }
    },
    required: ["expr", "asterisk"],
    additionalProperties: false
  }
};

env.addSchema("test", jsonSchema);

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
module.exports = {
  name: __filename,
  canPrint: node =>
    env.validate("test#/naked", node) == undefined ||
    env.validate("test#/wrapped", node) == undefined ||
    env.validate("test#/wrapped2", node) == undefined,
  print: (path, opts, print) => {
    const node = path.getValue();
    if (node.expr) {
      return path.call(print, "expr");
    }
    const lhs = isEmpty(node.lhs) ? "this" : path.call(print, "lhs");
    return concat([lhs, path.call(print, "oper"), path.call(print, "rhs")]);
  }
};
