const {
  doc: {
    builders: { concat }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.keyword || node.anns,
  print: (path, opts, print) => {
    const node = path.getValue();

    const keyword = node.keyword
      ? concat([
          node.keyword
            .toString()
            .toLowerCase()
            .trim(),
          node.anns && node.anns.length > 0 ? " " : ""
        ])
      : "";

    const target = node.target
      ? concat([
          node.target
            .toString()
            .toLowerCase()
            .trim(),
          ":"
        ])
      : "";

    const anns =
      node.anns && node.anns.length > 0
        ? concat(["@", target, ...path.map(print, "anns")])
        : "";

    return concat([keyword, anns]);
  }
};
