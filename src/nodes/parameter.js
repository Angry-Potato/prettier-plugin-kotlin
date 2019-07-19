const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.mods && node.name && node.type,
  print: (path, opts, print) => {
    const node = path.getValue();
    const { mods, name } = node;

    const type = node.type ? concat([": ", path.call(print, "type")]) : "";
    const varType = node.hasOwnProperty("readOnly")
      ? node.readOnly
        ? "val "
        : "var "
      : "";

    const prefix =
      mods.length == 0 ? "" : concat([...path.map(print, "mods"), " "]);

    return concat([prefix, varType, name, type]);
  }
};
