//#region [ immer/license ] LICENSE
/**
    MIT License

    Copyright (c) 2017 Michel Weststrate

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
 */
//#endregion

//#region [  _README.md ]
/**
 // https://github.com/immerjs/immer/releases
 IMMER_MONOFILE
A single TS file immer monofile. To be used with the bun runtime.
Monofiles  give you a ton of benefits, but you should know the tradeoffs before commiting to them.

*/
//#endregion

//#region [ BUILD_LOG ]
/**
# BUILD_LOG
The build log is where you'll see all of the steps that were taken to output the file . This project is rated
as an extremely easy converstion. Other will not be. 
Highlight Over the path, and search within the same file to jump to the section
 */
/**
 * [ immer/types/type-external.ts ] MODIFIED
 * uncommended a single line  import {NOTHING} from "../internal", due to dulpicate import
 */
/**
 * [ dist/cjs/immer.d.ts ] BUILD_CHANGE_ONLY
 * Added during the initial building of the mono file, to allow typescript to understand the types,
 * can be safely removed
 */
/**
 * [ immer/proxy/proxy.ts ] BUILD_CHANGE_ONLY
 *they are used to get to the half way point , of a manual build.  I added for interfaces from proxy,, these are dulicated interfaces, that can safely be removed after building the
 * monofile  , *one thing to note is that typeccript will not throw any errors if you have duplicate interfaces. This  can be
 * used to our advantage in monofiles but we still need to be careful as also a footgun
 */
/**
 * [ immer/immer.ts ] MODIFIED_EXPORTS
 * Main modifiication made here was to comment out exports {Immer} as we've already exported
 * further up in the file. We will have to use export detection to differentiate between classes multiple
 * exports . This is good to know, for when I start buildidng the bundling tool for it.
 */
/**
 * [ ] CUSTOM_ADDITION
* In this instance the custom additon was to tak a {
    NOTHING as nothing
}
and replace it with  const nothing = NOTHING;
Author's original business logic is still intact, and the code is still functional
 */
//#endregion

//#region [ immer/utils/env.ts ]

/**
 * The sentinel value returned by producers to replace the draft with undefined.
 */
export const NOTHING: unique symbol = Symbol.for("immer-nothing");

/**
 * To let Immer treat your class instances as plain immutable objects
 * (albeit with a custom prototype), you must define either an instance property
 * or a static property on each of your custom classes.
 *
 * Otherwise, your class instance will never be drafted, which means it won't be
 * safe to mutate in a produce callback.
 */
export const DRAFTABLE: unique symbol = Symbol.for("immer-draftable");

export const DRAFT_STATE: unique symbol = Symbol.for("immer-state");
//#endregion
//#region [ immer/types/type-external.ts ] MODIFIED_IMPORT
//- import {NOTHING} from "../internal"

type AnyFunc = (...args: any[]) => any;

type PrimitiveType = number | string | boolean;

/** Object types that should never be mapped */
type AtomicObject = Function | Promise<any> | Date | RegExp;

/**
 * If the lib "ES2015.Collection" is not included in tsconfig.json,
 * types like ReadonlyArray, WeakMap etc. fall back to `any` (specified nowhere)
 * or `{}` (from the node types), in both cases entering an infinite recursion in
 * pattern matching type mappings
 * This type can be used to cast these types to `void` in these cases.
 */
export type IfAvailable<T, Fallback = void> =
  // fallback if any
  true | false extends (T extends never ? true : false)
    ? Fallback // fallback if empty type
    : keyof T extends never
    ? Fallback // original type
    : T;

/**
 * These should also never be mapped but must be tested after regular Map and
 * Set
 */
type WeakReferences = IfAvailable<WeakMap<any, any>> | IfAvailable<WeakSet<any>>;

export type WritableDraft<T> = { -readonly [K in keyof T]: Draft<T[K]> };

/** Convert a readonly type into a mutable type, if possible */
export type Draft<T> = T extends PrimitiveType
  ? T
  : T extends AtomicObject
  ? T
  : T extends ReadonlyMap<infer K, infer V> // Map extends ReadonlyMap
  ? Map<Draft<K>, Draft<V>>
  : T extends ReadonlySet<infer V> // Set extends ReadonlySet
  ? Set<Draft<V>>
  : T extends WeakReferences
  ? T
  : T extends object
  ? WritableDraft<T>
  : T;

/** Convert a mutable type into a readonly type */
export type Immutable<T> = T extends PrimitiveType
  ? T
  : T extends AtomicObject
  ? T
  : T extends ReadonlyMap<infer K, infer V> // Map extends ReadonlyMap
  ? ReadonlyMap<Immutable<K>, Immutable<V>>
  : T extends ReadonlySet<infer V> // Set extends ReadonlySet
  ? ReadonlySet<Immutable<V>>
  : T extends WeakReferences
  ? T
  : T extends object
  ? { readonly [K in keyof T]: Immutable<T[K]> }
  : T;

export interface Patch {
  op: "replace" | "remove" | "add";
  path: (string | number)[];
  value?: any;
}

export type PatchListener = (patches: Patch[], inversePatches: Patch[]) => void;

/** Converts `nothing` into `undefined` */
type FromNothing<T> = T extends typeof NOTHING ? undefined : T;

/** The inferred return type of `produce` */
export type Produced<Base, Return> = Return extends void ? Base : FromNothing<Return>;

/**
 * Utility types
 */
type PatchesTuple<T> = readonly [T, Patch[], Patch[]];

type ValidRecipeReturnType<State> = State | void | undefined | (State extends undefined ? typeof NOTHING : never);

type ReturnTypeWithPatchesIfNeeded<State, UsePatches extends boolean> = UsePatches extends true ? PatchesTuple<State> : State;

/**
 * Core Producer inference
 */
type InferRecipeFromCurried<Curried> = Curried extends (base: infer State, ...rest: infer Args) => any // extra assertion to make sure this is a proper curried function (state, args) => state
  ? ReturnType<Curried> extends State
    ? (draft: Draft<State>, ...rest: Args) => ValidRecipeReturnType<Draft<State>>
    : never
  : never;

