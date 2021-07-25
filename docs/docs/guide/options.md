# Options

Although cottonmouth is advertised as a "zero-config config", it's actually an extremely extensible package.

When invoking `c9h()`, you can optionally provide an object contains various settings to configure how cottonmouth functions. The default values are included below:

```js
const options = {
  name: process.env.npm_package_name || path.parse(process.cwd()).name,
  filename: options.name,
  defaults: {},
  parsers: ['json', 'json5', 'toml', 'yaml', 'ini'],
  paths: [(name) => `${process.env.HOME}/.${name}`, process.cwd, (name) => `/etc/${name}`],
  mergeArray: true,
  mergeFiles: 'first',
};
```

## `name`

This is the name used to generate the directories (`options.paths`) where `cottonmouth` looks for your configuration file.

This can be a string, or a function that returns a string (useful for scenarios when a dynamic name is desired, such as including the `NODE_ENV` env var value).

By default, this is automatically generated as the name provided in your project's `package.json` file, or the name of your project's working directory.

## `filename`

This is the name of your configuration file (excluding the extension).

This can be a string, or a function that returns a string.

By default, this is set to the value of the `name` option, which defaults to your project's `package.json` name property, or the name of your project's working directory.

## `defaults`

This is the object containing any default values for your configuration. See [Value Priority](#value-priority) for guidance on the priority of configuration values from different sources.

By default, there are no default configuration values.

## `parsers`

This is an array of configuration file parsers that you'd like cottonmouth to use. Removing a parser from this array will allow you to ignore a configuration file in a specific file format (even if it exists).

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

::: tip
**You can write your own parsers that implement the above interface, and provide them in this option! This way you can parse custom configuration file formats that aren't natively supported by cottonmouth!**
:::

## `paths`

This is an array of functions that represent the different directories cottonmouth should look for your configuration file in. Each function should return a string which is the directory path, and the `name` option is provided to the function as an argument to allow for dynamic directories based on your project name.

By default, the current working directory (`process.cwd`), the etc directory (`/etc/${name}`), and a hidden directory in your user's HOME directory (`$HOME/.${name}`).

For example, if your project's name is `c9h` and your current working directory is `/var/www`, `cottonmouth` will look for your configuration file in these three places by default: `/var/www`, `/etc/c9h`, and `/home/lukecarr/.c9h`.

## `mergeArray`

This dictates how arrays are handled in configuration files. If set to `true`, arrays in configuration files will be merged with the default value, rather than replaced.

By default, this option is set to `true`.

## `mergeFiles`

This dictates how cottonmouth handles scenarios where multiple configuration files are found.

This can be one of:

- `'merge'`: This indicates that c9h should merge multiple files if found, using the same method to merge files with default values.
- `'error'`: This indicates that c9h should throw an error if multiple files are found. This mode is good if you're expecting to only have one file, and what c9h to flag when this isn't the case.
- `'first'`: This indicates that c9h should use the first file that it finds, and silently ignore all others.

By default, this option is set to `'first'`.

## Real-world example

Given the following options:

```js
const options = {
  name: 'c9h',
  filename: () => `config-${process.env.NODE_ENV}`,
  defaults: {},
  parsers: ['json', 'json5', 'toml', 'yaml', 'ini'],
  paths: [(name) => `${process.env.HOME}/.${name}`, process.cwd, (name) => `/etc/${name}`],
  mergeArray: true,
  mergeFiles: 'merge',
};
```

Cottonmouth will look in the following directories:

- `/home/lukecarr/.c9h`
- `/your/current/directory`
- `/etc/c9h`

In each directory, cottonmouth will look for these files (where `$NODE_ENV` is replaced at runtime with the value of the `NODE_ENV` environment variable):

- `config-$NODE_ENV.json`
- `config-$NODE_ENV.json5`
- `config-$NODE_ENV.toml`
- `config-$NODE_ENV.yaml`
- `config-$NODE_ENV.ini`

If multiple configuration files are found, cottonmouth will merge their parsed contents together (because `options.mergeFiles == 'merge'`).
