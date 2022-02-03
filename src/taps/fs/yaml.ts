import yaml from 'js-yaml';
import { FilesystemOptions, FilesystemTap } from './base';

export class YamlTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['yaml', 'yml']);
  }

  parseContents<T>(contents: string): Partial<T> {
    return yaml.load(contents) as Partial<T>;
  }
}
