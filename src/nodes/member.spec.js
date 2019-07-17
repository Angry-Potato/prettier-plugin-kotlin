describe("member", () => {
  test("val", () =>
    expect(`class SomeClass {
  val someReadOnlyProp = "Immutable"
}`).toMatchFormat());

  test("var", () =>
    expect(`class SomeClass {
  var someReadOnlyProp = "Mutable"
}`).toMatchFormat());
});
