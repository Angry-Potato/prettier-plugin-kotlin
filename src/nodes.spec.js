const nodes = require("./nodes");

describe("determinePrintFunction", () => {
  test("should throw on unknown node astType", () => {
    var someNode = { dude: { what: ["bleh"] } };
    expect(() => {
      nodes.determinePrintFunction(someNode);
    }).toThrow();
  });
});
