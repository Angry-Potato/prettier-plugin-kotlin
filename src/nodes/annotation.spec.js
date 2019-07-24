describe("annotation", () => {
  test("file annotations", () =>
    expect(`@file:JvmName("Foo")
@file:JvmName("Bar")

package org.jetbrains.demo`).toMatchFormat());

  test("primary constructor modifiers", () =>
    expect(
      "data class MyClass protected @Inject(123) constructor(var name: String) {}"
    ).toChangeFormat(
      "data class MyClass protected @Inject(123) constructor(var name: String)"
    ));

  test("annotation use-site targets", () =>
    expect(
      "class Example(@field:Ann.Thing  val foo: Int, @get:Ann  val bar: String, @param:Ann  val quux: Int)"
    ).toMatchFormat());
});