type InferInitialStateFromCurried<Curried> = Curried extends (base: infer State, ...rest: any[]) => any // extra assertion to make sure this is a proper curried function (state, args) => state
  ? State
  : never;

type InferCurriedFromRecipe<Recipe, UsePatches extends boolean> = Recipe extends (draft: infer DraftState, ...args: infer RestArgs) => any // verify return type
  ? ReturnType<Recipe> extends ValidRecipeReturnType<DraftState>
    ? (base: Immutable<DraftState>, ...args: RestArgs) => ReturnTypeWithPatchesIfNeeded<DraftState, UsePatches> // N.b. we return mutable draftstate, in case the recipe's first arg isn't read only, and that isn't expected as output either
    : never // incorrect return type
  : never; // not a function

type InferCurriedFromInitialStateAndRecipe<State, Recipe, UsePatches extends boolean> = Recipe extends (
  draft: Draft<State>,
  ...rest: infer RestArgs
) => ValidRecipeReturnType<State>
  ? (base?: State | undefined, ...args: RestArgs) => ReturnTypeWithPatchesIfNeeded<State, UsePatches>
  : never; // recipe doesn't match initial state

/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */
export interface IProduce {
  /** Curried producer that infers the recipe from the curried output function (e.g. when passing to setState) */
  <Curried>(recipe: InferRecipeFromCurried<Curried>, initialState?: InferInitialStateFromCurried<Curried>): Curried;

  /** Curried producer that infers curried from the recipe  */
  <Recipe extends AnyFunc>(recipe: Recipe): InferCurriedFromRecipe<Recipe, false>;

  /** Curried producer that infers curried from the State generic, which is explicitly passed in.  */
  <State>(recipe: (state: Draft<State>, initialState: State) => ValidRecipeReturnType<State>): (state?: State) => State;
  <State, Args extends any[]>(recipe: (state: Draft<State>, ...args: Args) => ValidRecipeReturnType<State>, initialState: State): (
    state?: State,
    ...args: Args
  ) => State;
  <State>(recipe: (state: Draft<State>) => ValidRecipeReturnType<State>): (state: State) => State;
  <State, Args extends any[]>(recipe: (state: Draft<State>, ...args: Args) => ValidRecipeReturnType<State>): (
    state: State,
    ...args: Args
  ) => State;

  /** Curried producer with initial state, infers recipe from initial state */
  <State, Recipe extends Function>(recipe: Recipe, initialState: State): InferCurriedFromInitialStateAndRecipe<State, Recipe, false>;

  /** Normal producer */
  <Base, D = Draft<Base>>( // By using a default inferred D, rather than Draft<Base> in the recipe, we can override it.
    base: Base,
    recipe: (draft: D) => ValidRecipeReturnType<D>,
    listener?: PatchListener
  ): Base;
}

/**
 * Like `produce`, but instead of just returning the new state,
 * a tuple is returned with [nextState, patches, inversePatches]
 *
 * Like produce, this function supports currying
 */
export interface IProduceWithPatches {
  // Types copied from IProduce, wrapped with PatchesTuple
  <Recipe extends AnyFunc>(recipe: Recipe): InferCurriedFromRecipe<Recipe, true>;
  <State, Recipe extends Function>(recipe: Recipe, initialState: State): InferCurriedFromInitialStateAndRecipe<State, Recipe, true>;
  <Base, D = Draft<Base>>(base: Base, recipe: (draft: D) => ValidRecipeReturnType<D>, listener?: PatchListener): PatchesTuple<Base>;
}

/**
 * The type for `recipe function`
 */
export type Producer<T> = (draft: Draft<T>) => ValidRecipeReturnType<Draft<T>>;

// Fixes #507: bili doesn't export the types of this file if there is no actual source in it..
// hopefully it get's tree-shaken away for everyone :)
export function never_used() {}

//#endregion
//#region [ immer/types/types-internnal.ts ]
export type Objectish = AnyObject | AnyArray | AnyMap | AnySet;
export type ObjectishNoSet = AnyObject | AnyArray | AnyMap;

export type AnyObject = { [key: string]: any };
export type AnyArray = Array<any>;
export type AnySet = Set<any>;
export type AnyMap = Map<any, any>;

export const enum ArchType {
  Object,
  Array,
  Map,
  Set,
}

export interface ImmerBaseState {
  parent_?: ImmerState;
  scope_: ImmerScope;
  modified_: boolean;
  finalized_: boolean;
  isManual_: boolean;
}

export type ImmerState = ProxyObjectState | ProxyArrayState | MapState | SetState;

// The _internal_ type used for drafts (not to be confused with Draft, which is public facing)
export type Drafted<Base = any, T extends ImmerState = ImmerState> = {
  [DRAFT_STATE]: T;
} & Base;

//#endregion
//#region [ immer/proxy/proxy.ts ] BUILD_CHANGE_ONLY
interface ProxyBaseState extends ImmerBaseState {
  assigned_: {
    [property: string]: boolean;
  };
  parent_?: ImmerState;
  revoke_(): void;
}

export interface ProxyObjectState extends ProxyBaseState {
  type_: ArchType.Object;
  base_: any;
  copy_: any;
  draft_: Drafted<AnyObject, ProxyObjectState>;
}

export interface ProxyArrayState extends ProxyBaseState {
  type_: ArchType.Array;
  base_: AnyArray;
  copy_: AnyArray | null;
  draft_: Drafted<AnyArray, ProxyArrayState>;
}

type ProxyState = ProxyObjectState | ProxyArrayState;

//#endregion

//#region [ /immer/utils/error.ts ]
export const errors =
  process.env.NODE_ENV !== "production"
    ? [
        // All error codes, starting by 0:
        function (plugin: string) {
          return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
        },
        function (thing: string) {
          return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
        },
        "This object has been frozen and should not be mutated",
        function (data: any) {
          return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
        },
        "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
        "Immer forbids circular references",
        "The first or second argument to `produce` must be a function",
        "The third argument to `produce` must be a function or undefined",
        "First argument to `createDraft` must be a plain object, an array, or an immerable object",
        "First argument to `finishDraft` must be a draft returned by `createDraft`",
        function (thing: string) {
          return `'current' expects a draft, got: ${thing}`;
        },
        "Object.defineProperty() cannot be used on an Immer draft",
        "Object.setPrototypeOf() cannot be used on an Immer draft",
        "Immer only supports deleting array indices",
        "Immer only supports setting array indices and the 'length' property",
        function (thing: string) {
          return `'original' expects a draft, got: ${thing}`;
        },
        // Note: if more errors are added, the errorOffset in Patches.ts should be increased
        // See Patches.ts for additional errors
      ]
    : [];

