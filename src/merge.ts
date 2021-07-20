/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
/**
 * Checks if a value is an object or not.
 *
 * @param obj The value to check.
 * @returns True if the provided value is an object, otherwise false.
 */
export function isObject(obj: any): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

/**
 * Options used to configure the behaviour of the merge function.
 */
export type MergeOptions = {
  /**
   * This indicates whether arrays should be merged or replaced
   * when found in both the original and merging object.
   */
  mergeArray?: boolean;
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
      } else if (Array.isArray(value) && options?.mergeArray) {
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
