import { FilesystemOptions, FilesystemTap } from './base';

export class JsonTap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['json']);
  }

  parseContents(contents: string): unknown {
    return JSON.parse(contents);
  }
}