export function die(error: number, ...args: any[]): never {
  if (process.env.NODE_ENV !== "production") {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args as any) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
}

//#endregion

//#region [ /immer/utils/plugins.ts ]
const plugins: {
  Patches?: {
    generatePatches_(state: ImmerState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]): void;
    generateReplacementPatches_(base: any, replacement: any, patches: Patch[], inversePatches: Patch[]): void;
    applyPatches_<T>(draft: T, patches: Patch[]): T;
  };
  MapSet?: {
    proxyMap_<T extends AnyMap>(target: T, parent?: ImmerState): T;
    proxySet_<T extends AnySet>(target: T, parent?: ImmerState): T;
  };
} = {};

type Plugins = typeof plugins;

export function getPlugin<K extends keyof Plugins>(pluginKey: K): Exclude<Plugins[K], undefined> {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  // @ts-ignore
  return plugin;
}

export function loadPlugin<K extends keyof Plugins>(pluginKey: K, implementation: Plugins[K]): void {
  if (!plugins[pluginKey]) plugins[pluginKey] = implementation;
}
/** Map / Set plugin */

export interface MapState extends ImmerBaseState {
  type_: ArchType.Map;
  copy_: AnyMap | undefined;
  assigned_: Map<any, boolean> | undefined;
  base_: AnyMap;
  revoked_: boolean;
  draft_: Drafted<AnyMap, MapState>;
}

export interface SetState extends ImmerBaseState {
  type_: ArchType.Set;
  copy_: AnySet | undefined;
  base_: AnySet;
  drafts_: Map<any, Drafted>; // maps the original value to the draft value in the new set
  revoked_: boolean;
  draft_: Drafted<AnySet, SetState>;
}

/** Patches plugin */

export type PatchPath = (string | number)[];

//#endregion

//#region [ dist/cjs/immer.d.ts ] BUILD_CHANGE_ONLY
/**
* Added during the initial building of the mono file, to allow typescript to understand the types as we logically
stepped through the code to understand how it all connects  
 */

interface ProducersFns {
  produce: IProduce;
  produceWithPatches: IProduceWithPatches;
}
// declare class Immer implements ProducersFns {
//     autoFreeze_: boolean;
//     useStrictShallowCopy_: boolean;
//     constructor(config?: {
//         autoFreeze?: boolean;
//         useStrictShallowCopy?: boolean;
//     });
//     /**
//      * The `produce` function takes a value and a "recipe function" (whose
//      * return value often depends on the base state). The recipe function is
//      * free to mutate its first argument however it wants. All mutations are
//      * only ever applied to a __copy__ of the base state.
//      *
//      * Pass only a function to create a "curried producer" which relieves you
//      * from passing the recipe function every time.
//      *
//      * Only plain objects and arrays are made mutable. All other objects are
//      * considered uncopyable.
//      *
//      * Note: This function is __bound__ to its `Immer` instance.
//      *
//      * @param {any} base - the initial state
//      * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
//      * @param {Function} patchListener - optional function that will be called with all the patches produced here
//      * @returns {any} a new state, or the initial state if nothing was modified
//      */
//     produce: IProduce;
//     produceWithPatches: IProduceWithPatches;
//     createDraft<T extends Objectish>(base: T): Draft<T>;
//     finishDraft<D extends Draft<any>>(draft: D, patchListener?: PatchListener): D extends Draft<infer T> ? T : never;
//     /**
//      * Pass true to automatically freeze all copies created by Immer.
//      *
//      * By default, auto-freezing is enabled.
//      */
//     setAutoFreeze(value: boolean): void;
//     /**
//      * Pass true to enable strict shallow copy.
//      *
//      * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
//      */
//     setUseStrictShallowCopy(value: boolean): void;
//     applyPatches<T extends Objectish>(base: T, patches: Patch[]): T;
// }

//#endregion

//#region [ /core/scope ]
/** Each scope represents a `produce` call. */

export interface ImmerScope {
  patches_?: Patch[];
  inversePatches_?: Patch[];
  canAutoFreeze_: boolean;
  drafts_: any[];
  parent_?: ImmerScope;
  patchListener_?: PatchListener;
  immer_: Immer;
  unfinalizedDrafts_: number;
}

let currentScope: ImmerScope | undefined;

export function getCurrentScope() {
  return currentScope!;
}

function createScope(parent_: ImmerScope | undefined, immer_: Immer): ImmerScope {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0,
  };
}

