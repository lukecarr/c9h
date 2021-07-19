import { readFileSync, existsSync } from 'fs'
import { parse } from 'ini'

export default function (file: string): Record<string, unknown> | false {
  if (!existsSync(`${file}.ini`)) {
    return false
  }

  return parse(readFileSync(`${file}.ini`, { encoding: 'utf-8' }))
}
