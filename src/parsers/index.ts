import json from './json'
import json5 from './json5'
import toml from './toml'
import yaml from './yaml'
import ini from './ini'

export enum ParserType {
  JSON = 'json',
  JSON5 = 'json5',
  TOML = 'toml',
  YAML = 'yaml',
  INI = 'ini',
}

export interface Parser {
  extensions(): string[]
  parse(file: string): Record<string, unknown>
}

const parsers: {
  [p in ParserType]: Parser
} = {
  ini,
  json,
  json5,
  toml,
  yaml,
}

export default parsers
