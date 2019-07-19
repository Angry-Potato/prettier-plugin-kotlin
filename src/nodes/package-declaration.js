const {
  doc: {
    builders: { concat, literalline }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.mods && node.names,
  print: (path, opts, print) => {
    const { names: names } = path.getValue();

    return concat(["package ", names.join("."), literalline]);
  }
};
