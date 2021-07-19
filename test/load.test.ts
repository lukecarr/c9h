import loadFile from '../src/load'
import { ParserType } from '../src/parsers'

describe('file loading', () => {
  it('should load files', () => {
    const loaded = loadFile('example', ['./test'], [ParserType.JSON])
    
    expect(loaded).toBeDefined()
    expect(loaded).toHaveProperty('hello')
    expect(loaded.hello).toEqual('world')
  })

  it('should return false if no files are found', () => {
    expect(loadFile('example', ['./test'], [ParserType.JSON5])).toBeFalsy()
  })
})