export function usePatchesInScope(scope: ImmerScope, patchListener?: PatchListener) {
  if (patchListener) {
    getPlugin("Patches"); // assert we have the plugin
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}

export function revokeScope(scope: ImmerScope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  // @ts-ignore
  scope.drafts_ = null;
}

export function leaveScope(scope: ImmerScope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}

export function enterScope(immer: Immer) {
  return (currentScope = createScope(currentScope, immer));
}

function revokeDraft(draft: Drafted) {
  const state: ImmerState = draft[DRAFT_STATE];
  if (state.type_ === ArchType.Object || state.type_ === ArchType.Array) state.revoke_();
  else state.revoked_ = true;
}

//#endregion

//#region [ immer/utils/common.ts ]
export const getPrototypeOf = Object.getPrototypeOf;

/** Returns true if the given value is an Immer draft */
/*#__PURE__*/
export function isDraft(value: any): boolean {
  return !!value && !!value[DRAFT_STATE];
}

/** Returns true if the given value can be drafted by Immer */
/*#__PURE__*/
export function isDraftable(value: any): boolean {
  if (!value) return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}

const objectCtorString = Object.prototype.constructor.toString();
/*#__PURE__*/
export function isPlainObject(value: any): boolean {
  if (!value || typeof value !== "object") return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;

  if (Ctor === Object) return true;

  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}

/** Get the underlying object that is represented by the given draft */
/*#__PURE__*/
export function original<T>(value: T): T | undefined;
export function original(value: Drafted<any>): any {
  if (!isDraft(value)) die(15, value);
  return value[DRAFT_STATE].base_;
}

export function each<T extends Objectish>(obj: T, iter: (key: string | number, value: any, source: T) => void, enumerableOnly?: boolean): void;
export function each(obj: any, iter: any) {
  if (getArchtype(obj) === ArchType.Object) {
    Object.entries(obj).forEach(([key, value]) => {
      iter(key, value, obj);
    });
  } else {
    obj.forEach((entry: any, index: any) => iter(index, entry, obj));
  }
}

/*#__PURE__*/
export function getArchtype(thing: any): ArchType {
  const state: undefined | ImmerState = thing[DRAFT_STATE];
  return state
    ? state.type_
    : Array.isArray(thing)
    ? ArchType.Array
    : isMap(thing)
    ? ArchType.Map
    : isSet(thing)
    ? ArchType.Set
    : ArchType.Object;
}

/*#__PURE__*/
export function has(thing: any, prop: PropertyKey): boolean {
  return getArchtype(thing) === ArchType.Map ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}

/*#__PURE__*/
export function get(thing: AnyMap | AnyObject, prop: PropertyKey): any {
  // @ts-ignore
  return getArchtype(thing) === ArchType.Map ? thing.get(prop) : thing[prop];
}

/*#__PURE__*/
export function set(thing: any, propOrOldValue: PropertyKey, value: any) {
  const t = getArchtype(thing);
  if (t === ArchType.Map) thing.set(propOrOldValue, value);
  else if (t === ArchType.Set) {
    thing.add(value);
  } else thing[propOrOldValue] = value;
}

/*#__PURE__*/
export function is(x: any, y: any): boolean {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

/*#__PURE__*/
export function isMap(target: any): target is AnyMap {
  return target instanceof Map;
}

/*#__PURE__*/
export function isSet(target: any): target is AnySet {
  return target instanceof Set;
}
/*#__PURE__*/
export function latest(state: ImmerState): any {
  return state.copy_ || state.base_;
}

/*#__PURE__*/
export function shallowCopy(base: any, strict: boolean) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base)) return Array.prototype.slice.call(base);

  if (!strict && isPlainObject(base)) {
    if (!getPrototypeOf(base)) {
      const obj = Object.create(null);
      return Object.assign(obj, base);
    }
    return { ...base };
  }

  const descriptors = Object.getOwnPropertyDescriptors(base);
  delete descriptors[DRAFT_STATE as any];
  let keys = Reflect.ownKeys(descriptors);
  for (let i = 0; i < keys.length; i++) {
    const key: any = keys[i];
    const desc = descriptors[key];
    if (desc.writable === false) {
      desc.writable = true;
      desc.configurable = true;
    }
    // like object.assign, we will read any _own_, get/set accessors. This helps in dealing
    // with libraries that trap values, like mobx or vue
    // unlike object.assign, non-enumerables will be copied as well
    if (desc.get || desc.set)
      descriptors[key] = {
        configurable: true,
        writable: true, // could live with !!desc.set as well here...
        enumerable: desc.enumerable,
        value: base[key],
      };
  }
  return Object.create(getPrototypeOf(base), descriptors);
}

/**
 * Freezes draftable objects. Returns the original object.
 * By default freezes shallowly, but if the second argument is `true` it will freeze recursively.
 *
 * @param obj
 * @param deep
 */
export function freeze<T>(obj: T, deep?: boolean): T;
export function freeze<T>(obj: any, deep: boolean = false): T {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
  if (getArchtype(obj) > 1 /* Map or Set */) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections as any;
  }
  Object.freeze(obj);
  if (deep) each(obj, (_key, value) => freeze(value, true), true);
  return obj;
}

function dontMutateFrozenCollections() {
  die(2);
}

export function isFrozen(obj: any): boolean {
  return Object.isFrozen(obj);
}

//#endregion

//#region [ immer/core/current.ts ]
/** Takes a snapshot of the current state of a draft and finalizes it (but without freezing). This is a great utility to print the current state during debugging (no Proxies in the way). The output of current can also be safely leaked outside the producer. */
export function current<T>(value: T): T;
export function current(value: any): any {
  if (!isDraft(value)) die(10, value);
  return currentImpl(value);
}

function currentImpl(value: any): any {
  if (!isDraftable(value) || isFrozen(value)) return value;
  const state: ImmerState | undefined = value[DRAFT_STATE];
  let copy: any;
  if (state) {
    if (!state.modified_) return state.base_;
    // Optimization: avoid generating new drafts during copying
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  // recurse
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

//#endregion

//#region [ immer/core/finalize.ts ]

export function processResult(result: any, scope: ImmerScope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_![0];
  const isReplaced = result !== undefined && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      // Finalize the result in case it contains (or is) a subset of the draft.
      result = finalize(scope, result);
      if (!scope.parent_) maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope.patches_, scope.inversePatches_!);
    }
  } else {
    // Finalize the base draft.
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_!(scope.patches_, scope.inversePatches_!);
  }
  return result !== NOTHING ? result : undefined;
}

function finalize(rootScope: ImmerScope, value: any, path?: PatchPath) {
  // Don't recurse in tho recursive data structures
  if (isFrozen(value)) return value;

  const state: ImmerState = value[DRAFT_STATE];
  // A plain object, might need freezing, might contain drafts
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
      true // See #590, don't recurse into non-enumerable of non drafted objects
    );
    return value;
  }
  // Never finalize drafts owned by another scope.
  if (state.scope_ !== rootScope) return value;
  // Unmodified draft, return the (frozen) original
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  // Not finalized yet, let's do that now
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    // Finalize all children of the copy
    // For sets we clone before iterating, otherwise we can get in endless loop due to modifying during iteration, see #628
    // To preserve insertion order in all cases we then clear the set
    // And we let finalizeProperty know it needs to re-add non-draft children back to the target
    let resultEach = result;
    let isSet = false;
    if (state.type_ === ArchType.Set) {
      resultEach = new Set(result);
      result.clear();
      isSet = true;
    }
    each(resultEach, (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet));
    // everything inside is frozen, we can freeze here
    maybeFreeze(rootScope, result, false);
    // first time finalizing, let's create those patches
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(state, path, rootScope.patches_, rootScope.inversePatches_!);
    }
  }
  return state.copy_;
}

