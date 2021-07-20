![cottonmouth](https://user-images.githubusercontent.com/24438483/126182599-b04d8b13-6786-45e7-80be-3cdbb8086a05.png)

# 🐍 cottonmouth

![npm](https://img.shields.io/npm/v/c9h)
![Codecov](https://img.shields.io/codecov/c/gh/lukecarr/c9h)
![CircleCI](https://img.shields.io/circleci/build/gh/lukecarr/c9h)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/lukecarr/c9h)
![npms.io (quality)](https://img.shields.io/npms-io/final-score/c9h?label=npms.io%20score)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/c9h)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c9h)

- 📁 **One library, many formats.** JSON, JSON5, INI, YAML, and TOML are all supported out-of-the-box as file formats!
- 💻 **Environment variables.** Handle environment variables as a source of configuration with no effort!
- 💯 **Zero configuration.** `cottonmouth` works out-of-the-box using sensible defaults with no configuration required!
- 💪 **Typescript.** Fully typed and self-documenting.
- 🛠 **Extensible.** Bring your own file format parsers if we don't support your configuration files natively!

> **`cottonmouth` is still in development, but most desired functionality is present and breaking changes are unlikely.**

## Related packages

- 🌐 [**fastify-c9h.**](https://github.com/lukecarr/fastify-c9h) Fastify plugin wrapper for `cottonmouth`. Decorates the Fastify instance with a `c9h` property containing your configuration.

## Installation

`cottonmouth` is available on NPM under the package name `c9h`. You can add it to your project like so:

```bash
npm install c9h
# OR
yarn add c9h
```

## Usage

```js
const config = require('c9h')({
  /* options */
});
// OR
import c9h from 'c9h';
const config = c9h({
  /* options */
});
```

This will look for `your-package.{toml,yaml,yml,json,json5,ini}` in `./` (the current working directory), `/etc/your-package/`, and `$HOME/.your-package/`, and store the parsed config in the `config` variable.

## Options

Although `cottonmouth` is advertised as a "zero-config config", it's actually an extremely extensible package.

When invoking `c9h()`, you can optionally provide an object contains various settings to configure how `cottonmouth` functions. The default values are included below:

```js
const options = {
  name: process.env.npm_package_name || path.parse(process.cwd()).name,
  filename: options.name,
  defaults: {},
  parsers: ['json', 'json5', 'toml', 'yaml', 'ini'],
  paths: [(name) => `${process.env.HOME}/.${name}`, process.cwd, (name) => `/etc/${name}`],
  mergeArray: true,
};
```

### `name`

This is the name used to generate the directories (`options.paths`) where `cottonmouth` looks for your configuration file.

This can be a string, or a function that returns a string (useful for scenarios when a dynamic name is desired, such as including the `NODE_ENV` env var value).

By default, this is automatically generated as the name provided in your project's `package.json` file, or the name of your project's working directory.

### `filename`

This is the name of your configuration file (excluding the extension).

This can be a string, or a function that returns a string.

By default, this is set to the value of the `name` option, which defaults to your project's `package.json` name property, or the name of your project's working directory.

### `defaults`

This is the object containing any default values for your configuration. See [Value Priority](#value-priority) for guidance on the priority of configuration values from different sources.

By default, there are no default configuration values.

### `parsers`

This is an array of configuration file parsers that you'd like `cottonmouth` to use. Removing a parser from this array will allow you to ignore a configuration file in a specific file format (even if it exists).

Each parser implements the `Parser` interface:

```ts
export interface Parser {
  /**
   * Returns the file extensions that the parser supports.
   */
  extensions(): string[];
  /**
   * Attempts to parse a file contents, and returns the parsed
   * content.
   *
   * @param file The raw string contents of the file to parse.
   */
  parse(file: string): Record<string, any>;
}
```

By default, all parsers (`[json, json5, toml, yaml, ini]`) are enabled.

> **You can write your own parsers that implement the above interface, and provide them in this option! This way you can parse custom configuration file formats that aren't natively supported by `cottonmouth`!**

### `paths`

This is an array of functions that represent the different directories `cottonmouth` should look for your configuration file in. Each function should return a string which is the directory path, and the `name` option is provided to the function as an argument to allow for dynamic directories based on your project name.

By default, the current working directory (`process.cwd`), the etc directory (`/etc/${name}`), and a hidden directory in your user's HOME directory (`$HOME/.${name}`).

For example, if your project's name is `c9h` and your current working directory is `/var/www`, `cottonmouth` will look for your configuration file in these three places by default: `/var/www`, `/etc/c9h`, and `/home/lukecarr/.c9h`.

### `mergeArray`

This dictates how arrays are handled in configuration files. If set to `true`, arrays in configuration files will be merged with the default value, rather than replaced.

By default, this option is set to `true`.

### Real-world example

Given the following options:

```js
const options = {
  name: 'c9h',
  filename: () => `config-${process.env.NODE_ENV}`,
  defaults: {},
  parsers: ['json', 'json5', 'toml', 'yaml', 'ini'],
  paths: [(name) => `${process.env.HOME}/.${name}`, process.cwd, (name) => `/etc/${name}`],
  mergeArray: true,
};
```

`cottonmouth` will look in the following directories:

- `/home/lukecarr/.c9h`
- `/your/current/directory`
- `/etc/c9h`

In each directory, `cottonmouth` will look for these files (where `$NODE_ENV` is replaced at runtime with the value of the `NODE_ENV` environment variable):

- `config-$NODE_ENV.json`
- `config-$NODE_ENV.json5`
- `config-$NODE_ENV.toml`
- `config-$NODE_ENV.yaml`
- `config-$NODE_ENV.ini`

## Environment variables

`cottonmouth` has out-of-the-box support for environment variables. Environment variables should be prefixed with your project's name (`options.name`) in uppercase with `_`'s used as spaces.

### Example

> In the below example, the project's name is `c9h`.

Given the following environment variables:

```bash
C9H_SERVER_PORT=3000
C9H_SERVER_HOST=0.0.0.0
```

This would be parsed by `cottonmouth` into the following configuration object, overriding any default values or values parsed from a configuration file:

```js
const config = {
  server: {
    port: '3000',
    host: '0.0.0.0',
  },
};
```

> It's important to note (as the above example indicates) that all environment variables are parsed as strings, even if they have numeric values (such as the `C9H_SERVER_PORT` env var above).

## Value Priority

When `cottonmouth` loads your configuration, it assumes the following priority order for configuration values:

1. Default values specified in `options.defaults` (LOWEST)
2. Values parsed from a configuration file
3. Environment variables (HIGHEST)

## License

`cottonmouth` is licensed under the [`MIT License`](LICENSE)
