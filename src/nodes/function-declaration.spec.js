describe("function-declaration", () => {
  test("override fun", () =>
    expect(`class ColorHelpFormatter {
    private val tc = TermColors(TermColors.Level.ANSI16)

    override fun r(tag: String, value: String) = tc.green(super.r(tag, value))
}
`).toMatchFormat());

  test("complex expression body", () =>
    expect(`class ColorHelpFormatter {
    private val tc = TermColors(TermColors.Level.ANSI16)

    override fun r(title: String) = (tc.bold + tc.underline)(super.r(title))
}
`).toMatchFormat());

  test("block body", () =>
    expect(`fun printHello(name: String?) {
    if (name != null) println("Hello \${name}") else println("Hi there!")
}
`).toMatchFormat());
});
