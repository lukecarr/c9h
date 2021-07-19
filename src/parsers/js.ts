import { existsSync } from 'fs'

export default function (file: string): Record<string, unknown> | false {
  if (!existsSync(`${file}.js`)) {
    return false
  }

  return require(`${file}.js`)
}
