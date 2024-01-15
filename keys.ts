import { Objects, Pipe, Strings, Tuples, Unions } from "hotscript";
import { split } from "string-ts";

/**
 * @description
 */
export function K<T>() {
  return _name_proxy as unknown as { [P in keyof T]: P };
}
const _name_proxy = new Proxy(
  {},
  {
    get(target, key) {
      return key;
    },
  }
);
class Delimiter {
  ["-"] = K<this>()["-"];
  ["_"] = K<this>()["_"];
  ["."] = K<this>()["."];
  ["/"] = K<this>()["/"];
  [":"] = K<this>()[":"];
  [";"] = K<this>()[";"];
  ["|"] = K<this>()["|"];
  [" "] = K<this>()[" "];
  ["\n"] = K<this>()["\n"];
  ["\t"] = K<this>()["\t"];
  ["\r"] = K<this>()["\r"];
}
class Wrappers {
  ["<"] = K<this>()["<"];
  [">"] = K<this>()[">"];
  ["["] = K<this>()["["];
  ["]"] = K<this>()["]"];
  ["{"] = K<this>()["{"];
  ["}"] = K<this>()["}"];
  ["("] = K<this>()["("];
  [")"] = K<this>()[")"];
  ["'"] = K<this>()["'"];
  [`"`] = K<this>()[`"`];
}
class Sizes {
  bg = K<this>().bg;
  width = K<this>().width;
  height = K<this>().height;
}

class Colors {
  emerald = K<this>().emerald;
  blue = K<this>().blue;
  green = K<this>().green;
  sky = K<this>().sky;
  hot_pink = K<this>().hot_pink;
  purple = K<this>().purple;
  violet = K<this>().violet;
}
class SizesTw {
  sm = K<this>().sm;
  md = K<this>().md;
  lg = K<this>().lg;
  xl = K<this>().xl;
  ["2xl"] = K<this>()["2xl"];
}
class Methods {
  get = K<this>().get;
  post = K<this>().post;
  put = K<this>().put;
  delete = K<this>().delete;
  patch = K<this>().patch;
}
class ReservedJs {
  /** used for writing extractions and meta programming */
  function = K<this>().function;
  export = K<this>().export;
  const = K<this>().const;
  let = K<this>().let;
  async = K<this>().async;
  await = K<this>().await;
  Promise = K<this>().Promise;
  resolve = K<this>().resolve;
  reject = K<this>().reject;
  from = K<this>().from;
  import = K<this>().import;
  for = K<this>().for;
  var = K<this>().var;
}
/**
 * With tabstops, you can make the editor cursor move inside a snippet. Use $1, $2 to specify cursor locations. The number is the order in which tabstops will be visited, whereas
 * $0 denotes the final cursor position. Multiple occurrences of the same tabstop are linked and updated in sync.
 */
class tabstops {
  /**
   * $0 denotes the final cursor position.
   */
  ["$0"] = K<this>()["$0"];
  ["$1"] = K<this>()["$1"];
  ["$2"] = K<this>()["$2"];
  ["$3"] = K<this>()["$3"];
  ["$4"] = K<this>()["$4"];
  ["$5"] = K<this>()["$5"];
  /**
   * Placeholders can be nested, like `${1:`another ${2:placeholder}}
   */
  ["${1:"] = K<this>()["${1:"];
  ["${"] = K<this>()["${"];
  /**
   * Placeholders can be nested, like ${1:another `${2:placeholder}}`
   */
  ["placeholder}}"] = K<this>()["placeholder}}"];
}
class placeholders {
  ["${1:"] = K<this>()["${1:"];
}
class choices {
  ["${1|"] = K<this>()["${1|"];
  ["|}"] = K<this>()["|}"];
}
/**
 * With $name or ${name:default}, you can insert the value of a variable. When a variable isn't set, its default or the empty string is inserted. When a variable is unknown (that is, its name isn't defined) the name of the variable is inserted and it is transformed into a placeholder.
 */
class VsVariables {
  /**The currently selected te or the empty string */
  ["${TM_SELECTED_TEXT}"] = K<this>()["${TM_SELECTED_TEXT}"];
  /**
   * The contents of the current line
   */
  ["${TM_CURRENT_LINE}"] = K<this>()["${TM_CURRENT_LINE}"];
  /**
   * The contents of the word under cursor or the empty string
   */
  ["${TM_CURRENT_WORD}"] = K<this>()["${TM_CURRENT_WORD}"];
  /**
   * The zero-index based line number
   */
  ["${TM_LINE_INDEX}"] = K<this>()["${TM_LINE_INDEX}"];
  /**
   * The one-index based line number
   */
  ["${TM_LINE_NUMBER}"] = K<this>()["${TM_LINE_NUMBER}"];
  /**
   * The filename of the current document
   */
  ["${TM_FILENAME}"] = K<this>()["${TM_FILENAME}"];
  /**
   * The filename of the current document without its extensions
   */
  ["${TM_FILENAME_BASE}"] = K<this>()["${TM_FILENAME_BASE}"];
  /**
   * The directory of the current document
   */
  ["${TM_DIRECTORY}"] = K<this>()["${TM_DIRECTORY}"];
  /**
   * The full file path of the current document
   */
  ["${TM_FILEPATH}"] = K<this>()["${TM_FILEPATH}"];
  /**
   * The relative (to the opened workspace or folder) file path of the current
   */
  ["${RELATIVE_FILEPATH}"] = K<this>()["${RELATIVE_FILEPATH}"];
}
/**
 * Class representing random values.
 */
