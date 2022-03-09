import { EnvTap, toPrefix } from 'taps/env';

describe('the environment variable tap', () => {
  it('should parse ignore environment variables missing the prefix', () => {
    const tap = new EnvTap({
      prefix: 'C9H_',
      env: {
        C9H_HELLO: 'world',
        TESTING: '123',
      },
    });

    const parsed = tap.parseSync<{ hello: string }>({ name: 'c9h', merge: {} });

    expect(parsed).toHaveProperty('hello');
    expect(parsed['hello']).toBe('world');
    expect(parsed).not.toHaveProperty('testing');
  });

  it('should use process.env by default', () => {
    process.env = {
      C9H_HELLO: 'world',
    };

    const tap = new EnvTap({
      prefix: 'C9H_',
    });

    const parsed = tap.parseSync<{ hello: string }>({ name: 'c9h', merge: {} });

    expect(parsed).toHaveProperty('hello');
    expect(parsed['hello']).toBe('world');
  });
});

describe("the environment variable tap's toPrefix utility method", () => {
  it('should accept valid arguments', () => {
    expect(toPrefix('c9h')).toBe('C9H_');
  });

  it('should accept extreme arguments', () => {
    expect(toPrefix('@c9h/fastify')).toBe('C9H_FASTIFY_');
  });

  it('should reject erroneous arguments', () => {
    expect(() => toPrefix('c9h!')).toThrow();
  });
});
