import { defaultParsers, defaultPaths } from '../src/defaults'
import { ParserType } from '../src/parsers'

describe('defaultParsers', () => {
  let parsers: ParserType[]

  beforeAll(() => {
    parsers = defaultParsers
  })

  it('should contain JSON parsers', () => {
    expect(parsers).toContain('json')
    expect(parsers).toContain('json5')
  })

  it('should contain the TOML parser', () => {
    expect(parsers).toContain('toml')
  })

  it('should contain the YAML parser', () => {
    expect(parsers).toContain('yaml')
  })

  it('should contain the INI parser', () => {
    expect(parsers).toContain('ini')
  })
})

describe('defaultPaths', () => {
  let paths: string[]

  beforeAll(() => {
    process.env.HOME = '/home/jest'
    paths = defaultPaths.map((fn) => fn('test'))
  })

  it('should contain the current working directory', () => {
    expect(paths).toContain(process.cwd())
  })

  it('should contain the $HOME directory', () => {
    expect(paths).toContain(`/home/jest/.test`)
  })

  it('should contain the `/etc` directory', () => {
    expect(paths).toContain(`/etc/test`)
  })
})