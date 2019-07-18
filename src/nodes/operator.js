const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();
  switch (node.token.toLowerCase()) {
    case "eq":
      return " == ";
    case "dot":
      return ".";
    default:
      throw new Error(`UNKNOWN_OPERATOR = ${node.token.toLowerCase()}`);
  }
};
