const {
  doc: {
    builders: { concat, join, group, indent, softline, line }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  return node.expr.value
    ? node.expr.value.toString().trim()
    : concat(['"', node.expr.elems[0].str.toString().trim(), '"']);
};
