const {
  doc: {
    builders: { concat, literalline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const rootNode = path.getValue();
  var children = [];

  if (rootNode.anns && rootNode.anns.length > 0) {
    children.push(...path.map(print, "anns"));
  }

  if (rootNode.pkg) {
    if (rootNode.anns && rootNode.anns.length > 0) {
      children.push(literalline, literalline);
    }
    children.push(path.call(print, "pkg"));
  }
  if (rootNode.imports && rootNode.imports.length > 0) {
    if (rootNode.pkg) {
      children.push(literalline);
    }
    children.push(...path.map(print, "imports"));
  }
  if (rootNode.decls && rootNode.decls.length > 0) {
    if (rootNode.imports && rootNode.imports.length > 0) {
      children.push(literalline, literalline);
    }
    children.push(...path.map(print, "decls"));
  }

  return concat(children);
};
