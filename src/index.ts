import { parse } from 'path'
import parseEnv from './env'
import merge from './merge'
import { Options } from './options'
import { defaultPaths, defaultParsers } from './defaults'
import loadFile from './load'

export default function <T> (options?: Options<T>): Partial<T> {
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
