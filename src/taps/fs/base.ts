import { promises, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Options } from 'options';
import { Parser, ParserSync, Tap } from 'taps/base';
import { fileExists, merge } from 'utils';

/**
 * Represents different behaviour modes for merging multiple files.
 *
 * `merge`: This indicates that the tap should merge multiple files if
 * found.
 *
 * `error`: This indicates that the tap should throw an error if multiple
 * files are found. This mode is good if you're expecting to
 * only have one file, and want the tap to flag when this isn't
 * the case.
 *
 * `first`: This indicates that the tap should use the first file that it
 * finds, and silently ignore all others.
 */
type FileMergeMode = 'merge' | 'error' | 'first';

export type FilesystemOptions = Partial<{
  /**
   * This is the filenames that the tap will search for in
   * the provided paths.
   *
   *
   * By default, the global c9h `name` option is used.
   */
  filenames: ((name: string) => string)[];
  /**
   * The directories that the tap should search for
   * configuration files in.
   *
   * By default, the current working directory (`process.cwd`),
   * the etc directory (`/etc/${name}`), and a hidden directory
   * in your user's HOME directory (`$HOME/.${name}`) are
   * searched by c9h.
   */
  paths: ((name: string) => string)[];

  /**
   * This indicates the tap's behaviour if multiple configuration
   * files are found.
   */
  mergeFiles: FileMergeMode;

  /**
   * The encoding to use when reading configuration files.
   *
   * By default, `utf-8` is used.
   */
  encoding: BufferEncoding;
}>;

export abstract class FilesystemTap extends Tap<FilesystemOptions | undefined> implements Parser, ParserSync {
  protected extensions: string[];

  constructor(options: FilesystemOptions | undefined, extensions: string[]) {
    super(options);
    this.extensions = extensions;
  }

  private getPaths({ name }: Options): string[] {
    return (
      this.options?.paths || [
        (name) => `${process.env.HOME}/.${name}`,
        () => process.cwd(),
        () => `${process.cwd()}/.config`,
        (name) => `/etc/${name}`,
      ]
    ).map((x) => x(name));
  }

  private getFilenames({ name }: Options): string[] {
    return (this.options?.filenames || [(name) => name]).map((x) => x(name));
  }

  private get encoding() {
    return this.options?.encoding ?? 'utf-8';
  }

  async parse<T>(c9hOptions: Options): Promise<Partial<T>> {
    const found = [];

    for (const path of this.getPaths(c9hOptions)) {
      for (const filename of this.getFilenames(c9hOptions)) {
        for (const extension of this.extensions) {
          const file = join(path, `${filename}.${extension}`);
          if (await fileExists(file)) {
            const contents = await promises.readFile(file, { encoding: this.encoding });
            const parsed = this.parseContents<T>(contents);

            if (this.options?.mergeFiles === 'first') {
              return parsed;
            } else if (this.options?.mergeFiles === 'error' && found.length > 0) {
              throw new Error("Multiple files found by tap (mergeFiles is set to 'error')!");
            }

            found.push(parsed);
          }
        }
      }
    }

    return merge({}, found, { array: c9hOptions.merge?.array ?? false });
  }

  parseSync<T>(c9hOptions: Options): Partial<T> {
    const found = [];

    for (const path of this.getPaths(c9hOptions)) {
      for (const filename of this.getFilenames(c9hOptions)) {
        for (const extension of this.extensions) {
          const file = join(path, `${filename}.${extension}`);
          if (existsSync(file)) {
            const contents = readFileSync(file, { encoding: this.encoding });
            const parsed = this.parseContents<T>(contents);

            if (this.options?.mergeFiles === 'first') {
              return parsed;
            } else if (this.options?.mergeFiles === 'error' && found.length > 0) {
              throw new Error("Multiple files found by tap (mergeFiles is set to 'error')!");
            }

            found.push(parsed);
          }
        }
      }
    }

    return merge({}, found, { array: c9hOptions.merge?.array ?? false });
  }

  abstract parseContents<T>(contents: string): Partial<T>;
}
