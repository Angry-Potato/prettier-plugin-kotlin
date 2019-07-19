const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.mods && node.ref,
  print: (path, opts, print) => {
    const node = path.getValue();
    return node.ref.pieces[0].name;
  }
};
