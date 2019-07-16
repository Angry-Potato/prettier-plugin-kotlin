describe("primary-constructor", () => {
  test("unmodified primary constructor", () =>
    expect("class MyClass constructor(name: String) {}").toChangeFormat(
      "class MyClass(name: String)"
    ));

  test("init props", () =>
    expect(
      "class Person(val firstName: String, val lastName: String, var age: Int)"
    ).toMatchFormat());

  test("visibility modifiers and annotations", () =>
    expect(
      "class Customer public @Inject constructor(name: String)"
    ).toMatchFormat());
});
