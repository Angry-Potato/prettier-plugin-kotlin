const { assignType, nodes } = require("./nodes");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const typedNode = assignType(node);

  if (typedNode.type) {
    return nodes[typedNode.type](path, opts, print);
  }

  throw new Error(
    `Unsupported node encountered: ${type}\n${JSON.stringify(body, null, 2)}`
  );
};
