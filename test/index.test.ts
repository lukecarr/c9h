/* eslint-disable @typescript-eslint/no-explicit-any */
import * as c9h from '../src';

describe('c9h sync', () => {
  it('should load from files', () => {
    const loaded = c9h.loadSync<any>({
      options: {
        name: 'example',
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should default to the package.json `name` property if `options.name` is undefined', () => {
    process.env.npm_package_name = 'example';

    const loaded = c9h.loadSync<any>();

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should not merge arrays by default', () => {
    const loaded = c9h.loadSync<any>({
      options: {
        name: 'example',
      },
      defaults: {
        hello: ['general', 'kenobi'],
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should merge arrays when options.mergeArray is true', () => {
    const loaded = c9h.loadSync<any>({
      options: {
        name: 'example',
        merge: {
          array: true,
        },
      },
      defaults: {
        hello: ['general', 'kenobi'],
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(3);
    expect(loaded.hello).toContain('world');
    expect(loaded.hello).toContain('general');
    expect(loaded.hello).toContain('kenobi');
  });

  it('should handle an undefined options object', () => {
    const loaded = c9h.loadSync<any>();

    expect(Object.keys(loaded)).toHaveLength(0);
  });

  it('should handle `options.name` as a function', () => {
    const loaded = c9h.loadSync<any>({
      options: {
        name: () => 'exa' + 'mple',
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });
});

describe('c9h async', () => {
  it('should load from files', async () => {
    const loaded = await c9h.load<any>({
      options: {
        name: 'example',
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should default to the package.json `name` property if `options.name` is undefined', async () => {
    process.env.npm_package_name = 'example';

    const loaded = await c9h.load<any>();

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should not merge arrays by default', async () => {
    const loaded = await c9h.load<any>({
      options: {
        name: 'example',
      },
      defaults: {
        hello: ['general', 'kenobi'],
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should merge arrays when options.merge.array is true', async () => {
    const loaded = await c9h.load<any>({
      options: {
        name: 'example',
        merge: {
          array: true,
        },
      },
      defaults: {
        hello: ['general', 'kenobi'],
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(3);
    expect(loaded.hello).toContain('world');
    expect(loaded.hello).toContain('general');
    expect(loaded.hello).toContain('kenobi');
  });

  it('should handle an undefined options object', async () => {
    const loaded = await c9h.load<any>();

    expect(Object.keys(loaded)).toHaveLength(0);
  });

  it('should handle `options.name` as a function', async () => {
    const loaded = await c9h.load<any>({
      options: {
        name: () => 'exa' + 'mple',
      },
    });

    expect(loaded).toBeDefined();
    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });
});
