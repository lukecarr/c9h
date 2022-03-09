import { FilesystemOptions, FilesystemTap } from 'taps/fs/base';

export class JsonTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['json']);
  }

  parseContents<T>(contents: string): Partial<T> {
    return JSON.parse(contents);
  }
}
