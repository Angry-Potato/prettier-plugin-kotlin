describe("class-declaration", () => {
  test("unchanged", () => expect("class MyClass").toMatchFormat());

  test("double spaced", () =>
    expect("class  MyClass").toChangeFormat("class MyClass"));

  test("empty body", () =>
    expect("class MyClass {}").toChangeFormat("class MyClass"));

  test("unmodified primary constructor", () =>
    expect("class MyClass constructor(name: String) {}").toChangeFormat(
      "class MyClass(name: String)"
    ));

  test("inheritance", () =>
    expect(`open class Foo {
    open fun f() {
        println("Foo.f()")
    }

    open val x: Int
        get() = 1

}

class Bar : Foo() {
    override fun f() {
        super.f()
        println("Bar.f()")
    }

    override val x: Int
        get() = super.x + 1

}`).toMatchFormat());
});
