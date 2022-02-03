import { promises } from 'fs';

/**
 * Asynchronously checks if a file exists.
 *
 * @param path The path of the file to check.
 * @returns True if the file exists, otherwise false.
 */
export const fileExists = async (path: string): Promise<boolean> =>
  promises.stat(path).then(
    () => true,
    () => false,
  );

/**
 * Checks if a value is an object or not.
 *
 * @param obj The value to check.
 * @returns True if the provided value is an object, otherwise false.
 */
export const isObject = <T>(obj: T): boolean => obj && typeof obj === 'object' && !Array.isArray(obj);

/**
 * Options used to configure the behaviour of object merging.
 */
export type MergeOptions = {
  /**
   * This indicates whether arrays should be merged or replaced
   * when found in both the original and merging object.
   */
  array?: boolean;
};

/**
 * Performs a deep merge of two or more objects, and returns the
 * merged result.
 *
 * @param target The original object.
 * @param sources An array of objects to merge into the original.
 * @param options Options used to configure the merge behaviour.
 * @returns The merged result.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function merge(target: any, sources: any[], options?: MergeOptions): any {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const [key, value] of Object.entries(source)) {
      if (isObject(value)) {
        if (!target[key]) {
          target[key] = {};
        }
        merge(target[key], [value], options);
      } else if (Array.isArray(value) && options?.array) {
        if (!target[key]) {
          target[key] = [];
        }
        target[key] = [...target[key], ...value];
      } else {
        target[key] = value;
      }
    }
  }

  return merge(target, sources, options);
}

/**
 * Utility type for making all properties in T "callable".
 */
export type Callable<T> = { [P in keyof T]: T[P] | (() => T[P]) };

/**
 * Checks if a value is callable. If it is, the value is
 * invoked and the return value is returned, otherwise the
 * value is returned as is.
 *
 * @param val The value to check.
 * @returns The callable's return value, or the value as is.
 */
export const ifCallable = <T>(val: T | (() => T)): T => (val instanceof Function ? val() : val);

type Dict = { [p: string]: unknown };

/**
 * Unflattens an object using delimited keys.
 *
 * @param obj The object to unflatten.
 * @param keyTransformer The function to use
 * when transforming keys into "unflattened"
 * versions.
 * @returns The unflattened object.
 */
export const unflatten = (obj: Dict, keyTransformer: (key: string) => string[]): Dict => {
  const result = {} as Dict;

  for (const [key, value] of Object.entries(obj)) {
    const keys = keyTransformer(key);

    let current = result;
    let currentKey;

    while ((currentKey = keys.shift())) {
      if (keys.length) {
        current[currentKey] = {};
        current = current[currentKey] as { [p: string]: unknown };
      } else {
        current[currentKey] = value;
      }
    }
  }

  return result;
};
