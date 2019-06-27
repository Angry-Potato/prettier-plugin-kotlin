describe("import-statement", () => {
  test("unchanged", () =>
    expect("import com.github.ajalt.clikt.core.CliktCommand").toMatchFormat());

  test("double spaced", () =>
    expect("import  com.github.ajalt.clikt.core.CliktCommand").toChangeFormat(
      "import com.github.ajalt.clikt.core.CliktCommand"
    ));

  test("wildcard doublespaced", () =>
    expect("import  com.github.ajalt.clikt.core.*").toChangeFormat(
      "import com.github.ajalt.clikt.core.*"
    ));

  test("aliased doublespaced", () =>
    expect(
      "import  com.github.ajalt.clikt.core.CliktCommand  as  cCommand"
    ).toChangeFormat(
      "import com.github.ajalt.clikt.core.CliktCommand as cCommand"
    ));
});
