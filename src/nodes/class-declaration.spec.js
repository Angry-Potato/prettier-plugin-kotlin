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
});
