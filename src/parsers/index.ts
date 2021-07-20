import json from './json';
import json5 from './json5';
import toml from './toml';
import yaml from './yaml';
import ini from './ini';

/**
 * Represents a parser that parses a file contents, and returns
 * a parsed configuration object.
 */
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
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  parse<T = any>(file: string): Partial<T>;
}

const parsers: Parser[] = [ini, json, json5, toml, yaml];

export default parsers;
