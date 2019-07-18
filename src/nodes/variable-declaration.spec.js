describe("variable-declaration", () => {
  describe("member vars", () => {
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

    test("with modifier", () =>
      expect(`class SomeClass {
  private val someReadOnlyProp = "Immutable"
}`).toMatchFormat());

    test("with accessor", () =>
      expect(`class SomeClass {
  val isEmpty: Boolean
    get() = this.size == 0
}`).toMatchFormat());
  });

  test("standard declarations", () =>
    expect(`val a = 1
var b = 1
val c: Int
var k: String = "plop"`).toMatchFormat());
});
