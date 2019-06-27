const {
  doc: {
    builders: { concat, literalline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();
  const names = node.wildcard ? [...node.names, "*"] : node.names;
  const alias = node.alias ? [" as ", node.alias] : [];

  return concat(["import ", names.join("."), ...alias, literalline]);
};
