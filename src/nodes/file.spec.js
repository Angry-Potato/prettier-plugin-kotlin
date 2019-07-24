describe("file", () => {
  test("unchanged", () =>
    expect(
      `package com.github.angrypotato.kotato
import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.NoRunCliktCommand
import com.github.ajalt.clikt.core.context
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.output.CliktHelpFormatter
import com.github.ajalt.clikt.output.HelpFormatter
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.mordant.TermColors
import com.github.angrypotato.kotato.Parser
import com.github.angrypotato.kotato.Converter
import java.io.File
import com.google.gson.Gson
import com.google.gson.GsonBuilder as gsonBuilder
import com.google.gson.reflect.*`
    ).toMatchFormat());

  test("multiple classes per file", () =>
    expect(`class Empty

class InitOrderDemoa(name: String) {
    val firstProperty = "First property: \${name}".also(this::println)

    init {
        println("First initializer block that prints \${name}")
    }
}

class ColorHelpFormatter {
    private val tc = TermColors(TermColors.Level.ANSI16)
}`).toMatchFormat());
});
