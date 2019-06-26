package com.github.angrypotato.kotato

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.NoRunCliktCommand
import com.github.ajalt.clikt.core.context
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.output.CliktHelpFormatter
import com.github.ajalt.clikt.output.HelpFormatter
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.mordant.TermColors
import kastree.ast.psi.Parser
import kastree.ast.psi.Converter
import java.io.File
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken


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

class Parse : CliktCommand(help = "Parses a kotlin file and outputs its AST in JSON") {
    init {
        context { helpFormatter = ColorHelpFormatter() }
    }

    val fileName by argument(help = "file to parse")

    override fun run() {
        val code = File(fileName).inputStream().readBytes().toString(Charsets.UTF_8)
        val extrasMap = Converter.WithExtras()
        val file = Parser(extrasMap).parseFile(code)
        val gson = GsonBuilder().setPrettyPrinting().create()
        println(gson.toJson(file))
    }
}

fun main(args: Array<String>) = Kotato().subcommands(Parse()).main(args)