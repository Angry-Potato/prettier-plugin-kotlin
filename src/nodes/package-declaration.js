const {
  doc: {
    builders: { concat, literalline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const {
    pkg: { names: names }
  } = path.getValue();

  return concat(["package ", names.join("."), literalline, literalline]);
};
