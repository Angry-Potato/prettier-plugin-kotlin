const nodes = require("./nodes");

describe("assignType", () => {
  test("should assign root node type", () => {
    var someNode = {
      anns: [],
      pkg: { mods: [], names: ["com", "github", "angrypotato", "kotato"] },
      imports: [{ names: [], wildcard: false }],
      decls: [
        {
          mods: [],
          form: "CLASS",
          name: "ColorHelpFormatter",
          typeParams: [],
          parentAnns: [],
          parents: [],
          typeConstraints: [],
          members: []
        }
      ]
    };
    someNode = nodes.assignType(someNode);
    expect(someNode.type).toBe(nodes.NODE_TYPES.ROOT_NODE);
  });

  test("should assign package declaration node type", () => {
    var someNode = { mods: {}, names: ["bleh"] };
    someNode = nodes.assignType(someNode);
    expect(someNode.type).toBe(nodes.NODE_TYPES.PACKAGE_DECLARATION);
  });

  test("should assign import statement node type", () => {
    var someNode = {
      names: ["com", "github", "ajalt", "clikt", "core", "CliktCommand"],
      wildcard: false
    };
    someNode = nodes.assignType(someNode);
    expect(someNode.type).toBe(nodes.NODE_TYPES.IMPORT_STATEMENT);
  });

  test("should throw on unknown node type", () => {
    var someNode = { dude: { what: ["bleh"] } };
    expect(() => {
      nodes.assignType(someNode);
    }).toThrow();
  });
});
