import { readFileSync, existsSync } from 'fs'

export default function (file: string): Record<string, unknown> | false {
  if (!existsSync(`${file}.json`)) {
    return false
  }

  return JSON.parse(readFileSync(`${file}.json`, { encoding: 'utf-8' }))
}
