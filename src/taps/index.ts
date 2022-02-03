import { Tap } from './base';
import { ArgvTap } from './argv';
import { EnvTap } from './env';
import { HttpTap } from './http';
import { IniTap } from './fs/ini';
import { JsonTap } from './fs/json';
import { Json5Tap } from './fs/json5';
import { TomlTap } from './fs/toml';
import { YamlTap } from './fs/yaml';

export const DEFAULT_TAPS: Tap[] = [
  new JsonTap(),
  new Json5Tap(),
  new IniTap(),
  new TomlTap(),
  new YamlTap(),
  new EnvTap(),
  new ArgvTap(),
];

export { ArgvTap, EnvTap, HttpTap, IniTap, JsonTap, Json5Tap, TomlTap, YamlTap };
