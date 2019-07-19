const { determinePrintFunction, nodes } = require("./nodes");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  if (!node) {
    return "";
  }

  return determinePrintFunction(node)(path, opts, print);
};
