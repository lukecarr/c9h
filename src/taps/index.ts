import { Tap } from './base';
import { EnvTap } from './env';
import { IniTap } from './fs/ini';
import { JsonTap } from './fs/json';
import { Json5Tap } from './fs/json5';
import { TomlTap } from './fs/toml';
import { YamlTap } from './fs/yaml';

export const DEFAULT_TAPS: Tap[] = [
  new EnvTap(),
  new JsonTap(),
  new Json5Tap(),
  new IniTap(),
  new TomlTap(),
  new YamlTap(),
];

export { EnvTap, IniTap, JsonTap, Json5Tap, TomlTap, YamlTap };
