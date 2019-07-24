const path = require("path");
const { spawnSync } = require("child_process");

module.exports = (astPath, opts, print) => {
  const node = astPath.getValue();
  const child = spawnSync(
    "java",
    ["-jar", path.join(__dirname, "./kotato"), "write"],
    {
      input: node.astNode
    }
  );

  const error = child.stderr.toString();
  if (error) {
    throw new Error(error);
  }

  const response = child.stdout.toString();
  return response;
};
