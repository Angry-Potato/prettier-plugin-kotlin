describe("block", () => {
  test("init block", () =>
    expect(`class InitOrderDemoa(name: String) {
    init {
        println("First initializer block that prints \${name}")
    }
}
`).toMatchFormat());

  test("two init blocks", () =>
    expect(`class InitOrderDemoa(name: String) {
    init {
        println("First initializer block that prints \${name}")
    }

    init {
        println("Second initializer block that prints \${name.length}")
    }
}
`).toMatchFormat());
});
