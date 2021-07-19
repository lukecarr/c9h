import { join, parse } from 'path'
import p, { Parser } from './parsers'
import parseEnv from './env'
import merge from './merge'
import { defaultPaths, defaultParsers } from './defaults'

export default function <T> ({
  name = process.env.npm_package_name || parse(process.cwd()).name,
  defaults = {},
  parsers = defaultParsers,
  paths = defaultPaths,
  mergeArray = true,
}: {
  name?: string,
  defaults?: Partial<T>,
  parsers?: Parser[],
  paths?: (string | ((name: string) => string))[],
  mergeArray?: boolean,
} = {}): Partial<T> {
  const files = paths.map((fn) => join(typeof(fn) === 'string' ? fn : fn(name), name))

  let parsed;

  for (const file of files) {
    for (const parser of parsers) {
      parsed = p[parser](file)

      if (parsed) {
        break
      }
    }

    if (parsed) {
      break
    }
  }

  const env = parseEnv(`${name.toUpperCase()}_`)

  return merge(
    defaults,
    [parsed, env],
    { mergeArray },
  )
}
