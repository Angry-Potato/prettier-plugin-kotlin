const nodes = require("./nodes");

describe("determineNodePrinter", () => {
  test("should throw on unknown node astType", () => {
    var someNode = { dude: { what: ["bleh"] } };
    expect(() => {
      nodes.determineNodePrinter(someNode);
    }).toThrow();
  });
});
