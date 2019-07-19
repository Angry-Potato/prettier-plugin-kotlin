const NODE_TYPES = {
  FILE: "file",
  PACKAGE_DECLARATION: "package-declaration",
  IMPORT_STATEMENT: "import-statement",
  CLASS_DECLARATION: "class-declaration",
  PRIMARY_CONSTRUCTOR: "primary-constructor",
  PARAMETER: "parameter",
  MODIFIER: "modifier",
  ANNOTATION: "annotation",
  ARG: "arg",
  VARIABLE_DECLARATION: "variable-declaration",
  NAME: "name",
  EXPRESSION: "expression",
  STRING: "string",
  TYPE: "type",
  INTEGER: "integer",
  OPERATOR: "operator",
  FUNCTION_CALL: "function-call"
};

const nodes = {
  [NODE_TYPES.FILE]: require(`./nodes/${NODE_TYPES.FILE}`),
  [NODE_TYPES.PACKAGE_DECLARATION]: require(`./nodes/${NODE_TYPES.PACKAGE_DECLARATION}`),
  [NODE_TYPES.IMPORT_STATEMENT]: require(`./nodes/${NODE_TYPES.IMPORT_STATEMENT}`),
  [NODE_TYPES.CLASS_DECLARATION]: require(`./nodes/${NODE_TYPES.CLASS_DECLARATION}`),
  [NODE_TYPES.PRIMARY_CONSTRUCTOR]: require(`./nodes/${NODE_TYPES.PRIMARY_CONSTRUCTOR}`),
  [NODE_TYPES.PARAMETER]: require(`./nodes/${NODE_TYPES.PARAMETER}`),
  [NODE_TYPES.MODIFIER]: require(`./nodes/${NODE_TYPES.MODIFIER}`),
  [NODE_TYPES.ANNOTATION]: require(`./nodes/${NODE_TYPES.ANNOTATION}`),
  [NODE_TYPES.ARG]: require(`./nodes/${NODE_TYPES.ARG}`),
  [NODE_TYPES.VARIABLE_DECLARATION]: require(`./nodes/${NODE_TYPES.VARIABLE_DECLARATION}`),
  [NODE_TYPES.NAME]: require(`./nodes/${NODE_TYPES.NAME}`),
  [NODE_TYPES.EXPRESSION]: require(`./nodes/${NODE_TYPES.EXPRESSION}`),
  [NODE_TYPES.STRING]: require(`./nodes/${NODE_TYPES.STRING}`),
  [NODE_TYPES.TYPE]: require(`./nodes/${NODE_TYPES.TYPE}`),
  [NODE_TYPES.INTEGER]: require(`./nodes/${NODE_TYPES.INTEGER}`),
  [NODE_TYPES.OPERATOR]: require(`./nodes/${NODE_TYPES.OPERATOR}`),
  [NODE_TYPES.FUNCTION_CALL]: require(`./nodes/${NODE_TYPES.FUNCTION_CALL}`)
};

const isPrimaryConstructor = node => node.mods && node.params;

const isParameter = node => node.mods && node.name && node.type;

const isModifier = node => node.keyword || node.anns;

const isAnnotation = node => node.names && node.typeArgs && node.args;

const isArg = node => node.hasOwnProperty("asterisk") && node.expr;

const isVariableDeclaration = node =>
  node.hasOwnProperty("readOnly") &&
  node.hasOwnProperty("delegated") &&
  node.mods &&
  node.typeParams &&
  node.vars &&
  node.typeConstraints;

const isName = node => node.hasOwnProperty("name");

const isExpression = node =>
  (node.hasOwnProperty("raw") && node.elems) ||
  (node.lhs && node.oper && node.rhs);

const isString = node => node.hasOwnProperty("str");

const isType = node => node.mods && node.ref;

const isInteger = node => node.form == "INT";

const isOperator = node => node.token;

const isFunctionCall = node => node.expr && node.typeArgs && node.args;

const assignType = node => {
  if (!node) {
    throw new Error(`Undefined node encountered`);
  }

  if (nodes[NODE_TYPES.FILE].canPrint(node)) {
    return { ...node, astType: NODE_TYPES.FILE };
  } else if (nodes[NODE_TYPES.PACKAGE_DECLARATION].canPrint(node)) {
    return { ...node, astType: NODE_TYPES.PACKAGE_DECLARATION };
  } else if (nodes[NODE_TYPES.IMPORT_STATEMENT].canPrint(node)) {
    return { ...node, astType: NODE_TYPES.IMPORT_STATEMENT };
  } else if (nodes[NODE_TYPES.CLASS_DECLARATION].canPrint(node)) {
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
  } else if (isVariableDeclaration(node)) {
    return { ...node, astType: NODE_TYPES.VARIABLE_DECLARATION };
  } else if (isName(node)) {
    return { ...node, astType: NODE_TYPES.NAME };
  } else if (isExpression(node)) {
    return { ...node, astType: NODE_TYPES.EXPRESSION };
  } else if (isString(node)) {
    return { ...node, astType: NODE_TYPES.STRING };
  } else if (isType(node)) {
    return { ...node, astType: NODE_TYPES.TYPE };
  } else if (isInteger(node)) {
    return { ...node, astType: NODE_TYPES.INTEGER };
  } else if (isOperator(node)) {
    return { ...node, astType: NODE_TYPES.OPERATOR };
  } else if (isFunctionCall(node)) {
    return { ...node, astType: NODE_TYPES.FUNCTION_CALL };
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
