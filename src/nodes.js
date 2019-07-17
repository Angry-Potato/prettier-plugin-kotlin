const NODE_TYPES = {
  ROOT_NODE: "root-node",
  PACKAGE_DECLARATION: "package-declaration",
  IMPORT_STATEMENT: "import-statement",
  CLASS_DECLARATION: "class-declaration",
  PRIMARY_CONSTRUCTOR: "primary-constructor",
  PARAMETER: "parameter",
  MODIFIER: "modifier",
  ANNOTATION: "annotation",
  ARG: "arg",
  MEMBER: "member",
  NAME: "name",
  EXPRESSION: "expression",
  STRING: "string",
  TYPE: "type"
};

const nodes = {
  [NODE_TYPES.ROOT_NODE]: require(`./nodes/${NODE_TYPES.ROOT_NODE}`),
  [NODE_TYPES.PACKAGE_DECLARATION]: require(`./nodes/${NODE_TYPES.PACKAGE_DECLARATION}`),
  [NODE_TYPES.IMPORT_STATEMENT]: require(`./nodes/${NODE_TYPES.IMPORT_STATEMENT}`),
  [NODE_TYPES.CLASS_DECLARATION]: require(`./nodes/${NODE_TYPES.CLASS_DECLARATION}`),
  [NODE_TYPES.PRIMARY_CONSTRUCTOR]: require(`./nodes/${NODE_TYPES.PRIMARY_CONSTRUCTOR}`),
  [NODE_TYPES.PARAMETER]: require(`./nodes/${NODE_TYPES.PARAMETER}`),
  [NODE_TYPES.MODIFIER]: require(`./nodes/${NODE_TYPES.MODIFIER}`),
  [NODE_TYPES.ANNOTATION]: require(`./nodes/${NODE_TYPES.ANNOTATION}`),
  [NODE_TYPES.ARG]: require(`./nodes/${NODE_TYPES.ARG}`),
  [NODE_TYPES.MEMBER]: require(`./nodes/${NODE_TYPES.MEMBER}`),
  [NODE_TYPES.NAME]: require(`./nodes/${NODE_TYPES.NAME}`),
  [NODE_TYPES.EXPRESSION]: require(`./nodes/${NODE_TYPES.EXPRESSION}`),
  [NODE_TYPES.STRING]: require(`./nodes/${NODE_TYPES.STRING}`),
  [NODE_TYPES.TYPE]: require(`./nodes/${NODE_TYPES.TYPE}`)
};

const isRootNode = node => node.anns && node.imports && node.decls;

const isPkgDeclaration = node => node.mods && node.names;

const isImportStatement = node =>
  node && node.hasOwnProperty("wildcard") && node.names;

const isClassDeclaration = node => node.form == "CLASS";

const isPrimaryConstructor = node => node.mods && node.params;

const isParameter = node => node.mods && node.name && node.type;

const isModifier = node => node.keyword || node.anns;

const isAnnotation = node => node.names && node.typeArgs && node.args;

const isArg = node => node.hasOwnProperty("asterisk") && node.expr;

const isMember = node =>
  node.hasOwnProperty("readOnly") &&
  node.hasOwnProperty("delegated") &&
  node.mods &&
  node.typeParams &&
  node.vars &&
  node.typeConstraints &&
  node.expr;

const isName = node => node.hasOwnProperty("name");

const isExpression = node => node.hasOwnProperty("raw") && node.elems;

const isString = node => node.hasOwnProperty("str");

const isType = node => node.mods && node.ref;

const assignType = node => {
  if (!node) {
    throw new Error(`Undefined node encountered`);
  }

  if (isRootNode(node)) {
    return { ...node, astType: NODE_TYPES.ROOT_NODE };
  } else if (isPkgDeclaration(node)) {
    return { ...node, astType: NODE_TYPES.PACKAGE_DECLARATION };
  } else if (isImportStatement(node)) {
    return { ...node, astType: NODE_TYPES.IMPORT_STATEMENT };
  } else if (isClassDeclaration(node)) {
    return { ...node, astType: NODE_TYPES.CLASS_DECLARATION };
  } else if (isPrimaryConstructor(node)) {
    return { ...node, astType: NODE_TYPES.PRIMARY_CONSTRUCTOR };
  } else if (isParameter(node)) {
    return { ...node, astType: NODE_TYPES.PARAMETER };
  } else if (isModifier(node)) {
    return { ...node, astType: NODE_TYPES.MODIFIER };
  } else if (isAnnotation(node)) {
    return { ...node, astType: NODE_TYPES.ANNOTATION };
  } else if (isArg(node)) {
    return { ...node, astType: NODE_TYPES.ARG };
  } else if (isMember(node)) {
    return { ...node, astType: NODE_TYPES.MEMBER };
  } else if (isName(node)) {
    return { ...node, astType: NODE_TYPES.NAME };
  } else if (isExpression(node)) {
    return { ...node, astType: NODE_TYPES.EXPRESSION };
  } else if (isString(node)) {
    return { ...node, astType: NODE_TYPES.STRING };
  } else if (isType(node)) {
    return { ...node, astType: NODE_TYPES.TYPE };
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
