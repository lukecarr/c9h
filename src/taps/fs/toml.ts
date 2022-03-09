import toml from '@iarna/toml';
import { FilesystemOptions, FilesystemTap } from './base';

export class TomlTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['toml']);
  }

  parseContents<T>(contents: string): Partial<T> {
    return toml.parse(contents) as unknown as Partial<T>;
  }
}
