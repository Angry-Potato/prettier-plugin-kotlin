const { assignType, nodes } = require("./nodes");

module.exports = (path, opts, print) => {
  const node = path.getValue();
  if (!node) {
    return "";
  }

  const typedNode = assignType(node);

  if (typedNode.astType) {
    return nodes[typedNode.astType](path, opts, print);
  }
};
