const NODE_TYPES = {
  ROOT_NODE: "root-node",
  PACKAGE_DECLARATION: "package-declaration",
  IMPORT_STATEMENT: "import-statement"
};

const nodes = {
  [NODE_TYPES.ROOT_NODE]: require(`./nodes/${NODE_TYPES.ROOT_NODE}`),
  [NODE_TYPES.PACKAGE_DECLARATION]: require(`./nodes/${NODE_TYPES.PACKAGE_DECLARATION}`),
  [NODE_TYPES.IMPORT_STATEMENT]: require(`./nodes/${NODE_TYPES.IMPORT_STATEMENT}`)
};

const isRootNode = node => node && node.anns && node.imports && node.decls;

const isPkgDeclaration = node => node && node.mods && node.names;

const isImportStatement = node =>
  node && node.hasOwnProperty("wildcard") && node.names;

const assignType = node => {
  if (isRootNode(node)) {
    return { ...node, type: NODE_TYPES.ROOT_NODE };
  } else if (isPkgDeclaration(node)) {
    return { ...node, type: NODE_TYPES.PACKAGE_DECLARATION };
  } else if (isImportStatement(node)) {
    return { ...node, type: NODE_TYPES.IMPORT_STATEMENT };
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
