const prettier = require("prettier");
const code = `
package me.foo
class Jobbie {
private fun no()
}

fun bar() {
    // Print hello
    println("Hello, World!")
}

fun baz() = println("Hello, again!")`;
prettier.format(code, {
  parser: "kotlin",
  plugins: ["."]
});