class RandomValues {
  /**
   * Generates 6 random Base-10 digits.
   */
  ["RANDOM"] = K<this>()["RANDOM"];

  /**
   * Generates 6 random Base-16 digits.
   */
  ["RANDOM_HEX"] = K<this>()["RANDOM_HEX"];

  /**
   * Generates a Version 4 UUID.
   */
  ["UUID"] = K<this>()["UUID"];
}

/**
 * Class representing comments.
 */
class Comments {
  /**
   * Starts a block comment. Example output: in PHP
   */
  ["BLOCK_COMMENT_START"] = K<this>()["BLOCK_COMMENT_START"];

  /**
   * Ends a block comment. Example output: in PHP
   */
  ["BLOCK_COMMENT_END"] = K<this>()["BLOCK_COMMENT_END"];

  /**
   * Inserts a line comment. Example output: in PHP //
   */
  ["LINE_COMMENT"] = K<this>()["LINE_COMMENT"];
}
class JSON {
  string = K<this>().string;
  number = K<this>().number;
  boolean = K<this>().boolean;
  null = K<this>().null;
  undefined = K<this>().undefined;
  object = K<this>().object;
  array = K<this>().array;
}
class JSKeys {
  map = K<this>().map;
  set = K<this>().set;
}
class TSKeys {
  ["type"] = K<this>()["type"];
  ["interface"] = K<this>()["interface"];
  ["extends"] = K<this>()["extends"];
}
class snippetNames {
  ["TwoSlashDemo"] = K<this>()["TwoSlashDemo"];
}
//for server work
const methodKeys = new Methods();
//for typesafe meta programming/ static analysis
const jsonKeys = new JSON();
//for css and frontend meta programming
const colors = new Colors();
const sizesTw = new SizesTw();
const sizes = new Sizes();
//for meta programming, and code gen
const wrappers = new Wrappers();
const reservedJs = new ReservedJs();
const delimiter = new Delimiter();
const tsKeys = new TSKeys();
const jsKeys = new JSKeys();
const vsCode = {
  ...new snippetNames(),
  ...new VsVariables(),
  ...new tabstops(),
  ...new placeholders(),
  ...new choices(),
  ...new RandomValues(),
  ...new Comments(),
} as const;

class Pkgs {
  dev = K<this>().dev;
  vtype = K<this>().vtype;
  immer = K<this>().immer;
}
class workspaces {
  "pkgs/*" = K<this>()["pkgs/*"];
  "apps/*" = K<this>()["apps/*"];
}
class pkgJson {
  dependencies = K<this>().dependencies;
}
class Dependencies {
  ["arktype:^1.0.29-alpha"] = K<this>()["arktype:^1.0.29-alpha"];
  ["hotscript:^1.0.13"] = K<this>()["hotscript:^1.0.13"];
  ["string-ts:^2.0.0"] = K<this>()["string-ts:^2.0.0"];
}
const pkgs = new Pkgs();
const deps = {
  ...new Dependencies(),
};
const spaces = {
  ...new workspaces(),
};
const pkgJsonKeys = {
  ...new pkgJson(),
};
//prettier-ignore
// type CreateStaticPkgDependencies<T extends Record<string , string>> = Pipe<
// T,
//   [
//     Objects.Keys,
//     Unions.ToTuple,
//     Tuples.Map<Strings.Split<":">>,
//     Tuples.ToUnion,
//     Objects.FromEntries,
//   ]
// >;
// function createStaticPkgDependencies<T extends Record<string, string>>(deps: T) {
//   const keys = Object.keys(deps) as readonly string[];
//   const tuple = [...keys] as const;
//   const splitTuple = tuple.map(key => key.split(":"));
//   const result = Object.fromEntries(splitTuple as [string, string][]);
//   return result as CreateStaticPkgDependencies<T>;
// }
// //static check on entire code base folder and file structure pretty powerful stuff
// //once I get more familiar they entire code base will get single one time defined keys and literals
// //which will allow us to refactor extremely fast and changes will populate across the entire code base
// //with only a single source of truth.
// //We also get better dx and prevent foot guns since we are statically checking the paths, etc
// // even static utilities can be defied to help ensure we have proper folder and project structure.

// const dependencies = createStaticPkgDependencies(deps);
// //    ^?
export const keys = { deps, delimiter, wrappers, reservedJs, methodKeys, sizes, colors, sizesTw, jsonKeys, jsKeys, tsKeys };
export const k = {
  ...spaces,
  ...deps,
  ...pkgJsonKeys,
  ...pkgs,
  ...deps,
  ...vsCode,
  ...delimiter,
  ...wrappers,
  ...reservedJs,
  ...methodKeys,
  ...sizes,
  ...colors,
  ...sizesTw,
  ...jsonKeys,
  ...jsKeys,
  ...tsKeys,
};
