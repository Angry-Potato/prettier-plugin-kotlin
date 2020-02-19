package com.github.angrypotato.kotato

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.NoRunCliktCommand
import com.github.ajalt.clikt.core.context
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.output.CliktHelpFormatter
import com.github.ajalt.clikt.output.HelpFormatter
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.mordant.TermColors
import java.io.File
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import java.io.*


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

data class SerializedFile(val file: Node.File, val extrasMap: Converter.WithExtras) : Serializable

class Parse : CliktCommand(help = "Parses kotlin code from STDIN and outputs its AST in BINARY") {
    init {
        context { helpFormatter = ColorHelpFormatter() }
    }

    override fun run() {
        val code = System.`in`.readBytes().toString(charset("utf-8"))
        val extrasMap = Converter.WithExtras()
        val file = Parser(extrasMap).parseFile(code)
        val serializedFile = SerializedFile(file, extrasMap)
        val ser = ObjectSerializer.serialize(serializedFile)
        val container = mapOf("astNode" to ser)
        val gson = GsonBuilder().setPrettyPrinting().create()
        println(gson.toJson(container))
    }
}

class Write : CliktCommand(help = "Parses AST in BINARY from STDIN and Writes kotlin code to STDOUT") {
    init {
        context { helpFormatter = ColorHelpFormatter() }
    }

    override fun run() {
        val ast = System.`in`.readBytes().toString(charset("iso-8859-1"))
        val deser: SerializedFile? = ObjectSerializer.deserialize(ast)
        if (deser != null) {
            if (deser.file != null && deser.extrasMap != null) {
                println(Writer.write(deser.file, deser.extrasMap))
            }
        }
    }
}

fun main(args: Array<String>) = Kotato().subcommands(Parse(), Write()).main(args)
