import json from './json'
import json5 from './json5'
import toml from './toml'
import yaml from './yaml'
import ini from './ini'

/**
 * Represents differenet parser types that are
 * supported and implemented by c9h.
 */
export enum ParserType {
  /**
   * The JSON parser parses `.json` files.
   */
  JSON = 'json',
  /**
   * The JSON5 parser parses `.json5` files.
   */
  JSON5 = 'json5',
  /**
   * The TOML parser parses `.toml` files.
   */
  TOML = 'toml',
  /**
   * The YAML parser parses `.yaml` and `.yml` files.
   */
  YAML = 'yaml',
  /**
   * The INI parser parses `.ini` files.
   */
  INI = 'ini',
}

/**
 * Represents a parser that parses a file contents, and returns
 * a parsed configuration object.
 */
export interface Parser {
  /**
   * Returns the file extensions that the parser supports.
   */
  extensions(): string[]
  /**
   * Attempts to parse a file contents, and returns the parsed
   * content.
   * 
   * @param file The raw string contents of the file to parse.
   */
  parse(file: string): Record<string, any>
}

const parsers: {
  [p in ParserType]: Parser
} = {
  ini,
  json,
  json5,
  toml,
  yaml,
}

export default parsers
