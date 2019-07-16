const {
  doc: {
    builders: { concat, hardline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const prefix =
    node.mods && node.mods.length > 0
      ? concat([...path.map(print, "mods"), " "])
      : "";

  return concat([
    prefix,
    "class ",
    node.name,
    path.call(print, "primaryConstructor"),
    hardline
  ]);
};
