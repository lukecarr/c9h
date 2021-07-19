import { join, parse } from 'path'
import { ParserType } from './parsers'
import parseEnv from './env'
import merge from './merge'
import { defaultPaths, defaultParsers } from './defaults'
import loadFile from './load'

export default function <T> ({
  name = process.env.npm_package_name || parse(process.cwd()).name,
  defaults = {},
  parsers = defaultParsers,
  paths = defaultPaths,
  mergeArray = true,
}: {
  name?: string,
  defaults?: Partial<T>,
  parsers?: ParserType[],
  paths?: ((name: string) => string)[],
  mergeArray?: boolean,
} = {}): Partial<T> {
  const loaded = loadFile(name, paths.map((fn) => join(fn(name), name)), parsers)

  const env = parseEnv(`${name.toUpperCase()}_`)

  return merge(
    defaults,
    [loaded, env],
    { mergeArray },
  )
}
