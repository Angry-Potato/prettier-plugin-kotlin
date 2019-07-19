const {
  doc: {
    builders: { concat, join, group, indent, softline, line }
  }
} = require("prettier");

module.exports = {
  canPrint: node => node.expr && node.typeArgs && node.args,
  print: (path, opts, print) => {
    return concat([
      path.call(print, "expr"),
      group(
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
    ]);
  }
};
