import yaml from 'js-yaml';
import { FilesystemOptions, FilesystemTap } from './base';

export class YamlTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['yaml', 'yml']);
  }

  parseContents(contents: string): unknown {
    return yaml.load(contents);
  }
}
