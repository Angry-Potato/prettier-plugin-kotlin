const { spawn, spawnSync } = require("child_process");
const path = require("path");
const prettier = require("prettier");
const readline = require("readline");

// eslint-disable-next-line no-underscore-dangle
const { formatAST } = prettier.__debug;

const parser = spawn("./src/kotato");
afterAll(() => parser.kill());

const rl = readline.createInterface({
  input: parser.stdout,
  output: parser.stdin
});

const checkFormat = (before, after, config) =>
  new Promise(resolve => {
    const opts = Object.assign({ parser: "kotlin", plugins: ["."] }, config);

    rl.question(`${before}\n---\n`, response => {
      const { formatted } = formatAST(JSON.parse(response), opts);

      resolve({
        pass: formatted === `${after}\n`,
        message: () => `Expected:\n${after}\nReceived:\n${formatted}`
      });
    });
  });

const realFormat = content =>
  prettier.format(content, {
    parser: "kotlin",
    plugins: ["."]
  });

expect.extend({
  toChangeFormat(before, after, config = {}) {
    return checkFormat(before, after, config);
  },
  toMatchFormat(before, config = {}) {
    return checkFormat(before, before, config);
  },
  toFailFormat(before, message) {
    let pass = false;
    let error = null;

    try {
      realFormat(before);
    } catch (caught) {
      error = caught;
      pass = caught.message === message;
    }

    return {
      pass,
      message: () => `
        Expected format to throw an error for ${before} with ${message},
        but got ${error.message} instead
      `
    };
  },
  toInferKotlinParser(filename) {
    const filepath = path.join(__dirname, filename);
    const plugin = path.join(__dirname, "..", "..", "src", "kotlin");

    return prettier
      .getFileInfo(filepath, { plugins: [plugin] })
      .then(({ inferredParser }) => ({
        pass: inferredParser === "kotlin",
        message: () => `
          Expected prettier to infer the kotlin parser for ${filename},
          but got ${inferredParser} instead
        `
      }));
  }
});
