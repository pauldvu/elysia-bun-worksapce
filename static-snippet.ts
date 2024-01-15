import { Objects, Pipe, Strings } from "hotscript";
import { k } from "keys";

//    ^?
const newLine = k["\n"];

type AssignKey<T extends string, u extends string> = Pipe<
  { key: "" },
  [Objects.MapKeys<Strings.Replace<"key", T>>, Objects.MapValues<Objects.Create<{ ["prefix"]: T; ["body"]: Strings.Split<typeof newLine, u> }>>]
>;
type TupleKeysToUnion<T extends readonly unknown[], Acc = never> = T extends readonly [infer U, ...infer TRest]
  ? TupleKeysToUnion<TRest, Acc | U>
  : Acc;
export type MapOfTupleKeys<T extends readonly unknown[]> = { [K in Extract<TupleKeysToUnion<T>, PropertyKey>]: K };


const StaticSnippet = <K extends string, Code extends string>(string: K, code: Code) => {
  const snippet = {
    [string]: {
      prefix: string,
      body: code.split("\n"),
    },
  } as unknown as Pipe<AssignKey<K, Code>, []>;
  return snippet;
};

const code = `
${k["${TM_SELECTED_TEXT}"]}

//      ^?
` as const;

const snippet = StaticSnippet(k.TwoSlashDemo, code);
//      ^?
const value = JSON.stringify(snippet);

export const clipboard = {
  write: async (text: string) => {
    await Bun.spawn([`pbcopy`], {
      stdin: new Response(text),
    }).exited;
  },
  read: async () => {
    return await new Response(Bun.spawn([`pbpaste`], {}).stdout).text();
  },
  readSync: () => {
    return Bun.spawnSync([`pbpaste`], {}).stdout.toString("utf8").trim();
  },
  writeSync: (text: string) => {
    Bun.spawnSync([`pbcopy`], {
      stdin: new Response(text),
    });
  },
};
clipboard
  //    ^?
  .writeSync(value);
console.log("🚀 ~ value:", value);

const pkg  = {
  "name": "vtype",
  "main": "index.ts",
  "source": "index.ts"
}
