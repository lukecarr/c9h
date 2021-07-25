import { Parser } from './parsers';

/**
 * Represents different behaviour modes for merging multiple
 * configuration files.
 *
 * `merge`: This indicates that c9h should merge multiple files if
 * found, using the same method to merge files with default
 * values.
 *
 * `error`: This indicates that c9h should throw an error if multiple
 * files are found. This mode is good if you're expecting to
 * only have one file, and what c9h to flag when this isn't
 * the case.
 *
 * `first`: This indicates that c9h should use the first file that it
 * finds, and silently ignore all others.
 */
type FileMergeMode = 'merge' | 'error' | 'first';

/**
 * Options used to configure c9h's behaviour.
 */
export type Options<T> = {
  /**
   * This is the name of the c9h instance. It's supplied
   * to the functions declared in the `paths` property.
   *
   * This can be a string, or a function that returns a string
   * (to allow for dynamic names).
   *
   * By default, this is the `name` property of your project's
   * `package.json` file or the name of your project's current
   * working directory.
   */
  name?: string | (() => string);
  /**
   * This is the filename of the configuration file (excluding
   * the file extension, as this is provided by the parser).
   *
   * This can be a string, or a function that returns a string
   * (to allow for dynamic filenames).
   *
   * By default, this is identical to the `name` property.
   */
  filename?: string | (() => string);
  /**
   * Default configuration values. These values will be overriden
   * by values found in configuration files and environment
   * variable values.
   *
   * By default, no defaults are set.
   */
  defaults?: Partial<T>;
  /**
   * The parsers that c9h should use when looking for configuration
   * files.
   *
   * By default, all parsers are enabled (JSON, JSON5, TOML, YAML,
   * and INI).
   */
  parsers?: Parser[];
  /**
   * The directories that c9h should search for the configuration files
   * in.
   *
   * By default, the current working directory (`process.cwd`), the etc
   * directory (``/etc/${name}``), and a hidden directory in your user's
   * HOME directory (``$HOME/.${name}``) are searched by c9h.
   */
  paths?: ((name: string) => string)[];
  /**
   * This indicates whether arrays should be merged or replaced
   * when found in both the default values and configuration files.
   */
  mergeArray?: boolean;
  /**
   * This indicates c9h's behaviour when multiple configuration files
   * are found.
   */
  mergeFiles?: FileMergeMode;
};
