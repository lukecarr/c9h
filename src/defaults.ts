import { ParserType } from './parsers'

export const defaultParsers: ParserType[] = Object.values(ParserType)
export const defaultPaths: ((name: string) => string)[] = [(name) => `${process.env.HOME}/.${name}`, process.cwd, (name) => `/etc/${name}`]
