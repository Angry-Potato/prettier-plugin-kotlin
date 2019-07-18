const {
  doc: {
    builders: { concat, hardline, indent }
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

  const expr = node.expr ? concat([" = ", path.call(print, "expr")]) : "";
  const accessors =
    node.accessors && node.accessors.first
      ? concat([
          "get() = ",
          ...path.map(print, "accessors", "first", "mods"),
          path.call(print, "accessors", "first", "body", "expr"),
          hardline
        ])
      : "";

  return concat([
    prefix,
    varType,
    ...path.map(print, "vars"),
    expr,
    accessors == "" ? hardline : indent(indent(hardline)),
    accessors
  ]);
};
