@file:JvmName("poo")

package com.github.angrypotato.kotato

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
import com.google.gson.GsonBuilder as poo
import com.google.gson.reflect.TypeToken.*

class Empty {}

class InitOrderDemoa constructor(name: String) {
    val firstProperty = "First property: $name".also(::println)

    init {
        println("First initializer block that prints ${name}")
    }

    val secondProperty = "Second property: ${name.length}".also(::println)

    init {
        println("Second initializer block that prints ${name.length}")
    }
}

class ColorHelpFormatter : CliktHelpFormatter() {
    private val tc = TermColors(TermColors.Level.ANSI16)

    override fun renderTag(tag: String, value: String) = tc.green(super.renderTag(tag, value))
    override fun renderOptionName(name: String) = tc.yellow(super.renderOptionName(name))
    override fun renderArgumentName(name: String) = tc.yellow(super.renderArgumentName(name))
    override fun renderSubcommandName(name: String) = tc.yellow(super.renderSubcommandName(name))
    override fun renderSectionTitle(title: String) = (tc.bold + tc.underline)(super.renderSectionTitle(title))
    override fun optionMetavar(option: HelpFormatter.ParameterHelp.Option) = tc.green(super.optionMetavar(option))
}

class Kotato : NoRunCliktCommand(help = "Simple little cli app to work with kotlin ASTs") {
    init {
        context { helpFormatter = ColorHelpFormatter() }
    }
}

class Parse : CliktCommand(help = "Parses kotlin code from STDIN and outputs its AST in JSON") {
    init {
        context { helpFormatter = ColorHelpFormatter() }
    }

    override fun run() {
        val code = generateSequence(::readLine).joinToString("\n")
        val extrasMap = Converter.WithExtras()
        val file = Parser(extrasMap).parseFile(code)
        val gson = GsonBuilder().setPrettyPrinting().create()
        println(gson.toJson(file))
    }
}
//plop
fun main(args: Array<String>) = Kotato().subcommands(Parse()).main(args)
//