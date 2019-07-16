const nodes = require("./nodes");

describe("assignType", () => {
  test("should assign root node astType", () => {
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
    expect(someNode.astType).toBe(nodes.NODE_TYPES.ROOT_NODE);
  });

  test("should assign package declaration node astType", () => {
    var someNode = { mods: {}, names: ["bleh"] };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.PACKAGE_DECLARATION);
  });

  test("should assign import statement node astType", () => {
    var someNode = {
      names: ["com", "github", "ajalt", "clikt", "core", "CliktCommand"],
      wildcard: false
    };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.IMPORT_STATEMENT);
  });

  test("should assign class declaration node astType", () => {
    var someNode = {
      mods: [],
      form: "CLASS",
      name: "Empty",
      typeParams: [],
      parentAnns: [],
      parents: [],
      typeConstraints: [],
      members: []
    };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.CLASS_DECLARATION);
  });

  test("should assign primary constructor node astType", () => {
    var someNode = {
      mods: [],
      params: [
        {
          mods: [],
          name: "name",
          type: {
            mods: [],
            ref: {
              pieces: [
                {
                  name: "String",
                  typeParams: []
                }
              ]
            }
          }
        }
      ]
    };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.PRIMARY_CONSTRUCTOR);
  });

  test("should assign parameter node astType", () => {
    var someNode = {
      mods: [],
      name: "name",
      type: {
        mods: [],
        ref: {
          pieces: [
            {
              name: "String",
              typeParams: []
            }
          ]
        }
      }
    };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.PARAMETER);
  });

  test("should assign modifier node astType", () => {
    var someNode = { keyword: "PUBLIC" };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.MODIFIER);
    someNode = { anns: [{ names: ["Inject"], typeArgs: [], args: [] }] };
    someNode = nodes.assignType(someNode);
    expect(someNode.astType).toBe(nodes.NODE_TYPES.MODIFIER);
  });

  test("should throw on unknown node astType", () => {
    var someNode = { dude: { what: ["bleh"] } };
    expect(() => {
      nodes.assignType(someNode);
    }).toThrow();
  });
});
