const {
  doc: {
    builders: {}
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();
  return node.value;
};
