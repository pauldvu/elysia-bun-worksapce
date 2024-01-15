import { endOfWeek, startOfWeek } from "date-fns";

// import { $ } from "hkt-toolbelt";

// const res = immer.produce(
//   {
//     name: "main",
//   },
//   draft => {
//     draft.name = "hello";
//     draft.name = draft.name + " world";
//   }
// );
// console.log("🚀 ~ res:", res);

function abc(time: number) {}
const log = console.log; //reassign the most used functions and bundler will be able to minify it even smaller
log(startOfWeek(new Date(), { weekStartsOn: 1 }));
log(startOfWeek(new Date(), { weekStartsOn: 1 }));
log(startOfWeek(new Date(), { weekStartsOn: 1 }));
// console.log(endOfWeek(new Date(), { weekStartsOn: 1 }));

const sky_200 = "#ebf8ff";
const sky_300 = "#bee3f8";
const sky_400 = "#90cdf4";
const sky_500 = "#63b3ed";
const sky_600 = "#4299e1";
const sky_700 = "#3182ce";
const sky_800 = "#2b6cb0";
const sky_900 = "#2c5282";
const sky_1000 = "#2a4365";
const sky_1100 = "#1A365D";
const red_200 = "#FED7D7"; /**    ![#FEB2B2](https://placehold.co/15x15/FEB2B2/f03c15.png) `#f03c15`*/
const red_300 = "#FEB2B2";
/**    ![#FC8181](https://placehold.co/15x15/FC8181/f03c15.png) `#f03c15`*/
/**
 * ### Red 400
 * ![#FC8181](https://placehold.co/15x15/FC8181/f03c15.png)
 * ```tsx
 * className="bg-red-400"
 * ```
 * ```css
 * className="bg-red-400"
 * ```
 */
const _red_400 = "#FC8181";
/**    ![#F56565](https://placehold.co/15x15/F56565/f03c15.png) `#f03c15`*/
const red_500 = "#F56565";
/**    ![#E53E3E](https://placehold.co/15x15/E53E3E/f03c15.png) `#f03c15`*/
const red_600 = "#E53E3E";
/**    ![#C53030](https://placehold.co/15x15/C53030/f03c15.png) `#f03c15`*/
const red_700 = "#C53030";
/**    ![#9B2C2C](https://placehold.co/15x15/9B2C2C/f03c15.png) `#f03c15`*/
const red_800 = "#9B2C2C";
/**    ![#742A2A](https://placehold.co/15x15/9B2C2C/f03c15.png) `#f03c15`*/
const red_900 = "#742A2A";

//red_900/50
const theme = {
  primary: "#FED7D7",
};

const _red_200 = "bg-red-200" as const;
const _red_300 = "bg-red-300" as const;

/**
 * Carbon 400 - #2F3C4A
 * ```css
 * --tw-bg-opacity: 1; background-color: rgb(20 26 36 / var(--tw-bg-opacity));
 * ```
 */
const _carbon_400 = `carbon-400` as const;
const bg = {
  carbon: {
    _400: _carbon_400,
  },
} as const;
const bg_color = {
  _: `background-color:`,
} as const;
// function rgb(parts: TemplateStringsArray, ...values: readonly string[]) {
//   const color = values[1]
//   return `rgb(${color} / var(--tw-bg-opacity))` as const
// }

function rgb<T extends string>(parts: TemplateStringsArray, ...values: readonly T[]) {
  return `rgb(${values[0]} / var(--tw-bg-opacity))` as const;
}

// const _carbon_400: '23 23 23' = '23 23 23';
// const res = rgb`${_carbon_400}`;
const _carbon_rgb_400 = "24 24 24";
const res = rgb`${_carbon_rgb_400}`;

const _size = {
  /**
   *
   * ```css
   * .size-5 {
   *   width: 1.25rem
   *    height: 1.25rem
   *  }
   * ```
   */
  _5: "size-5",
} as const;
//width: 0px; height: 0px;
//width: 0.25rem; height: 0.25rem;
//width: 0.5rem; height: 0.5rem;
//width: 0.75rem; height: 0.75rem;
//width: 1rem; height: 1rem;
//width: 1.5rem; height: 1.5rem;
const $1 = "1" as const;
const rem_25 = `rem` as const;
const width: "width" = "width" as const;
// function isSize(value: string): value is Size {
//   return /^size-\d+: { width:\w+};$/.test(value) || /^size-\d+$/.test(value);
// }

// function size<T extends string>(parts: TemplateStringsArray, ...values: readonly T[])  {
//   const result = values?.[1] ? `size-${values[0]}: { width:${values[1]}};` as const : `size-${values[0]}` as const;
//   return isSize(result) ? result : '' as const
// }

const value = size`${$1} ${rem_25}`;
const cs_size = {
  _1: `.size-1 { width: 0.25rem ; height: 0.25rem }` as const,
  _2: `.size-2 { width: 0.5rem ; height: 0.5rem }` as const,
  _3: `.size-3 { width: 0.75rem ; height: 0.75rem }` as const,
  _4: `.size-4 { width: 1rem ; height: 1rem }` as const,
  _5: `.size-5 { width: 1.25rem ; height: 1.25rem }` as const,
};
type Size<T extends string, U extends string> = `size-${T}: { width:${U}};` | `size-${T}`;

