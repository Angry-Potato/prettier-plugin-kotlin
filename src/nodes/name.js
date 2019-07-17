const {
  doc: {
    builders: { concat, join, group, indent, softline, line }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();
  return node.name;
};
