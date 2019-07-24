
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

## VSCode

To use this plugin with the VSCode Prettier plugin, navigate to the VSCode Prettier plugin install directory (`$HOME/.vscode/extensions/esbenp.prettier-vscode-<VERSION>` on ubuntu), and install this package: `npm install --save prettier-plugin-kotlin`.

The format on save functionality doesn't appear to work when plugins are added to extensions in this fashion, but you can still use the plugin by right clicking in your Kotlin file, and selecting `Format Document`.

Follow [this PR](https://github.com/prettier/prettier-vscode/pull/757) for more info.

## Run tests

```sh
npm run test
```

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
