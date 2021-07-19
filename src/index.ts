import { parse } from 'path'
import { ParserType } from './parsers'
import parseEnv from './env'
import merge from './merge'
import { defaultPaths, defaultParsers } from './defaults'
import loadFile from './load'

export default function <T> (options?: {
  name?: string,
  defaults?: Partial<T>,
  parsers?: ParserType[],
  paths?: ((name: string) => string)[],
  mergeArray?: boolean,
}): Partial<T> {
  const name = options?.name || process.env.npm_package_name || parse(process.cwd()).name
  const defaults = options?.defaults || {}
  const paths = (options?.paths || defaultPaths)
  const parsers = options?.parsers || defaultParsers
  const mergeArray = options?.mergeArray === undefined ? false : options.mergeArray

  const loaded = loadFile(name, paths.map((fn) => fn(name)), parsers)

  const env = parseEnv(`${name.toUpperCase()}_`)

  return merge(
    defaults,
    [loaded, env],
    { mergeArray })
  }
