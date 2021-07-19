import { readFileSync, existsSync } from 'fs'
import { parse } from '@iarna/toml'

export default function (file: string): Record<string, unknown> | false {
  if (!existsSync(`${file}.toml`)) {
    return false
  }

  return parse(readFileSync(`${file}.toml`, { encoding: 'utf-8' }))
}
