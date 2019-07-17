const {
  doc: {
    builders: { concat, hardline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  return concat(path.map(print, "elems"));
};