function finalizeProperty(
  rootScope: ImmerScope,
  parentState: undefined | ImmerState,
  targetObject: any,
  prop: string | number,
  childValue: any,
  rootPath?: PatchPath,
  targetIsSet?: boolean
) {
  if (process.env.NODE_ENV !== "production" && childValue === targetObject) die(5);
  if (isDraft(childValue)) {
    const path =
      rootPath &&
      parentState &&
      parentState!.type_ !== ArchType.Set && // Set objects are atomic since they have no keys.
      !has((parentState as Exclude<ImmerState, SetState>).assigned_!, prop) // Skip deep patches for assigned keys.
        ? rootPath!.concat(prop)
        : undefined;
    // Drafts owned by `scope` are finalized here.
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    // Drafts from another scope must prevented to be frozen
    // if we got a draft back from finalize, we're in a nested produce and shouldn't freeze
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      // optimization: if an object is not a draft, and we don't have to
      // deepfreeze everything, and we are sure that no drafts are left in the remaining object
      // cause we saw and finalized all drafts already; we can stop visiting the rest of the tree.
      // This benefits especially adding large data tree's without further processing.
      // See add-data.js perf test
      return;
    }
    finalize(rootScope, childValue);
    // immer deep freezes plain objects, so if there is no parent state, we freeze as well
    if (!parentState || !parentState.scope_.parent_) maybeFreeze(rootScope, childValue);
  }
}

function maybeFreeze(scope: ImmerScope, value: any, deep = false) {
  // we never freeze for a non-root scope; as it would prevent pruning for drafts inside wrapping objects
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}

//#endregion

//#region [ immer/proxy/proxy.ts ]

interface ProxyBaseState extends ImmerBaseState {
  assigned_: {
    [property: string]: boolean;
  };
  parent_?: ImmerState;
  revoke_(): void;
}

export interface ProxyObjectState extends ProxyBaseState {
  type_: ArchType.Object;
  base_: any;
  copy_: any;
  draft_: Drafted<AnyObject, ProxyObjectState>;
}

export interface ProxyArrayState extends ProxyBaseState {
  type_: ArchType.Array;
  base_: AnyArray;
  copy_: AnyArray | null;
  draft_: Drafted<AnyArray, ProxyArrayState>;
}
//Only used when building types out initially to get to the checkpoint.  would opt to
// define and internal type or some way of handling this case when building a single ts file
// type ProxyState = ProxyObjectState | ProxyArrayState

/**
 * Returns a new draft of the `base` object.
 *
 * The second argument is the parent draft-state (used internally).
 */
export function createProxyProxy<T extends Objectish>(base: T, parent?: ImmerState): Drafted<T, ProxyState> {
  const isArray = Array.isArray(base);
  const state: ProxyState = {
    type_: isArray ? ArchType.Array : (ArchType.Object as any),
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope()!,
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null as any, // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null as any,
    isManual_: false,
  };

  // the traps must target something, a bit like the 'real' base.
  // but also, we need to be able to determine from the target what the relevant state is
  // (to avoid creating traps per instance to capture the state in closure,
  // and to avoid creating weird hidden properties as well)
  // So the trick is to use 'state' as the actual 'target'! (and make sure we intercept everything)
  // Note that in the case of an array, we put the state in an array to have better Reflect defaults ootb
  let target: T = state as any;
  let traps: ProxyHandler<object | Array<any>> = objectTraps;
  if (isArray) {
    target = [state] as any;
    traps = arrayTraps;
  }

  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy as any;
  state.revoke_ = revoke;
  return proxy as any;
}

/**
 * Object drafts
 */
export const objectTraps: ProxyHandler<ProxyState> = {
  get(state, prop) {
    if (prop === DRAFT_STATE) return state;

    const source = latest(state);
    if (!has(source, prop)) {
      // non-existing or non-own property...
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    // Check for existing draft in modified state.
    // Assigned values are never drafted. This catches any drafts we created, too.
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return (state.copy_![prop as any] = createProxy(value, state));
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state: ProxyObjectState, prop: string /* strictly not, but helps TS */, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      // special case: if this write is captured by a setter, we have
      // to trigger it with the correct context
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      // the last check is because we need to be able to distinguish setting a non-existing to undefined (which is a change)
      // from setting an existing property with value undefined to undefined (which is not a change)
      const current = peek(latest(state), prop);
      // special case, if we assigning the original value to a draft, we can ignore the assignment
      const currentState: ProxyObjectState = current?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_![prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current) && (value !== undefined || has(state.base_, prop))) return true;
      prepareCopy(state);
      markChanged(state);
    }

    if (
      (state.copy_![prop] === value &&
        // special case: handle new props with value 'undefined'
        (value !== undefined || prop in state.copy_)) ||
      // special case: NaN
      (Number.isNaN(value) && Number.isNaN(state.copy_![prop]))
    )
      return true;

    // @ts-ignore
    state.copy_![prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop: string) {
    // The `undefined` check is a fast path for pre-existing keys.
    if (peek(state.base_, prop) !== undefined || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      // if an originally not assigned property was deleted
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc) return desc;
    return {
      writable: true,
      configurable: state.type_ !== ArchType.Array || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop],
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  },
};

/**
 * Array drafts
 */

