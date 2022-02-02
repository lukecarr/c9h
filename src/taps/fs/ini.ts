import ini from 'ini';
import { FilesystemOptions, FilesystemTap } from './base';

export class IniTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['ini']);
  }

  parseContents(contents: string): unknown {
    return ini.parse(contents);
  }
}
