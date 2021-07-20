/**
 * Parses environment variables into an object. Variables
 * are filtered based on the provided prefix, and `_` characters
 * in variable names are used to split the variable and introduce
 * nesting.
 *
 * @param prefix The env var prefix used to filter variables.
 * @param env The object containing env vars.
 * @returns The parsed object.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function parse<T = any>(prefix: string, env = process.env): Partial<T> {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const result = {} as any;

  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith(prefix)) {
      continue;
    }

    const keys = key.replace(prefix, '').toLowerCase().split('_');

    let current = result;
    let currentKey;

    while ((currentKey = keys.shift())) {
      if (keys.length) {
        current[currentKey] = {};
        current = current[currentKey];
      } else {
        current[currentKey] = value;
      }
    }
  }

  return result;
}

/**
 * Converts a c9h name to an environment variable prefix. `@`
 * characters are removed, `-` and `/` characters are replaced
 * with `_`, and lowercase letters are converted to uppercase.
 *
 * An error is thrown if any other characters (unsupported) are
 * found in `name`.
 *
 * @param name The c9h name to convert to an env var prefix.
 * @returns The converted name as an env var prefix.
 */
export function toPrefix(name: string): string {
  // Remove @ chars, and replace - or / with _
  name = name.replace(/[@]/g, '').replace(/[-\/]/g, '_').toUpperCase();

  if (!name.match(/^[A-Z0-9_]+$/)) {
    throw new Error(
      `Invalid characters were provided for c9h name. The name must only include letters, digits, '-', '_', '@', and '/'.`,
    );
  }

  return `${name}_`;
}