const arrayTraps: ProxyHandler<[ProxyArrayState]> = {};
each(objectTraps, (key, fn) => {
  // @ts-ignore
  arrayTraps[key] = function () {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function (state, prop) {
  if (process.env.NODE_ENV !== "production" && isNaN(parseInt(prop as any))) die(13);
  // @ts-ignore
  return arrayTraps.set!.call(this, state, prop, undefined);
};
arrayTraps.set = function (state, prop, value) {
  if (process.env.NODE_ENV !== "production" && prop !== "length" && isNaN(parseInt(prop as any))) die(14);
  return objectTraps.set!.call(this, state[0], prop, value, state[0]);
};

// Access a property without creating an Immer draft.
function peek(draft: Drafted, prop: PropertyKey) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}

function readPropFromProto(state: ImmerState, source: any, prop: PropertyKey) {
  const desc = getDescriptorFromProto(source, prop);
  return desc
    ? `value` in desc
      ? desc.value
      : // This is a very special case, if the prop is a getter defined by the
        // prototype, we should invoke it with the draft as context!
        desc.get?.call(state.draft_)
    : undefined;
}

function getDescriptorFromProto(source: any, prop: PropertyKey): PropertyDescriptor | undefined {
  // 'in' checks proto!
  if (!(prop in source)) return undefined;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc) return desc;
    proto = getPrototypeOf(proto);
  }
  return undefined;
}

export function markChanged(state: ImmerState) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}

export function prepareCopy(state: { base_: any; copy_: any; scope_: ImmerScope }) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
  }
}

//#endregion
//#region [ /immer/core/immerClass.ts ]
interface ProducersFns {
  produce: IProduce;
  produceWithPatches: IProduceWithPatches;
}

export class Immer implements ProducersFns {
  autoFreeze_: boolean = true;
  useStrictShallowCopy_: boolean = false;

  constructor(config?: { autoFreeze?: boolean; useStrictShallowCopy?: boolean }) {
    if (typeof config?.autoFreeze === "boolean") this.setAutoFreeze(config!.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean") this.setUseStrictShallowCopy(config!.useStrictShallowCopy);
  }

  /**
   * The `produce` function takes a value and a "recipe function" (whose
   * return value often depends on the base state). The recipe function is
   * free to mutate its first argument however it wants. All mutations are
   * only ever applied to a __copy__ of the base state.
   *
   * Pass only a function to create a "curried producer" which relieves you
   * from passing the recipe function every time.
   *
   * Only plain objects and arrays are made mutable. All other objects are
   * considered uncopyable.
   *
   * Note: This function is __bound__ to its `Immer` instance.
   *
   * @param {any} base - the initial state
   * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
   * @param {Function} patchListener - optional function that will be called with all the patches produced here
   * @returns {any} a new state, or the initial state if nothing was modified
   */
  produce: IProduce = (base: any, recipe?: any, patchListener?: any) => {
    // curried invocation
    if (typeof base === "function" && typeof recipe !== "function") {
      const defaultBase = recipe;
      recipe = base;

      const self = this;
      return function curriedProduce(this: any, base = defaultBase, ...args: any[]) {
        return self.produce(base, (draft: Drafted) => recipe.call(this, draft, ...args)) // prettier-ignore
      };
    }

    if (typeof recipe !== "function") die(6);
    if (patchListener !== undefined && typeof patchListener !== "function") die(7);

    let result;

    // Only plain objects, arrays, and "immerable classes" are drafted.
    if (isDraftable(base)) {
      const scope = enterScope(this);
      const proxy = createProxy(base, undefined);
      let hasError = true;
      try {
        result = recipe(proxy);
        hasError = false;
      } finally {
        // finally instead of catch + rethrow better preserves original stack
        if (hasError) revokeScope(scope);
        else leaveScope(scope);
      }
      usePatchesInScope(scope, patchListener);
      return processResult(result, scope);
    } else if (!base || typeof base !== "object") {
      result = recipe(base);
      if (result === undefined) result = base;
      if (result === NOTHING) result = undefined;
      if (this.autoFreeze_) freeze(result, true);
      if (patchListener) {
        const p: Patch[] = [];
        const ip: Patch[] = [];
        getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
        patchListener(p, ip);
      }
      return result;
    } else die(1, base);
  };

  produceWithPatches: IProduceWithPatches = (base: any, recipe?: any): any => {
    // curried invocation
    if (typeof base === "function") {
      return (state: any, ...args: any[]) => this.produceWithPatches(state, (draft: any) => base(draft, ...args));
    }

    let patches: Patch[], inversePatches: Patch[];
    const result = this.produce(base, recipe, (p: Patch[], ip: Patch[]) => {
      patches = p;
      inversePatches = ip;
    });
    return [result, patches!, inversePatches!];
  };

  createDraft<T extends Objectish>(base: T): Draft<T> {
    if (!isDraftable(base)) die(8);
    if (isDraft(base)) base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, undefined);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy as any;
  }

  finishDraft<D extends Draft<any>>(draft: D, patchListener?: PatchListener): D extends Draft<infer T> ? T : never {
    const state: ImmerState = draft && (draft as any)[DRAFT_STATE];
    if (!state || !state.isManual_) die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(undefined, scope);
  }

  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value: boolean) {
    this.autoFreeze_ = value;
  }

  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value: boolean) {
    this.useStrictShallowCopy_ = value;
  }

  applyPatches<T extends Objectish>(base: T, patches: Patch[]): T {
    // If a patch replaces the entire state, take that replacement as base
    // before applying patches
    let i: number;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    // If there was a patch that replaced the entire state, start from the
    // patch after that.
    if (i > -1) {
      patches = patches.slice(i + 1);
    }

    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      // N.B: never hits if some patch a replacement, patches are never drafts
      return applyPatchesImpl(base, patches);
    }
    // Otherwise, produce a copy of the base state.
    return this.produce(base, (draft: Drafted) => applyPatchesImpl(draft, patches));
  }
}

export function createProxy<T extends Objectish>(value: T, parent?: ImmerState): Drafted<T, ImmerState> {
  // precondition: createProxy should be guarded by isDraftable, so we know we can safely draft
  const draft: Drafted = isMap(value)
    ? getPlugin("MapSet").proxyMap_(value, parent)
    : isSet(value)
    ? getPlugin("MapSet").proxySet_(value, parent)
    : createProxyProxy(value, parent);

  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}

//#endregion
//#region [ immer/immer.ts ] MODIFIED_EXPORTS
/** mono_notes
 * Main modifiication made here was to comment out exports {Immer} as we've already exported
 * further up in the file. We will have to use export detection to differentiate between classes multiple
 * exports . This is good to know, for when I start buildidng the bundling tool for it.
 */
