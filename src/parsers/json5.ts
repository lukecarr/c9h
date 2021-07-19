import { readFileSync, existsSync } from 'fs'
import { parse } from 'json5'

export default function (file: string): Record<string, unknown> | false {
  if (!existsSync(`${file}.json5`)) {
    return false
  }

  return parse(readFileSync(`${file}.json5`, { encoding: 'utf-8' }))
}
