const {
  doc: {
    builders: {}
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.form == "INT",
  print: (path, opts, print) => {
    const node = path.getValue();
    return node.value;
  }
};
