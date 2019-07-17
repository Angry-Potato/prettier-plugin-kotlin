describe("member", () => {
  test("var", () =>
    expect(`class SomeClass {
  var someReadOnlyProp = "Mutable"
}`).toMatchFormat());

  test("val", () =>
    expect(`class SomeClass {
  val someReadOnlyProp = "Immutable"
}`).toMatchFormat());

  test("with type", () =>
    expect(`class SomeClass {
  val someReadOnlyProp: String = "Immutable"
}`).toMatchFormat());
});
