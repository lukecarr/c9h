import { readFileSync, existsSync } from 'fs'
import { parse } from 'yaml'

function parseYaml(file: string, extension: 'yaml' | 'yml'): Record<string, unknown> | false {
  if (!existsSync(`${file}.${extension}`)) {
    return false
  }

  return parse(readFileSync(`${file}.${extension}`, { encoding: 'utf-8' }))
}

export default function (file: string): Record<string, unknown> | false {
  return parseYaml(file, 'yaml') || parseYaml(file, 'yml')
}
