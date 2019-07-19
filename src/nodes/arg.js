const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.hasOwnProperty("asterisk") && node.expr,
  print: (path, opts, print) => {
    const node = path.getValue();

    const prefix = node.expr && node.expr.elems ? "" : "::";

    return node.expr.value
      ? node.expr.value.toString().trim()
      : concat([prefix, path.call(print, "expr")]);
  }
};
