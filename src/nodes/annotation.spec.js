describe("annotation", () => {
  test("file annotation", () =>
    expect(`@file:JvmName("Foo")

package org.jetbrains.demo`).toMatchFormat());

  test("primary constructor modifiers", () =>
    expect(
      "data class MyClass protected @Inject(123) constructor(var name: String) {}"
    ).toChangeFormat(
      "data class MyClass protected @Inject(123) constructor(var name: String)"
    ));

  test("annotation use-site targets", () =>
    expect(
      "class Example(@field:Ann.Thing val foo: Int, @get:Ann val bar: String, @param:Ann val quux: Int)"
    ).toChangeFormat(
      "class Example(\n  @field:Ann.Thing val foo: Int,\n  @get:Ann val bar: String,\n  @param:Ann val quux: Int\n)"
    ));
});
