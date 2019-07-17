const {
  doc: {
    builders: { concat, hardline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const varType = node.hasOwnProperty("readOnly")
    ? node.readOnly
      ? "val "
      : "var "
    : "";

  const prefix =
    node.mods && node.mods.length > 0
      ? concat([...path.map(print, "mods"), " "])
      : "";

  return concat([
    prefix,
    varType,
    ...path.map(print, "vars"),
    " = ",
    path.call(print, "expr")
  ]);
};
