const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.hasOwnProperty("str"),
  print: (path, opts, print) => {
    const node = path.getValue();

    return concat(['"', node.str, '"']);
  }
};
