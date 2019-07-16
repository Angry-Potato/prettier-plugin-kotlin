const {
  doc: {
    builders: { concat, join, group, indent, softline, line }
  }
} = require("prettier");

module.exports = (path, opts, print) => {
  const node = path.getValue();

  const prefix =
    node.mods.length == 0
      ? ""
      : concat([" ", join(" ", path.map(print, "mods")), " constructor"]);

  return concat([
    prefix,
    group(
      concat([
        "(",
        indent(
          concat([
            softline,
            join(concat([",", line]), path.map(print, "params"))
          ])
        ),
        softline,
        ")"
      ])
    )
  ]);
};
