
<p align="center">
    <img width=210 alt="Prettier" src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">
    <img width=210 alt="Kotlin" src="https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin-logo.svg">
</p>

<p align="center">
    :construction: Work in Progress! :construction:
</p>
<h1 align="center">Welcome to prettier-plugin-kotlin 👋</h1>

<p>
  <a href="https://github.com/Angry-Potato/prettier-plugin-kotlin#readme">
    <img alt="npm" src="https://img.shields.io/npm/v/prettier-plugin-kotlin.svg" target="_blank" >
  </a>
  <a href="https://github.com/Angry-Potato/prettier-plugin-kotlin#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/Angry-Potato/prettier-plugin-kotlin/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/Angry-Potato/prettier-plugin-kotlin/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> prettier plugin for the Kotlin programming language.

## How it works

A Prettier plugin must first parse the source code of the target language
into a traversable data structure (Usually an **A**bstract **S**yntax **T**ree)
and then print out that data structure in a "pretty" style.

Prettier-plugin-kotlin uses a [Kotlin-Parser](./kotato) implemented in Kotlin, heavily based on [Kastree](https://github.com/cretz/kastree).

## Status

- Parser alpha version done, it can parse most of Kotlin code. However, performance is an issue, and we still need to make some tweaks and improvements.
- The printer is mostly done, it can output formatted code but needs to be improved on some cases.

## Install

```sh
npm install
```

## Getting started

Simply install `prettier` and `prettier-plugin-kotlin` as your project’s npm dependencies:

```bash
cd /path/to/project

## initialise an npm project if you haven’t done it yet
npm init
## or
yarn init

## add Prettier and its Kotlin plugin to project’s dev dependencies
npm install --dev prettier prettier-plugin-kotlin
## or
yarn add --dev prettier prettier-plugin-kotlin
```

<!-- Global use of plugin is blocked by https://github.com/prettier/prettier/issues/4000 -->

## Usage

````bash
## format all kotlin files in your project
./node_modules/.bin/prettier --write "**/*.kt"
## or
yarn prettier --write "**/*.kt"
````

## Integration with editors

If you are using a text editor that supports Prettier integration (e.g. [Atom](https://atom.io/packages/prettier-atom)), you can have all Prettier perks for your Kotlin code too!

> Use of this plugin in [VSCode extension](https://github.com/prettier/prettier-vscode) seems to be blocked by [prettier/prettier-vscode#395](https://github.com/prettier/prettier-vscode/issues/395).
> Feel free to help!

In order to get `prettier-plugin-kotlin` working in projects that do not have local npm dependencies, you can install this plugin globally:

```bash
npm install --global prettier prettier-plugin-kotlin
```

In this case, you might need to check the settings of your editor’s Prettier extension to make sure that a globally installed Prettier is used when it is not found in project dependencies (i.e. `package.json`).

Nevertheless, it is recommended to rely on local copies of `prettier` and `prettier-plugin-kotlin` as this reduces the chance of formatting conflicts between project collaborators.
This may happen if different global versions of Prettier or its Kotlin plugin are used.

Installing `prettier-plugin-kotlin` either locally or globally may require you to restart the editor if formatting does not work right away.

## Known VSCode Issue

If you've managed to install `prettier-plugin-kotlin` and `formatOnSave` doesn't work, but right-clicking and selecting `Format Document` works fine, you need to increase the `formatOnSaveTimeout`.

You can do this by opening your settings window (`Ctrl+,`), and searching `formatOnSave`, then setting the value of `formatOnSaveTimeout` to 5000. This will be fixed as we improve performance of the plugin.

## Author

👤 **Liam Humphreys**

- Github: [@Angry-Potato](https://github.com/Angry-Potato)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Angry-Potato/prettier-plugin-kotlin/issues).

## Credits

Special thanks to [@cretz](https://github.com/cretz) for creating [Kastree](https://github.com/cretz/kastree).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Liam Humphreys](https://github.com/Angry-Potato).<br />
This project is [MIT](https://github.com/Angry-Potato/prettier-plugin-kotlin/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
