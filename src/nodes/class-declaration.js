const {
  doc: {
    builders: { concat, hardline, indent }
  }
} = require("prettier");

function reject(elems) {
  return elems.filter(item => {
    return item != false && item !== undefined;
  });
}

function rejectAndConcat(elems) {
  const actualElements = reject(elems);

  return concat(actualElements);
}

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const prefix =
    node.mods && node.mods.length > 0
      ? concat([...path.map(print, "mods"), " "])
      : "";

  const hasBody = node.members && node.members.length > 0;
  const openingBrace = hasBody ? indent(concat([" {", hardline])) : "";
  const closingBrace = hasBody ? "}" : "";
  const members = hasBody ? concat(path.map(print, "members")) : "";

  return rejectAndConcat([
    prefix,
    "class ",
    node.name,
    path.call(print, "primaryConstructor"),
    openingBrace,
    members,
    closingBrace
  ]);
};
