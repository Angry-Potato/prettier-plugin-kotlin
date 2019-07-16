describe("modifier", () => {
  test("primary constructor modifiers", () =>
    expect(
      "data class MyClass protected @Inject constructor(var name: String) {}"
    ).toChangeFormat(
      "data class MyClass protected @Inject constructor(var name: String)"
    ));
});
