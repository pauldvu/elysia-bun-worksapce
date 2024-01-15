import type { Pipe, Objects, Tuples, Strings, Unions } from "hotscript";

type CreateStaticPkgDependencies<T extends Record<string, string>> = Pipe<
  T,
  [Objects.Keys, Unions.ToTuple, Tuples.Map<Strings.Split<":">>, Tuples.ToUnion, Objects.FromEntries]
>;

function createStaticPkgDependencies<T extends Record<string, string>>(deps: T) {
  const keys = Object.keys(deps) as readonly string[];
  const tuple = [...keys] as const;
  const splitTuple = tuple.map(key => key.split(":"));
  const result = Object.fromEntries(splitTuple as [string, string][]);
  return result as CreateStaticPkgDependencies<T>;
}
//static check on entire code base folder and file structure pretty powerful stuff
//once I get more familiar they entire code base will get single one time defined keys and literals
//which will allow us to refactor extremely fast and changes will populate across the entire code base
//with only a single source of truth.
//We also get better dx and prevent foot guns since we are statically checking the paths, etc
// even static utilities can be defied to help ensure we have proper folder and project structure.

import { keys } from "keys";

const dependencies = createStaticPkgDependencies(keys.deps);
//    ^?
