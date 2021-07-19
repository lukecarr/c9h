import { Parser } from './parsers'

export const defaultParsers: Parser[] = Object.values(Parser)
export const defaultPaths: ((name: string) => string)[] = [(name) => `${process.env.HOME}/.${name}`, process.cwd, (name) => `/etc/${name}`]
