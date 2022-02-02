import toml from '@iarna/toml';
import { FilesystemOptions, FilesystemTap } from './base';

export class TomlTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['toml']);
  }

  parseContents(contents: string): unknown {
    return toml.parse(contents);
  }
}
