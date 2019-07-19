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
import kastree.ast.psi.Parser
import kastree.ast.psi.Converter
import java.io.File
import com.google.gson.Gson
import com.google.gson.GsonBuilder as gsonBuilder
import com.google.gson.reflect.*`
    ).toMatchFormat());

  test("with extra lines", () =>
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
  import kastree.ast.psi.Parser
  import kastree.ast.psi.Converter
  import java.io.File

  import com.google.gson.Gson
  import com.google.gson.GsonBuilder as gsonBuilder
  import com.google.gson.reflect.*`
    ).toChangeFormat(`package com.github.angrypotato.kotato

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
import com.google.gson.GsonBuilder as gsonBuilder
import com.google.gson.reflect.*`));
});
