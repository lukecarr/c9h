import ini from 'ini';
import { FilesystemOptions, FilesystemTap } from 'taps/fs/base';

export class IniTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['ini']);
  }

  parseContents<T>(contents: string): Partial<T> {
    return ini.parse(contents) as Partial<T>;
  }
}
