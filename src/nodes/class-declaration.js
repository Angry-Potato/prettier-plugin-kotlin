const {
  doc: {
    builders: { concat, hardline, indent }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const prefix =
    node.mods && node.mods.length > 0
      ? concat([...path.map(print, "mods"), " "])
      : "";

  const members =
    node.members && node.members.length > 0
      ? concat([
          " {",
          indent(concat([hardline, ...path.map(print, "members")])),
          hardline,
          "}"
        ])
      : "";

  return concat([
    prefix,
    "class ",
    node.name,
    path.call(print, "primaryConstructor"),
    members,
    hardline
  ]);
};
