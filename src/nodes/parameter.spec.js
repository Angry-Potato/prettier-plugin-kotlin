describe("parameter", () => {
  test("primary constructor param", () =>
    expect("class MyClass constructor(var name: String) {}").toChangeFormat(
      "class MyClass(var name: String)"
    ));

  test("readonly primary constructor param", () =>
    expect("class MyClass constructor(val name: String) {}").toChangeFormat(
      "class MyClass(val name: String)"
    ));
});
