const {
  doc: {
    builders: { concat, join, group, indent, softline, line, hardline }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const annotation = concat([join(".", node.names)]);
  const args =
    node.args && node.args.length > 0
      ? group(
          concat([
            "(",
            indent(
              concat([
                softline,
                join(concat([",", line]), path.map(print, "args"))
              ])
            ),
            softline,
            ")"
          ])
        )
      : "";

  return concat([annotation, args]);
};
