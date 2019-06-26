const NODE_TYPES = {
  PACKAGE_DECLARATION: "package-declaration"
};

const nodes = {
  [NODE_TYPES.PACKAGE_DECLARATION]: require(`./nodes/${NODE_TYPES.PACKAGE_DECLARATION}`)
};

const isPkgDeclaration = node => node && node.pkg && node.pkg.names;

const assignType = node => {
  if (isPkgDeclaration(node)) {
    return { ...node, type: NODE_TYPES.PACKAGE_DECLARATION };
  }

  throw new Error(
    `Unsupported node encountered: ${JSON.stringify(node, null, 2)}`
  );
};

module.exports = {
  NODE_TYPES,
  assignType,
  nodes
};