const immer = new Immer();

/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */
export const produce: IProduce = immer.produce;

/**
 * Like `produce`, but `produceWithPatches` always returns a tuple
 * [nextState, patches, inversePatches] (instead of just the next state)
 */
export const produceWithPatches: IProduceWithPatches = immer.produceWithPatches.bind(immer);

/**
 * Pass true to automatically freeze all copies created by Immer.
 *
 * Always freeze by default, even in production mode
 */
export const setAutoFreeze = immer.setAutoFreeze.bind(immer);

/**
 * Pass true to enable strict shallow copy.
 *
 * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
 */
export const setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);

/**
 * Apply an array of Immer patches to the first argument.
 *
 * This function is a producer, which means copy-on-write is in effect.
 */
export const applyPatches = immer.applyPatches.bind(immer);

/**
 * Create an Immer draft from the given base state, which may be a draft itself.
 * The draft can be modified until you finalize it with the `finishDraft` function.
 */
export const createDraft = immer.createDraft.bind(immer);

/**
 * Finalize an Immer draft from a `createDraft` call, returning the base state
 * (if no changes were made) or a modified copy. The draft must *not* be
 * mutated afterwards.
 *
 * Pass a function as the 2nd argument to generate Immer patches based on the
 * changes that were made.
 */
export const finishDraft = immer.finishDraft.bind(immer);

/**
 * This function is actually a no-op, but can be used to cast an immutable type
 * to an draft type and make TypeScript happy
 *
 * @param value
 */
export function castDraft<T>(value: T): Draft<T> {
  return value as any;
}

/**
 * This function is actually a no-op, but can be used to cast a mutable type
 * to an immutable type and make TypeScript happy
 * @param value
 */
export function castImmutable<T>(value: T): Immutable<T> {
  return value as any;
}

// export {Immer}
// export {enablePatches} from "./plugins/patches"
// export {enableMapSet} from "./plugins/mapset"
//#endregion

//#region [ 01_CUSTOM ] CUSTOM_ADDITION
/**mono-notes
 * Make sure to add a extraction for as declaratons into their own section that way we can leave
 * original code unmodified for the most part.
 *Detect import {
    DRATABLE as immerable
 } from './internal'
 */
const nothing = NOTHING;
const immerable = DRAFTABLE;
//#endregion

//#region [ immer/patches.ts ]
export function enablePatches() {
  const errorOffset = 16;
  if (process.env.NODE_ENV !== "production") {
    errors.push(
      'Sets cannot have "replace" patches.',
      function (op: string) {
        return "Unsupported patch operation: " + op;
      },
      function (path: string) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
    );
  }

  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";

  function generatePatches_(state: ImmerState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]): void {
    switch (state.type_) {
      case ArchType.Object:
      case ArchType.Map:
        return generatePatchesFromAssigned(state, basePath, patches, inversePatches);
      case ArchType.Array:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case ArchType.Set:
        return generateSetPatches(state as any as SetState, basePath, patches, inversePatches);
    }
  }

  function generateArrayPatches(state: ProxyArrayState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]) {
    let { base_, assigned_ } = state;
    let copy_ = state.copy_!;

    // Reduce complexity by ensuring `base` is never longer.
    if (copy_.length < base_.length) {
      // @ts-ignore
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }

    // Process replaced indices.
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i]),
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i]),
        });
      }
    }

    // Process added indices.
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i]),
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path,
      });
    }
  }

  // This is used for both Map objects and normal objects.
  function generatePatchesFromAssigned(state: MapState | ProxyObjectState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]) {
    const { base_, copy_ } = state;
    each(state.assigned_!, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_!, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE) return;
      const path = basePath.concat(key as any);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD
          ? { op: REMOVE, path }
          : op === REMOVE
          ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) }
          : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }

  function generateSetPatches(state: SetState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]) {
    let { base_, copy_ } = state;

    let i = 0;
    base_.forEach((value: any) => {
      if (!copy_!.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value,
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value,
        });
      }
      i++;
    });
    i = 0;
    copy_!.forEach((value: any) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value,
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value,
        });
      }
      i++;
    });
  }

  function generateReplacementPatches_(baseValue: any, replacement: any, patches: Patch[], inversePatches: Patch[]): void {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? undefined : replacement,
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue,
    });
  }

  function applyPatches_<T>(draft: T, patches: Patch[]): T {
    patches.forEach(patch => {
      const { path, op } = patch;

      let base: any = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }

        // See #738, avoid prototype pollution
        if ((parentType === ArchType.Object || parentType === ArchType.Array) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype") die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object") die(errorOffset + 2, path.join("/"));
      }

      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value); // used to clone patch to ensure original patch is not modified, see #411
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case ArchType.Map:
              return base.set(key, value);
            /* istanbul ignore next */
            case ArchType.Set:
              die(errorOffset);
            default:
              // if value is an object, then it's assigned by reference
              // in the following add or remove ops, the value field inside the patch will also be modifyed
              // so we use value from the cloned patch
              // @ts-ignore
              return (base[key] = value);
          }
        case ADD:
          switch (type) {
            case ArchType.Array:
              return key === "-" ? base.push(value) : base.splice(key as any, 0, value);
            case ArchType.Map:
              return base.set(key, value);
            case ArchType.Set:
              return base.add(value);
            default:
              return (base[key] = value);
          }
        case REMOVE:
          switch (type) {
            case ArchType.Array:
              return base.splice(key as any, 1);
            case ArchType.Map:
              return base.delete(key);
            case ArchType.Set:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });

    return draft;
  }

  // optimize: this is quite a performance hit, can we detect intelligently when it is needed?
  // E.g. auto-draft when new objects from outside are assigned and modified?
  // (See failing test when deepClone just returns obj)
  function deepClonePatchValue<T>(obj: T): T;
  function deepClonePatchValue(obj: any) {
    if (!isDraftable(obj)) return obj;
    if (Array.isArray(obj)) return obj.map(deepClonePatchValue);
    if (isMap(obj)) return new Map(Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)]));
    if (isSet(obj)) return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf(obj));
    for (const key in obj) cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, immerable)) cloned[immerable] = obj[immerable];
    return cloned;
  }

  function clonePatchValueIfNeeded<T>(obj: T): T {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else return obj;
  }

  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_,
  });
}

