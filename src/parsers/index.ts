import json from './json'
import json5 from './json5'
import js from './js'
import toml from './toml'
import yaml from './yaml'
import ini from './ini'

export enum Parser {
  JSON = 'json',
  JSON5 = 'json5',
  JS = 'js',
  TOML = 'toml',
  YAML = 'yaml',
  INI = 'ini',
}

const parsers: {
  [p in Parser]: (file: string) => Record<string, unknown> | false
} = {
  json,
  json5,
  js,
  toml,
  yaml,
  ini,
}

export default parsers
