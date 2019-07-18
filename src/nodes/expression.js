const {
  doc: {
    builders: { concat, join }
  }
} = require("prettier");

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
module.exports = (path, opts, print) => {
  const node = path.getValue();
  if (node.elems) {
    if (node.elems.every(elem => elem.hasOwnProperty("str"))) {
      return concat([
        '"',
        join(
          "$",
          path.map(print, "elems").map(elem => {
            elem.parts.shift();
            elem.parts.pop();

            return elem;
          })
        ),
        '"'
      ]);
    } else {
      return concat(path.map(print, "elems"));
    }
  }

  const lhs = isEmpty(node.lhs) ? "this" : path.call(print, "lhs");
  return concat([lhs, path.call(print, "oper"), path.call(print, "rhs")]);
};
