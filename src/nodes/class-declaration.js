const {
  doc: {
    builders: { concat, hardline, indent }
  }
} = require("prettier");
const djv = require("djv");

function reject(elems) {
  return elems.filter(item => {
    return item != false && item !== undefined;
  });
}

function rejectAndConcat(elems) {
  const actualElements = reject(elems);

  return concat(actualElements);
}
const env = new djv();
const jsonSchema = {
  common: {
    properties: {
      form: {
        const: "CLASS"
      }
    },
    required: ["form"]
  }
};

env.addSchema("test", jsonSchema);

module.exports = {
  name: __filename,
  canPrint: node => env.validate("test#/common", node) == undefined,
  print: (path, opts, print) => {
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
  }
};
