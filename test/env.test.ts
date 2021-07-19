import { parse, toPrefix } from '../src/env'

describe('environment parsing', () => {
  it('should parse values', () => {
    const parsed = parse('TEST_', {
      TEST_HELLO: 'hello world',
      TEST_HELLOTHERE: 'general kenobi',
    })

    expect(Object.keys(parsed)).toHaveLength(2)

    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toEqual('hello world')

    expect(parsed).toHaveProperty('hellothere')
    expect(parsed.hellothere).toEqual('general kenobi')
  })

  it('should parse nested values', () => {
    const parsed = parse('TEST_', {
      TEST_HELLOWORLD: 'hello world',
      TEST_HELLO_THERE: 'general kenobi',
    })

    expect(Object.keys(parsed)).toHaveLength(2)

    expect(parsed).toHaveProperty('helloworld')
    expect(parsed.helloworld).toEqual('hello world')

    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toHaveProperty('there')
    expect(parsed.hello.there).toEqual('general kenobi')
  })

  it('should skip values without prefix', () => {
    const parsed = parse('TEST_', {
      TEST_HELLO: 'hello world',
      NODE_ENV: 'development',
    })

    expect(Object.keys(parsed)).toHaveLength(1)

    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toEqual('hello world')
  })

  it('should default to parsing process.env', () => {
    process.env = {
      TEST_HELLO: 'hello world',
    }

    const parsed = parse('TEST_')

    expect(Object.keys(parsed)).toHaveLength(1)

    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toEqual('hello world')
  })
})

describe('environment variable prefix', () => {
  it('should handle valid names', () => {
    expect(toPrefix('example')).toEqual('EXAMPLE_')
    expect(toPrefix('c9h')).toEqual('C9H_')
  })

  it('should handle extreme names', () => {
    expect(toPrefix('fastify-c9h')).toEqual('FASTIFY_C9H_')
    expect(toPrefix('@fastify/c9h')).toEqual('FASTIFY_C9H_')
  })

  it('should reject erroneous names', () => {
    expect(() => toPrefix('fastify c9h')).toThrowError()
  })
})
