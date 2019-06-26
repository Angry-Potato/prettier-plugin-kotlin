const nodes = require("./nodes");

describe("assignType", () => {
  test("should assign package declaration node type", () => {
    var someNode = { pkg: { names: ["bleh"] } };
    someNode = nodes.assignType(someNode);
    expect(someNode.type).toBe(nodes.NODE_TYPES.PACKAGE_DECLARATION);
  });
  test("should throw on unknown node type", () => {
    var someNode = { dude: { what: ["bleh"] } };
    expect(() => {
      nodes.assignType(someNode);
    }).toThrow();
  });
});