function size<T extends string, U extends string>(parts: TemplateStringsArray, ...values: readonly [T?, U?]) {
  const result = values[1] !== undefined ? (`size-${values[0]}: { width:${values[1]}};` as const) : (`size-${values[0]}` as const);
  return result as T extends undefined ? `size-${T}` : `size-${T}: { width:${U}};`;
}

const value1 = size`${$1} ${rem_25}`; // Type is `size-1: { width:rem};`
const value2 = size``; // Type is `size-1`
const redScales = [`bg-red-500/40`] as const;
const red = `red` as const;
const bg_ = `bg_` as const;
const bg_red = `bg-red` as const;
const _500 = 500 as const;
const colors = ["sky", "carbon", "white", "ash"] as const;
/**
 *
 * should have an infered type of for each
 * { bg_sky:500: {
 * 0: 'bg-sky-500/0',
 * }
 * no  assertions
 * and must be infered and type safe using mapped types
 *
 */
// const mappedLiterals =
/*
 */
// type ExtractPII<Type> = {
//   [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
// };
type ReplaceProps<T, From, To> = {
  [K in keyof T]: K extends keyof From ? (T[K] extends From[K] ? (K extends keyof To ? To[K] : T[K]) : T[K]) : T[K];
};
type IInputObjectOut = {
  baz: (otherParam: number) => void;
  notPredefined: string;
  aNumber: number;
  foo: (someParam: string) => boolean;
  aMethod: () => void;
};

type a = ReplaceProps<IInputObjectOut, { foo: Function }, { foo: string }>;
const RED = `red` as const;
// type ColorScale<Type> = {
//   [Property in keyof Type]: Type[Property] extends string ? `bg-${Type[Property]}` : never;

// };
type Keys = {
  100: number;
  200: number;
  300: number;
  400: number;
  500: number;
  600: number;
  700: number;
  800: number;
  900: number;
};

// Step 2: Create the mapped type
type ColorScale<Type> = {
  [Property in keyof Type extends string | number ? keyof Type : never]: Type[Property] extends number ? `bg-red-${Property}` : never;
};

// Step 3: Apply the mapped type to the keys type
type Red = ColorScale<Keys>;

type ColorScaleTwo<Type> = {
  [Property in keyof Type]: Type[Property] extends string ? `bg-${Type[Property]}-` : never;
};
type c = ColorScale<{}>;
// type Red = {
//   100: `bg-red-100`;
//   200: `bg-red-200`;
//   300: `bg-red-300`;
//   400: `bg-red-400`;
// };
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
type ObjectNeding = ColorScale<Red>;
type ObjectsNeedingGDPRDeletion = ColorScale<DBFields>;
const cn = {
  bg_red: {
    100: `${bg_red}-100` as const,
    400: "bg-red-400" as const,
    [`${bg_}${red}` as const]: "bg-red-500" as const,
    700: "bg-red-700" as const,
  },
  bg_red_500: {
    /** `rgba(248, 113, 113, 0.0)` */
    0: `${bg_red}/0` as const,
    10: `${bg_red}/10` as const,
    20: `${bg_red}/20` as const,
    30: `${bg_red}/30` as const,
    /** `rgba(248, 113, 113, 0.5)` */
    40: `${bg_red}/40` as const,
    50: `${bg_red}/50` as const,
    60: `${bg_red}/60` as const,
    70: `${bg_red}/70` as const,
    80: `${bg_red}/80` as const,
    90: `${bg_red}/90` as const,
    /** ## rgba(248, 113, 113, 1)  ![#F56565](https://placehold.co/10x10/F56565/f03c15.png) */
    100: `bg-red-500/100` as const,
  },
  size_5: _size._5,
};

const example = `${cn.bg_red[100]}`;
console.log("🚀 ~ cn:", cn);
console.log("🚀 ~ cn:", cn);
cn.bg_red_500[0];
cn.bg_red_500[0];
cn.bg_red_500[10];
cn.bg_red_500[40];
cn.bg_red_500[40];
cn.bg_red_500[0];
cn.bg_red_500[0];
cn.bg_red_500[0];
cn.bg_red_500[0];
cn.bg_red_500[0];
const cs = {
  size_5: cs_size._5,
};

console.log(cn);
//swap betwen classNames and tailwind classes by renaming the import object
cs.size_5;
cn.size_5;
//overload constant declaration as well as function with one import?
cs.size_5;
cs.size_5;
cs.size_5;

const styleSheet = [`${cs.size_5}`] as const;

// const rgb = ()=>{
// //should return constant with inferred literal value of the string passed in
// // rgb(20 26 36 / var(--tw-bg-opacity))
// }
//desired api
//rgb`20 26 36`

const tw_opacity = {
  var: `var(--tw-bg-opacity)` as const,
  _: `--tw-bg-opacity:` as const,
  _1: `--tw-bg-opacity: 1;` as const,
} as const;

const $carbon_400 = `${tw_opacity._1} rgb(20 26 36 / var(--tw-bg-opacity))` as const;
const css = {
  bg_carbon_400: `${tw_opacity._1} background-color: rgb(20 26 36 / var(--tw-bg-opacity));`,
} as const;

const cx = {
  bg_carbon_400: `bg-${_carbon_400}`,
} as const;
cx.bg_carbon_400;
const vt = {
  /**
   * ```css
   * --tw-bg-opacity: 1; background-color: rgb(254 226 226 / var(--tw-bg-opacity))
   * ```
   * ![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png) `#f03c15`
   *
   */
  red_200: "bg-red-200",
  red_300: "bg-red-300",
  red_400: _red_400,
} as const;
