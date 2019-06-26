const {
  doc: {
    builders: { concat, hardline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const packageName = path
    .getValue()
    .pkg.names.join(".")
    .toLowerCase();

  return concat(["package ", packageName, hardline]);
};
