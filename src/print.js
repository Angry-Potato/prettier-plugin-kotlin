const { determineNodePrinter } = require("./nodes");
const glob = require("glob");
const path = require("path");

const NODES_DIR = "./src/nodes";

const nodePrinters = glob
  .sync(`${NODES_DIR}/**/*.js`, {
    ignore: `${NODES_DIR}/**/*spec.js`
  })
  .map(file => require(path.resolve(file)));

module.exports = (path, opts, print) => {
  const node = path.getValue();

  if (!node) {
    return "";
  }

  const nodePrinter = determineNodePrinter(node, nodePrinters);

  return nodePrinter.print(path, opts, print);
};
