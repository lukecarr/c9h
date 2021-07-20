import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Parser } from './parsers';

/**
 * This method attempts to find a configuration file matching a provided name
 * in an assortment of directories. The extension of the file is dictated by
 * the parsers provided to this function.
 *
 * @param name The name of the file (excluding extension) to load.
 * @param paths An array of directory paths to search for the file to load in.
 * @param parsers An array of parsers to handle the file if found and loaded.
 * @returns The parsed contents of the loaded file.
 */
export default function (name: string, paths: string[], parsers: Parser[]): any {
  for (const path of paths) {
    for (const parser of parsers) {
      for (const extension of parser.extensions()) {
        const file = join(path, `${name}.${extension}`);
        if (existsSync(file)) {
          const contents = readFileSync(file, { encoding: 'utf-8' });
          return parser.parse(contents);
        }
      }
    }
  }

  return false;
}
