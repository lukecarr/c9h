import { MergeOptions } from './utils';

export type Options = {
  /**
   * This is the name of the c9h instance.
   *
   * This can be a string, or a function that returns a string
   * (to allow for dynamic names).
   *
   * By default, this is the `name` property of your project's
   * `package.json` file or the name of your project's current
   * working directory.
   */
  name: string;

  merge: MergeOptions;
};
