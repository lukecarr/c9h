import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import p, { ParserType } from './parsers'

export default function(name: string, paths: string[], parsers: ParserType[]): any {
    for (const path of paths) {
        for (const parser of parsers) {
            for (const extension of p[parser].extensions()) {
                const file = join(path, `${name}.${extension}`)
                if (existsSync(file)) {
                    const contents = readFileSync(file, { encoding: 'utf-8' })
                    return p[parser].parse(contents)
                }
            }
        }
    }
  
    return false
}