//#endregion
//#region [  immer/patches.ts ]
export function enableMapSet() {
  class DraftMap extends Map {
    [DRAFT_STATE]: MapState;

    constructor(target: AnyMap, parent?: ImmerState) {
      super();
      this[DRAFT_STATE] = {
        type_: ArchType.Map,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope()!,
        modified_: false,
        finalized_: false,
        copy_: undefined,
        assigned_: undefined,
        base_: target,
        draft_: this as any,
        isManual_: false,
        revoked_: false,
      };
    }

    get size(): number {
      return latest(this[DRAFT_STATE]).size;
    }

    has(key: any): boolean {
      return latest(this[DRAFT_STATE]).has(key);
    }

    set(key: any, value: any) {
      const state: MapState = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!latest(state).has(key) || latest(state).get(key) !== value) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_!.set(key, true);
        state.copy_!.set(key, value);
        state.assigned_!.set(key, true);
      }
      return this;
    }

    delete(key: any): boolean {
      if (!this.has(key)) {
        return false;
      }

      const state: MapState = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareMapCopy(state);
      markChanged(state);
      if (state.base_.has(key)) {
        state.assigned_!.set(key, false);
      } else {
        state.assigned_!.delete(key);
      }
      state.copy_!.delete(key);
      return true;
    }

    clear() {
      const state: MapState = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_ = new Map();
        each(state.base_, key => {
          state.assigned_!.set(key, false);
        });
        state.copy_!.clear();
      }
    }

    forEach(cb: (value: any, key: any, self: any) => void, thisArg?: any) {
      const state: MapState = this[DRAFT_STATE];
      latest(state).forEach((_value: any, key: any, _map: any) => {
        cb.call(thisArg, this.get(key), key, this);
      });
    }

    get(key: any): any {
      const state: MapState = this[DRAFT_STATE];
      assertUnrevoked(state);
      const value = latest(state).get(key);
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value !== state.base_.get(key)) {
        return value; // either already drafted or reassigned
      }
      // despite what it looks, this creates a draft only once, see above condition
      const draft = createProxy(value, state);
      prepareMapCopy(state);
      state.copy_!.set(key, draft);
      return draft;
    }

    keys(): IterableIterator<any> {
      return latest(this[DRAFT_STATE]).keys();
    }

    values(): IterableIterator<any> {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.values(),
        next: () => {
          const r = iterator.next();
          /* istanbul ignore next */
          if (r.done) return r;
          const value = this.get(r.value);
          return {
            done: false,
            value,
          };
        },
      } as any;
    }

    entries(): IterableIterator<[any, any]> {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.entries(),
        next: () => {
          const r = iterator.next();
          /* istanbul ignore next */
          if (r.done) return r;
          const value = this.get(r.value);
          return {
            done: false,
            value: [r.value, value],
          };
        },
      } as any;
    }

    [Symbol.iterator]() {
      return this.entries();
    }
  }

  function proxyMap_<T extends AnyMap>(target: T, parent?: ImmerState): T {
    // @ts-ignore
    return new DraftMap(target, parent);
  }

  function prepareMapCopy(state: MapState) {
    if (!state.copy_) {
      state.assigned_ = new Map();
      state.copy_ = new Map(state.base_);
    }
  }

  class DraftSet extends Set {
    [DRAFT_STATE]: SetState;
    constructor(target: AnySet, parent?: ImmerState) {
      super();
      this[DRAFT_STATE] = {
        type_: ArchType.Set,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope()!,
        modified_: false,
        finalized_: false,
        copy_: undefined,
        base_: target,
        draft_: this,
        drafts_: new Map(),
        revoked_: false,
        isManual_: false,
      };
    }

    get size(): number {
      return latest(this[DRAFT_STATE]).size;
    }

    has(value: any): boolean {
      const state: SetState = this[DRAFT_STATE];
      assertUnrevoked(state);
      // bit of trickery here, to be able to recognize both the value, and the draft of its value
      if (!state.copy_) {
        return state.base_.has(value);
      }
      if (state.copy_.has(value)) return true;
      if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value))) return true;
      return false;
    }

    add(value: any): any {
      const state: SetState = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!this.has(value)) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_!.add(value);
      }
      return this;
    }

    delete(value: any): any {
      if (!this.has(value)) {
        return false;
      }

      const state: SetState = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      markChanged(state);
      return (
        state.copy_!.delete(value) ||
        (state.drafts_.has(value) ? state.copy_!.delete(state.drafts_.get(value)) : /* istanbul ignore next */ false)
      );
    }

    clear() {
      const state: SetState = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_!.clear();
      }
    }

    values(): IterableIterator<any> {
      const state: SetState = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_!.values();
    }

    entries(): IterableIterator<[any, any]> {
      const state: SetState = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_!.entries();
    }

    keys(): IterableIterator<any> {
      return this.values();
    }

    [Symbol.iterator]() {
      return this.values();
    }

    forEach(cb: any, thisArg?: any) {
      const iterator = this.values();
      let result = iterator.next();
      while (!result.done) {
        cb.call(thisArg, result.value, result.value, this);
        result = iterator.next();
      }
    }
  }
  function proxySet_<T extends AnySet>(target: T, parent?: ImmerState): T {
    // @ts-ignore
    return new DraftSet(target, parent);
  }

  function prepareSetCopy(state: SetState) {
    if (!state.copy_) {
      // create drafts for all entries to preserve insertion order
      state.copy_ = new Set();
      state.base_.forEach(value => {
        if (isDraftable(value)) {
          const draft = createProxy(value, state);
          state.drafts_.set(value, draft);
          state.copy_!.add(draft);
        } else {
          state.copy_!.add(value);
        }
      });
    }
  }

  function assertUnrevoked(state: any /*ES5State | MapState | SetState*/) {
    if (state.revoked_) die(3, JSON.stringify(latest(state)));
  }

  loadPlugin("MapSet", { proxyMap_, proxySet_ });
}

//#endregion
//#region [ ADDED_EXPORT ]
export { immer };
//#endregion
