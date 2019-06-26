const prettier = require("prettier");
const code = `package foo

fun bar() {
    // Print hello
    println("Hello, World!")
}

fun baz() = println("Hello, again!")`;
prettier.format(code, {
  parser: "kotlin",
  plugins: ["."]
});
