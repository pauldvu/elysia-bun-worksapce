declare module "pkgs/immer/index" {
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
    /**
     // https://github.com/immerjs/immer/releases
     IMMER_MONOFILE
    A single TS file immer monofile. To be used with the bun runtime.
    Monofiles  give you a ton of benefits, but you should know the tradeoffs before commiting to them.
    
    */
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
    /**
     * The sentinel value returned by producers to replace the draft with undefined.
     */
    export const NOTHING: unique symbol;
    /**
     * To let Immer treat your class instances as plain immutable objects
     * (albeit with a custom prototype), you must define either an instance property
     * or a static property on each of your custom classes.
     *
     * Otherwise, your class instance will never be drafted, which means it won't be
     * safe to mutate in a produce callback.
     */
    export const DRAFTABLE: unique symbol;
    export const DRAFT_STATE: unique symbol;
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
    export type IfAvailable<T, Fallback = void> = true | false extends (T extends never ? true : false) ? Fallback : keyof T extends never ? Fallback : T;
    /**
     * These should also never be mapped but must be tested after regular Map and
     * Set
     */
    type WeakReferences = IfAvailable<WeakMap<any, any>> | IfAvailable<WeakSet<any>>;
    export type WritableDraft<T> = {
        -readonly [K in keyof T]: Draft<T[K]>;
    };
    /** Convert a readonly type into a mutable type, if possible */
    export type Draft<T> = T extends PrimitiveType ? T : T extends AtomicObject ? T : T extends ReadonlyMap<infer K, infer V> ? Map<Draft<K>, Draft<V>> : T extends ReadonlySet<infer V> ? Set<Draft<V>> : T extends WeakReferences ? T : T extends object ? WritableDraft<T> : T;
    /** Convert a mutable type into a readonly type */
    export type Immutable<T> = T extends PrimitiveType ? T : T extends AtomicObject ? T : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<Immutable<K>, Immutable<V>> : T extends ReadonlySet<infer V> ? ReadonlySet<Immutable<V>> : T extends WeakReferences ? T : T extends object ? {
        readonly [K in keyof T]: Immutable<T[K]>;
    } : T;
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
    type InferRecipeFromCurried<Curried> = Curried extends (base: infer State, ...rest: infer Args) => any ? ReturnType<Curried> extends State ? (draft: Draft<State>, ...rest: Args) => ValidRecipeReturnType<Draft<State>> : never : never;
    type InferInitialStateFromCurried<Curried> = Curried extends (base: infer State, ...rest: any[]) => any ? State : never;
    type InferCurriedFromRecipe<Recipe, UsePatches extends boolean> = Recipe extends (draft: infer DraftState, ...args: infer RestArgs) => any ? ReturnType<Recipe> extends ValidRecipeReturnType<DraftState> ? (base: Immutable<DraftState>, ...args: RestArgs) => ReturnTypeWithPatchesIfNeeded<DraftState, UsePatches> : never : never;
    type InferCurriedFromInitialStateAndRecipe<State, Recipe, UsePatches extends boolean> = Recipe extends (draft: Draft<State>, ...rest: infer RestArgs) => ValidRecipeReturnType<State> ? (base?: State | undefined, ...args: RestArgs) => ReturnTypeWithPatchesIfNeeded<State, UsePatches> : never;
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
        <State, Args extends any[]>(recipe: (state: Draft<State>, ...args: Args) => ValidRecipeReturnType<State>, initialState: State): (state?: State, ...args: Args) => State;
        <State>(recipe: (state: Draft<State>) => ValidRecipeReturnType<State>): (state: State) => State;
        <State, Args extends any[]>(recipe: (state: Draft<State>, ...args: Args) => ValidRecipeReturnType<State>): (state: State, ...args: Args) => State;
        /** Curried producer with initial state, infers recipe from initial state */
        <State, Recipe extends Function>(recipe: Recipe, initialState: State): InferCurriedFromInitialStateAndRecipe<State, Recipe, false>;
        /** Normal producer */
        <Base, D = Draft<Base>>(// By using a default inferred D, rather than Draft<Base> in the recipe, we can override it.
        base: Base, recipe: (draft: D) => ValidRecipeReturnType<D>, listener?: PatchListener): Base;
    }
    /**
     * Like `produce`, but instead of just returning the new state,
     * a tuple is returned with [nextState, patches, inversePatches]
     *
     * Like produce, this function supports currying
     */
    export interface IProduceWithPatches {
        <Recipe extends AnyFunc>(recipe: Recipe): InferCurriedFromRecipe<Recipe, true>;
        <State, Recipe extends Function>(recipe: Recipe, initialState: State): InferCurriedFromInitialStateAndRecipe<State, Recipe, true>;
        <Base, D = Draft<Base>>(base: Base, recipe: (draft: D) => ValidRecipeReturnType<D>, listener?: PatchListener): PatchesTuple<Base>;
    }
    /**
     * The type for `recipe function`
     */
    export type Producer<T> = (draft: Draft<T>) => ValidRecipeReturnType<Draft<T>>;
    export function never_used(): void;
    export type Objectish = AnyObject | AnyArray | AnyMap | AnySet;
    export type ObjectishNoSet = AnyObject | AnyArray | AnyMap;
    export type AnyObject = {
        [key: string]: any;
    };
    export type AnyArray = Array<any>;
    export type AnySet = Set<any>;
    export type AnyMap = Map<any, any>;
    export const enum ArchType {
        Object = 0,
        Array = 1,
        Map = 2,
        Set = 3
    }
    export interface ImmerBaseState {
        parent_?: ImmerState;
        scope_: ImmerScope;
        modified_: boolean;
        finalized_: boolean;
        isManual_: boolean;
    }
    export type ImmerState = ProxyObjectState | ProxyArrayState | MapState | SetState;
    export type Drafted<Base = any, T extends ImmerState = ImmerState> = {
        [DRAFT_STATE]: T;
    } & Base;
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
    export const errors: (string | ((plugin: string) => string))[];
    export function die(error: number, ...args: any[]): never;
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
    };
    type Plugins = typeof plugins;
    export function getPlugin<K extends keyof Plugins>(pluginKey: K): Exclude<Plugins[K], undefined>;
    export function loadPlugin<K extends keyof Plugins>(pluginKey: K, implementation: Plugins[K]): void;
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
        drafts_: Map<any, Drafted>;
        revoked_: boolean;
        draft_: Drafted<AnySet, SetState>;
    }
    /** Patches plugin */
    export type PatchPath = (string | number)[];
    /**
    * Added during the initial building of the mono file, to allow typescript to understand the types as we logically
    stepped through the code to understand how it all connects
     */
    interface ProducersFns {
        produce: IProduce;
        produceWithPatches: IProduceWithPatches;
    }
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
    export function getCurrentScope(): ImmerScope;
    export function usePatchesInScope(scope: ImmerScope, patchListener?: PatchListener): void;
    export function revokeScope(scope: ImmerScope): void;
    export function leaveScope(scope: ImmerScope): void;
    export function enterScope(immer: Immer): ImmerScope;
    export const getPrototypeOf: (o: any) => any;
    /** Returns true if the given value is an Immer draft */
    export function isDraft(value: any): boolean;
    /** Returns true if the given value can be drafted by Immer */
    export function isDraftable(value: any): boolean;
    export function isPlainObject(value: any): boolean;
    /** Get the underlying object that is represented by the given draft */
    export function original<T>(value: T): T | undefined;
    export function each<T extends Objectish>(obj: T, iter: (key: string | number, value: any, source: T) => void, enumerableOnly?: boolean): void;
    export function getArchtype(thing: any): ArchType;
    export function has(thing: any, prop: PropertyKey): boolean;
    export function get(thing: AnyMap | AnyObject, prop: PropertyKey): any;
    export function set(thing: any, propOrOldValue: PropertyKey, value: any): void;
    export function is(x: any, y: any): boolean;
    export function isMap(target: any): target is AnyMap;
    export function isSet(target: any): target is AnySet;
    export function latest(state: ImmerState): any;
    export function shallowCopy(base: any, strict: boolean): any;
    /**
     * Freezes draftable objects. Returns the original object.
     * By default freezes shallowly, but if the second argument is `true` it will freeze recursively.
     *
     * @param obj
     * @param deep
     */
    export function freeze<T>(obj: T, deep?: boolean): T;
    export function isFrozen(obj: any): boolean;
    /** Takes a snapshot of the current state of a draft and finalizes it (but without freezing). This is a great utility to print the current state during debugging (no Proxies in the way). The output of current can also be safely leaked outside the producer. */
    export function current<T>(value: T): T;
    export function processResult(result: any, scope: ImmerScope): any;
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
    /**
     * Returns a new draft of the `base` object.
     *
     * The second argument is the parent draft-state (used internally).
     */
    export function createProxyProxy<T extends Objectish>(base: T, parent?: ImmerState): Drafted<T, ProxyState>;
    /**
     * Object drafts
     */
    export const objectTraps: ProxyHandler<ProxyState>;
    export function markChanged(state: ImmerState): void;
    export function prepareCopy(state: {
        base_: any;
        copy_: any;
        scope_: ImmerScope;
    }): void;
    interface ProducersFns {
        produce: IProduce;
        produceWithPatches: IProduceWithPatches;
    }
    export class Immer implements ProducersFns {
        autoFreeze_: boolean;
        useStrictShallowCopy_: boolean;
        constructor(config?: {
            autoFreeze?: boolean;
            useStrictShallowCopy?: boolean;
        });
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
        produce: IProduce;
        produceWithPatches: IProduceWithPatches;
        createDraft<T extends Objectish>(base: T): Draft<T>;
        finishDraft<D extends Draft<any>>(draft: D, patchListener?: PatchListener): D extends Draft<infer T> ? T : never;
        /**
         * Pass true to automatically freeze all copies created by Immer.
         *
         * By default, auto-freezing is enabled.
         */
        setAutoFreeze(value: boolean): void;
        /**
         * Pass true to enable strict shallow copy.
         *
         * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
         */
        setUseStrictShallowCopy(value: boolean): void;
        applyPatches<T extends Objectish>(base: T, patches: Patch[]): T;
    }
    export function createProxy<T extends Objectish>(value: T, parent?: ImmerState): Drafted<T, ImmerState>;
    /** mono_notes
     * Main modifiication made here was to comment out exports {Immer} as we've already exported
     * further up in the file. We will have to use export detection to differentiate between classes multiple
     * exports . This is good to know, for when I start buildidng the bundling tool for it.
     */
    const immer: Immer;
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
    export const produce: IProduce;
    /**
     * Like `produce`, but `produceWithPatches` always returns a tuple
     * [nextState, patches, inversePatches] (instead of just the next state)
     */
    export const produceWithPatches: IProduceWithPatches;
    /**
     * Pass true to automatically freeze all copies created by Immer.
     *
     * Always freeze by default, even in production mode
     */
    export const setAutoFreeze: (value: boolean) => void;
    /**
     * Pass true to enable strict shallow copy.
     *
     * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
     */
    export const setUseStrictShallowCopy: (value: boolean) => void;
    /**
     * Apply an array of Immer patches to the first argument.
     *
     * This function is a producer, which means copy-on-write is in effect.
     */
    export const applyPatches: <T extends Objectish>(base: T, patches: Patch[]) => T;
    /**
     * Create an Immer draft from the given base state, which may be a draft itself.
     * The draft can be modified until you finalize it with the `finishDraft` function.
     */
    export const createDraft: <T extends Objectish>(base: T) => Draft<T>;
    /**
     * Finalize an Immer draft from a `createDraft` call, returning the base state
     * (if no changes were made) or a modified copy. The draft must *not* be
     * mutated afterwards.
     *
     * Pass a function as the 2nd argument to generate Immer patches based on the
     * changes that were made.
     */
    export const finishDraft: <D extends unknown>(draft: D, patchListener?: PatchListener) => D extends Draft<infer T> ? T : never;
    /**
     * This function is actually a no-op, but can be used to cast an immutable type
     * to an draft type and make TypeScript happy
     *
     * @param value
     */
    export function castDraft<T>(value: T): Draft<T>;
    /**
     * This function is actually a no-op, but can be used to cast a mutable type
     * to an immutable type and make TypeScript happy
     * @param value
     */
    export function castImmutable<T>(value: T): Immutable<T>;
    export function enablePatches(): void;
    export function enableMapSet(): void;
    export { immer };
}
declare module "pkgs/vtype/index" {
    /** The base Error type thrown for all TypeBox exceptions  */
    export class TypeBoxError extends Error {
        constructor(message: string);
    }
    /** Symbol key applied to transform types */
    export const TransformKind: unique symbol;
    /** Symbol key applied to readonly types */
    export const ReadonlyKind: unique symbol;
    /** Symbol key applied to optional types */
    export const OptionalKind: unique symbol;
    /** Symbol key applied to types */
    export const Hint: unique symbol;
    /** Symbol key applied to types */
    export const Kind: unique symbol;
    export interface SchemaOptions {
        $schema?: string;
        /** Id for this schema */
        $id?: string;
        /** Title of this schema */
        title?: string;
        /** Description of this schema */
        description?: string;
        /** Default value for this schema */
        default?: any;
        /** Example values matching this schema */
        examples?: any;
        /** Optional annotation for readOnly */
        readOnly?: boolean;
        /** Optional annotation for writeOnly */
        writeOnly?: boolean;
        [prop: string]: any;
    }
    export interface TKind {
        [Kind]: string;
    }
    export interface TSchema extends TKind, SchemaOptions {
        [ReadonlyKind]?: string;
        [OptionalKind]?: string;
        [Hint]?: string;
        params: unknown[];
        static: unknown;
    }
    export type StringFormatOption = "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "uuid" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex" | ({} & string);
    export type StringContentEncodingOption = '7bit' | '8bit' | 'binary' | 'quoted-printable' | 'base64' | ({} & string);
    export interface StringOptions extends SchemaOptions {
        /** The maximum string length */
        maxLength?: number;
        /** The minimum string length */
        minLength?: number;
        /** A regular expression pattern this string should match */
        pattern?: string;
        /** A format this string should match */
        format?: StringFormatOption;
        /** The content encoding for this string */
        contentEncoding?: StringContentEncodingOption;
        /** The content media type for this string */
        contentMediaType?: string;
    }
    export interface TString extends TSchema, StringOptions {
        [Kind]: "String";
        static: string;
        type: "string";
    }
    /** `[Json]` Creates a String type */
    export function String(options?: StringOptions): TString;
    export interface NumberOptions extends SchemaOptions {
        exclusiveMaximum?: number;
        exclusiveMinimum?: number;
        maximum?: number;
        minimum?: number;
        multipleOf?: number;
    }
    export interface TNumber extends TSchema, NumberOptions {
        [Kind]: "Number";
        static: number;
        type: "number";
    }
    /** `[Json]` Creates a Number type */
    export function _Number(options?: NumberOptions): TNumber;
    /** Clones a Rest */
    export function CloneRest<T extends TSchema[]>(schemas: T): T;
    /** Clones a Type */
    export function CloneType<T extends TSchema>(schema: T, options?: SchemaOptions): T;
    export interface ArrayOptions extends SchemaOptions {
        /** The minimum number of items in this array */
        minItems?: number;
        /** The maximum number of items in this array */
        maxItems?: number;
        /** Should this schema contain unique items */
        uniqueItems?: boolean;
        /** A schema for which some elements should match */
        contains?: TSchema;
        /** A minimum number of contains schema matches */
        minContains?: number;
        /** A maximum number of contains schema matches */
        maxContains?: number;
    }
    export interface TArray<T extends TSchema = TSchema> extends TSchema, ArrayOptions {
        [Kind]: "Array";
        static: Array<Static<T, this["params"]>>;
        type: "array";
        items: T;
    }
    /** `[Json]` Creates an Array type */
    export function _Array<T extends TSchema>(schema: T, options?: ArrayOptions): TArray<T>;
    export const ValueGuard: {
        IsAsyncIterator(value: unknown): value is AsyncIterableIterator<unknown>;
        /** Returns true if this value is an array */
        IsArray(value: unknown): value is unknown[];
        /** Returns true if this value is bigint */
        IsBigInt(value: unknown): value is bigint;
        /** Returns true if this value is a boolean */
        IsBoolean(value: unknown): value is boolean;
        /** Returns true if this value is a Date object */
        IsDate(value: unknown): value is Date;
        /** Returns true if this value is a function */
        IsFunction(value: unknown): value is Function;
        /** Returns true if this value is an iterator */
        IsIterator(value: unknown): value is IterableIterator<unknown>;
        /** Returns true if this value is null */
        IsNull(value: unknown): value is null;
        /** Returns true if this value is number */
        IsNumber(value: unknown): value is number;
        /** Returns true if this value is an object */
        IsObject(value: unknown): value is Record<PropertyKey, unknown>;
        /** Returns true if this value is RegExp */
        IsRegExp(value: unknown): value is RegExp;
        /** Returns true if this value is string */
        IsString(value: unknown): value is string;
        /** Returns true if this value is symbol */
        IsSymbol(value: unknown): value is symbol;
        /** Returns true if this value is a Uint8Array */
        IsUint8Array(value: unknown): value is Uint8Array;
        /** Returns true if this value is undefined */
        IsUndefined(value: unknown): value is undefined;
    };
    /** Clones a value */
    export function Clone<T>(value: T): T;
    export interface TMappedKey<T extends PropertyKey[] = PropertyKey[]> extends TSchema {
        [Kind]: "MappedKey";
        static: T[number];
        keys: T;
    }
    export function MappedKey<T extends PropertyKey[]>(T: [...T]): TMappedKey<T>;
    export type TReadonlyFromMappedResult<R extends TMappedResult, F extends boolean, P extends TProperties = TFromMappedResult<R, F>> = (TMappedResult<P>);
    export function ReadonlyFromMappedResult<R extends TMappedResult, F extends boolean, P extends TProperties = TFromMappedResult<R, F>>(R: R, F: F): TMappedResult<P>;
    type TRemoveReadonly<T extends TSchema> = T extends TReadonly<infer S> ? S : T;
    type TAddReadonly<T extends TSchema> = T extends TReadonly<infer S> ? TReadonly<S> : Ensure<TReadonly<T>>;
    export type TReadonlyWithFlag<T extends TSchema, F extends boolean> = F extends false ? TRemoveReadonly<T> : TAddReadonly<T>;
    export type TReadonly<T extends TSchema> = T & {
        [ReadonlyKind]: "Readonly";
    };
    /** `[Json]` Creates a Readonly property */
    export function Readonly<T extends TMappedResult, F extends boolean>(schema: T, enable: F): TReadonlyFromMappedResult<T, F>;
    /** `[Json]` Creates a Readonly property */
    export function Readonly<T extends TSchema, F extends boolean>(schema: T, enable: F): TReadonlyWithFlag<T, F>;
    /** `[Json]` Creates a Readonly property */
    export function Readonly<T extends TMappedResult>(schema: T): TReadonlyFromMappedResult<T, true>;
    /** `[Json]` Creates a Readonly property */
    export function Readonly<T extends TSchema>(schema: T): TReadonlyWithFlag<T, true>;
    type ReadonlyOptionalPropertyKeys<T extends TProperties> = {
        [K in keyof T]: T[K] extends TReadonly<TSchema> ? (T[K] extends TOptional<T[K]> ? K : never) : never;
    }[keyof T];
    type ReadonlyPropertyKeys<T extends TProperties> = {
        [K in keyof T]: T[K] extends TReadonly<TSchema> ? (T[K] extends TOptional<T[K]> ? never : K) : never;
    }[keyof T];
    type OptionalPropertyKeys<T extends TProperties> = {
        [K in keyof T]: T[K] extends TOptional<TSchema> ? (T[K] extends TReadonly<T[K]> ? never : K) : never;
    }[keyof T];
    type RequiredPropertyKeys<T extends TProperties> = keyof Omit<T, ReadonlyOptionalPropertyKeys<T> | ReadonlyPropertyKeys<T> | OptionalPropertyKeys<T>>;
    type ObjectStaticProperties<T extends TProperties, R extends Record<keyof any, unknown>> = Evaluate<(Readonly<Partial<Pick<R, ReadonlyOptionalPropertyKeys<T>>>> & Readonly<Pick<R, ReadonlyPropertyKeys<T>>> & Partial<Pick<R, OptionalPropertyKeys<T>>> & Required<Pick<R, RequiredPropertyKeys<T>>>)>;
    type ObjectStatic<T extends TProperties, P extends unknown[]> = ObjectStaticProperties<T, {
        [K in keyof T]: Static<T[K], P>;
    }>;
    export type TPropertyKey = string | number;
    export type TProperties = Record<TPropertyKey, TSchema>;
    export type TAdditionalProperties = undefined | TSchema | boolean;
    export interface ObjectOptions extends SchemaOptions {
        /** Additional property constraints for this object */
        additionalProperties?: TAdditionalProperties;
        /** The minimum number of properties allowed on this object */
        minProperties?: number;
        /** The maximum number of properties allowed on this object */
        maxProperties?: number;
    }
    export interface TObject<T extends TProperties = TProperties> extends TSchema, ObjectOptions {
        [Kind]: "Object";
        static: ObjectStatic<T, this["params"]>;
        additionalProperties?: TAdditionalProperties;
        type: "object";
        properties: T;
        required?: string[];
    }
    /** `[Json]` Creates an Object type */
    export function _Object<T extends TProperties>(properties: T, options?: ObjectOptions): TObject<T>;
    /** `[Json]` Creates an Object type */
    export type TupleToIntersect<T extends any[]> = T extends [infer I] ? I : T extends [infer I, ...infer R] ? I & TupleToIntersect<R> : never;
    export type TupleToUnion<T extends any[]> = {
        [K in keyof T]: T[K];
    }[number];
    export type UnionToIntersect<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never;
    export type UnionLast<U> = UnionToIntersect<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never;
    export type UnionToTuple<U, Acc extends unknown[] = [], R = UnionLast<U>> = [U] extends [never] ? Acc : UnionToTuple<Exclude<U, R>, [Extract<U, R>, ...Acc]>;
    export type Trim<T> = T extends `${" "}${infer U}` ? Trim<U> : T extends `${infer U}${" "}` ? Trim<U> : T;
    export type Assert<T, E> = T extends E ? T : never;
    export type Evaluate<T> = T extends infer O ? {
        [K in keyof O]: O[K];
    } : never;
    export type Ensure<T> = T extends infer U ? U : never;
    export type EmptyString = "";
    export type ZeroString = "0";
    type IncrementBase = {
        m: "9";
        t: "01";
        "0": "1";
        "1": "2";
        "2": "3";
        "3": "4";
        "4": "5";
        "5": "6";
        "6": "7";
        "7": "8";
        "8": "9";
        "9": "0";
    };
    type IncrementTake<T extends keyof IncrementBase> = IncrementBase[T];
    type IncrementStep<T extends string> = T extends IncrementBase["m"] ? IncrementBase["t"] : T extends `${infer L extends keyof IncrementBase}${infer R}` ? L extends IncrementBase["m"] ? `${IncrementTake<L>}${IncrementStep<R>}` : `${IncrementTake<L>}${R}` : never;
    type IncrementReverse<T extends string> = T extends `${infer L}${infer R}` ? `${IncrementReverse<R>}${L}` : T;
    export type Increment<T extends string> = IncrementReverse<IncrementStep<IncrementReverse<T>>>;
    /** Increments the given string value + 1 */
    export function Increment<T extends string>(T: T): Increment<T>;
    export type AssertProperties<T> = T extends TProperties ? T : TProperties;
    export type AssertRest<T, E extends TSchema[] = TSchema[]> = T extends E ? T : [];
    export type AssertType<T, E extends TSchema = TSchema> = T extends E ? T : TNever;
    export interface TNever extends TSchema {
        [Kind]: "Never";
        static: never;
        not: {};
    }
    /** `[Json]` Creates a Never type */
    export function Never(options?: SchemaOptions): TNever;
    export class TransformDecodeBuilder<T extends TSchema> {
        private readonly schema;
        constructor(schema: T);
        Decode<U extends unknown, D extends TransformFunction<StaticDecode<T>, U>>(decode: D): TransformEncodeBuilder<T, D>;
    }
    export class TransformEncodeBuilder<T extends TSchema, D extends TransformFunction> {
        private readonly schema;
        private readonly decode;
        constructor(schema: T, decode: D);
        private EncodeTransform;
        private EncodeSchema;
        Encode<E extends TransformFunction<ReturnType<D>, StaticDecode<T>>>(encode: E): TTransform<T, ReturnType<D>>;
    }
    type TransformStatic<T extends TSchema, P extends unknown[] = []> = T extends TTransform<infer _, infer S> ? S : Static<T, P>;
    export type TransformFunction<T = any, U = any> = (value: T) => U;
    export interface TransformOptions<I extends TSchema = TSchema, O extends unknown = unknown> {
        Decode: TransformFunction<StaticDecode<I>, O>;
        Encode: TransformFunction<O, StaticDecode<I>>;
    }
    export interface TTransform<I extends TSchema = TSchema, O extends unknown = unknown> extends TSchema {
        static: TransformStatic<I, this["params"]>;
        [TransformKind]: TransformOptions<I, O>;
        [key: string]: any;
    }
    /** `[Json]` Creates a Transform type */
    export function Transform<I extends TSchema>(schema: I): TransformDecodeBuilder<I>;
    export interface UnsafeOptions extends SchemaOptions {
        [Kind]?: string;
    }
    export interface TUnsafe<T> extends TSchema {
        [Kind]: string;
        static: T;
    }
    /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
    export function Unsafe<T>(options?: UnsafeOptions): TUnsafe<T>;
    export interface TAsyncIterator<T extends TSchema = TSchema> extends TSchema {
        [Kind]: "AsyncIterator";
        static: AsyncIterableIterator<Static<T, this["params"]>>;
        type: "AsyncIterator";
        items: T;
    }
    /** `[JavaScript]` Creates a AsyncIterator type */
    export function AsyncIterator<T extends TSchema>(items: T, options?: SchemaOptions): TAsyncIterator<T>;
    type ConstructorStaticReturnType<T extends TSchema, P extends unknown[]> = Static<T, P>;
    type ConstructorStaticParameters<T extends TSchema[], P extends unknown[], Acc extends unknown[] = []> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? ConstructorStaticParameters<R, P, [...Acc, Static<L, P>]> : Acc;
    type ConstructorStatic<T extends TSchema[], U extends TSchema, P extends unknown[]> = (Ensure<new (...param: ConstructorStaticParameters<T, P>) => ConstructorStaticReturnType<U, P>>);
    export interface TConstructor<T extends TSchema[] = TSchema[], U extends TSchema = TSchema> extends TSchema {
        [Kind]: "Constructor";
        static: ConstructorStatic<T, U, this["params"]>;
        type: "Constructor";
        parameters: T;
        returns: U;
    }
    /** `[JavaScript]` Creates a Constructor type */
    export function Constructor<T extends TSchema[], U extends TSchema>(parameters: [...T], returns: U, options?: SchemaOptions): TConstructor<T, U>;
    export type TEnumRecord = Record<TEnumKey, TEnumValue>;
    export type TEnumValue = string | number;
    export type TEnumKey = string;
    export interface TEnum<T extends Record<string, string | number> = Record<string, string | number>> extends TSchema {
        [Kind]: "Union";
        [Hint]: "Enum";
        static: T[keyof T];
        anyOf: TLiteral<T[keyof T]>[];
    }
    /** `[Json]` Creates a Enum type */
    export function Enum<V extends TEnumValue, T extends Record<TEnumKey, V>>(item: T, options?: SchemaOptions): TEnum<T>;
    export type TLiteralValue = boolean | number | string;
    export interface TLiteral<T extends TLiteralValue = TLiteralValue> extends TSchema {
        [Kind]: "Literal";
        static: T;
        const: T;
    }
    /** `[Json]` Creates a Literal type */
    export function Literal<T extends TLiteralValue>(value: T, options?: SchemaOptions): TLiteral<T>;
    type TIsUnionOptional<T extends TSchema[]> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? L extends TOptional<TSchema> ? true : TIsUnionOptional<R> : false;
    type TRemoveOptionalFromRest<T extends TSchema[], Acc extends TSchema[] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? L extends TOptional<infer S extends TSchema> ? TRemoveOptionalFromRest<R, [...Acc, TRemoveOptionalFromType<S>]> : TRemoveOptionalFromRest<R, [...Acc, L]> : Acc);
    type TRemoveOptionalFromType<T extends TSchema> = (T extends TReadonly<infer S extends TSchema> ? TReadonly<TRemoveOptionalFromType<S>> : T extends TOptional<infer S extends TSchema> ? TRemoveOptionalFromType<S> : T);
    type TResolveUnion<T extends TSchema[], R extends TSchema[] = TRemoveOptionalFromRest<T>> = (TIsUnionOptional<T> extends true ? TOptional<TUnion<R>> : TUnion<R>);
    export type TUnionEvaluated<T extends TSchema[]> = (T extends [] ? TNever : T extends [TSchema] ? T[0] : TResolveUnion<T>);
    /** `[Json]` Creates an evaluated Union type */
    export function UnionEvaluated<T extends TSchema[], R = TUnionEvaluated<T>>(T: [...T], options?: SchemaOptions): R;
    type UnionStatic<T extends TSchema[], P extends unknown[]> = {
        [K in keyof T]: T[K] extends TSchema ? Static<T[K], P> : never;
    }[number];
    export interface TUnion<T extends TSchema[] = TSchema[]> extends TSchema {
        [Kind]: "Union";
        static: UnionStatic<T, this["params"]>;
        anyOf: T;
    }
    export function UnionCreate<T extends TSchema[]>(T: [...T], options: SchemaOptions): TUnion<T>;
    export type Union<T extends TSchema[]> = T extends [] ? TNever : T extends [TSchema] ? T[0] : TUnion<T>;
    /** `[Json]` Creates a Union type */
    export function Union<T extends TSchema[]>(T: [...T], options?: SchemaOptions): Union<T>;
    type FunctionStaticReturnType<T extends TSchema, P extends unknown[]> = Static<T, P>;
    type FunctionStaticParameters<T extends TSchema[], P extends unknown[], Acc extends unknown[] = []> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? FunctionStaticParameters<R, P, [...Acc, Static<L, P>]> : Acc;
    type FunctionStatic<T extends TSchema[], U extends TSchema, P extends unknown[]> = (Ensure<(...param: FunctionStaticParameters<T, P>) => FunctionStaticReturnType<U, P>>);
    export interface TFunction<T extends TSchema[] = TSchema[], U extends TSchema = TSchema> extends TSchema {
        [Kind]: "Function";
        static: FunctionStatic<T, U, this["params"]>;
        type: "Function";
        parameters: T;
        returns: U;
    }
    /** `[JavaScript]` Creates a Function type */
    export function Function<T extends TSchema[], U extends TSchema>(parameters: [...T], returns: U, options?: SchemaOptions): TFunction<T, U>;
    type TIntersectStatic<T extends TSchema[], P extends unknown[], Acc extends unknown = unknown> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TIntersectStatic<R, P, Acc & Static<L, P>> : Acc;
    export type TUnevaluatedProperties = undefined | TSchema | boolean;
    export interface IntersectOptions extends SchemaOptions {
        unevaluatedProperties?: TUnevaluatedProperties;
    }
    export interface TIntersect<T extends TSchema[] = TSchema[]> extends TSchema, IntersectOptions {
        [Kind]: 'Intersect';
        static: TIntersectStatic<T, this['params']>;
        type?: 'object';
        allOf: [...T];
    }
    export interface TIterator<T extends TSchema = TSchema> extends TSchema {
        [Kind]: "Iterator";
        static: IterableIterator<Static<T, this["params"]>>;
        type: "Iterator";
        items: T;
    }
    /** `[JavaScript]` Creates an Iterator type */
    export function Iterator<T extends TSchema>(items: T, options?: SchemaOptions): TIterator<T>;
    export interface TNot<T extends TSchema = TSchema> extends TSchema {
        [Kind]: "Not";
        static: T extends TNot<infer U> ? Static<U> : unknown;
        not: T;
    }
    /** `[Json]` Creates a Not type */
    export function Not<T extends TSchema>(schema: T, options?: SchemaOptions): TNot<T>;
    export interface TPromise<T extends TSchema = TSchema> extends TSchema {
        [Kind]: "Promise";
        static: Promise<Static<T, this["params"]>>;
        type: "Promise";
        item: TSchema;
    }
    /** `[JavaScript]` Creates a Promise type */
    export function _Promise<T extends TSchema>(item: T, options?: SchemaOptions): TPromise<T>;
    export interface BigIntOptions extends SchemaOptions {
        exclusiveMaximum?: bigint;
        exclusiveMinimum?: bigint;
        maximum?: bigint;
        minimum?: bigint;
        multipleOf?: bigint;
    }
    export interface TBigInt extends TSchema, BigIntOptions {
        [Kind]: "BigInt";
        static: bigint;
        type: "bigint";
    }
    /** `[JavaScript]` Creates a BigInt type */
    export function _BigInt(options?: BigIntOptions): TBigInt;
    export interface TBoolean extends TSchema {
        [Kind]: "Boolean";
        static: boolean;
        type: "boolean";
    }
    /** `[Json]` Creates a Boolean type */
    export function _Boolean(options?: SchemaOptions): TBoolean;
    export interface IntegerOptions extends SchemaOptions {
        exclusiveMaximum?: number;
        exclusiveMinimum?: number;
        maximum?: number;
        minimum?: number;
        multipleOf?: number;
    }
    export interface TInteger extends TSchema, IntegerOptions {
        [Kind]: "Integer";
        static: number;
        type: "integer";
    }
    /** `[Json]` Creates an Integer type */
    export function Integer(options?: IntegerOptions): TInteger;
    function FromUnion(syntax: string): IterableIterator<TTemplateLiteralKind>;
    function FromTerminal(syntax: string): IterableIterator<TTemplateLiteralKind>;
    type FromUnionLiteral<T extends string> = T extends `${infer L}|${infer R}` ? [TLiteral<Trim<L>>, ...FromUnionLiteral<R>] : T extends `${infer L}` ? [TLiteral<Trim<L>>] : [
    ];
    type FromUnion<T extends string> = TUnionEvaluated<FromUnionLiteral<T>>;
    type FromTerminal<T extends string> = T extends 'boolean' ? TBoolean : T extends 'bigint' ? TBigInt : T extends 'number' ? TNumber : T extends 'string' ? TString : FromUnion<T>;
    type FromString<T extends string> = T extends `{${infer L}}${infer R}` ? [FromTerminal<L>, ...FromString<R>] : T extends `${infer L}$${infer R}` ? [TLiteral<L>, ...FromString<R>] : T extends `${infer L}` ? [TLiteral<L>] : [
    ];
    export type TTemplateLiteralSyntax<T extends string> = (TTemplateLiteral<Assert<FromString<T>, TTemplateLiteralKind[]>>);
    /** Parses TemplateLiteralSyntax and returns a tuple of TemplateLiteralKinds */
    export function TemplateLiteralSyntax(syntax: string): TTemplateLiteralKind[];
    export class TemplateLiteralParserError extends TypeBoxError {
    }
    export type Expression = ExpressionAnd | ExpressionOr | ExpressionConst;
    export type ExpressionConst = {
        type: "const";
        const: string;
    };
    export type ExpressionAnd = {
        type: "and";
        expr: Expression[];
    };
    export type ExpressionOr = {
        type: "or";
        expr: Expression[];
    };
    /** Parses a pattern and returns an expression tree */
    export function TemplateLiteralParse(pattern: string): Expression;
    /** Parses a pattern and strips forward and trailing ^ and $ */
    export function TemplateLiteralParseExact(pattern: string): Expression;
    export class TemplateLiteralFiniteError extends TypeBoxError {
    }
    type TFromTemplateLiteralKind<T> = T extends TTemplateLiteral<infer U extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<U> : T extends TUnion<infer U extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<U> : T extends TString ? false : T extends TNumber ? false : T extends TInteger ? false : T extends TBigInt ? false : T extends TBoolean ? true : T extends TLiteral ? true : false;
    type TFromTemplateLiteralKinds<T extends TTemplateLiteralKind[]> = T extends [infer L extends TTemplateLiteralKind, ...infer R extends TTemplateLiteralKind[]] ? TFromTemplateLiteralKind<L> extends false ? false : TFromTemplateLiteralKinds<R> : true;
    export function IsTemplateLiteralExpressionFinite(expression: Expression): boolean;
    export type TIsTemplateLiteralFinite<T> = T extends TTemplateLiteral<infer U> ? TFromTemplateLiteralKinds<U> : false;
    /** Returns true if this TemplateLiteral resolves to a finite set of values */
    export function IsTemplateLiteralFinite<T extends TTemplateLiteral>(schema: T): boolean;
    export const PatternBoolean = "(true|false)";
    export const PatternNumber = "(0|[1-9][0-9]*)";
    export const PatternString = "(.*)";
    export const PatternBooleanExact = "^(true|false)$";
    export const PatternNumberExact = "^(0|[1-9][0-9]*)$";
    export const PatternStringExact = "^(.*)$";
    export class TemplateLiteralPatternError extends TypeBoxError {
    }
    export function TemplateLiteralPattern(kinds: TTemplateLiteralKind[]): string;
    type TemplateLiteralStaticKind<T, Acc extends string> = T extends TUnion<infer U> ? {
        [K in keyof U]: TemplateLiteralStatic<Assert<[U[K]], TTemplateLiteralKind[]>, Acc>;
    }[number] : T extends TTemplateLiteral ? `${Static<T>}` : T extends TLiteral<infer U> ? `${U}` : T extends TString ? `${string}` : T extends TNumber ? `${number}` : T extends TBigInt ? `${bigint}` : T extends TBoolean ? `${boolean}` : never;
    type TemplateLiteralStatic<T extends TTemplateLiteralKind[], Acc extends string> = T extends [infer L, ...infer R] ? `${TemplateLiteralStaticKind<L, Acc>}${TemplateLiteralStatic<Assert<R, TTemplateLiteralKind[]>, Acc>}` : Acc;
    export type TTemplateLiteralKind = TTemplateLiteral | TUnion | TLiteral | TInteger | TNumber | TBigInt | TString | TBoolean | TNever;
    export interface TTemplateLiteral<T extends TTemplateLiteralKind[] = TTemplateLiteralKind[]> extends TSchema {
        [Kind]: 'TemplateLiteral';
        static: TemplateLiteralStatic<T, EmptyString>;
        type: 'string';
        pattern: string;
    }
    /** `[Json]` Creates a TemplateLiteral type from template dsl string */
    export function TemplateLiteral<T extends string>(syntax: T, options?: SchemaOptions): TTemplateLiteralSyntax<T>;
    /** `[Json]` Creates a TemplateLiteral type */
    export function TemplateLiteral<T extends TTemplateLiteralKind[]>(kinds: [...T], options?: SchemaOptions): TTemplateLiteral<T>;
    export class TemplateLiteralGenerateError extends TypeBoxError {
    }
    type TStringReduceUnary<L extends string, R extends string[], Acc extends string[] = []> = R extends [infer A extends string, ...infer B extends string[]] ? TStringReduceUnary<L, B, [...Acc, `${L}${A}`]> : Acc;
    type TStringReduceBinary<L extends string[], R extends string[], Acc extends string[] = []> = L extends [infer A extends string, ...infer B extends string[]] ? TStringReduceBinary<B, R, [...Acc, ...TStringReduceUnary<A, R>]> : Acc;
    type TStringReduceMany<T extends string[][]> = T extends [infer L extends string[], infer R extends string[], ...infer Rest extends string[][]] ? TStringReduceMany<[TStringReduceBinary<L, R>, ...Rest]> : T;
    type TStringReduce<T extends string[][], O = TStringReduceMany<T>> = 0 extends keyof O ? Assert<O[0], string[]> : [];
    export function TemplateLiteralExpressionGenerate(expression: Expression): IterableIterator<string>;
    export type TTemplateLiteralGenerate<T extends TTemplateLiteral, F = TIsTemplateLiteralFinite<T>> = F extends true ? (T extends TTemplateLiteral<infer S extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<S> extends infer R extends string[][] ? TStringReduce<R> : [] : []) : [];
    /** Generates a tuple of strings from the given TemplateLiteral. Returns an empty tuple if infinite. */
    export function TemplateLiteralGenerate<T extends TTemplateLiteral>(schema: T): TTemplateLiteralGenerate<T>;
    type TFromTemplateLiteral<T extends TTemplateLiteral, R extends string[] = TTemplateLiteralGenerate<T>> = (R);
    type TFromUnion<T extends TSchema[], Acc extends string[] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TFromUnion<R, [...Acc, ...TIndexPropertyKeys<L>]> : Acc);
    type TFromLiteral<T extends TLiteralValue> = (T extends PropertyKey ? [`${T}`] : []);
    export type TIndexPropertyKeys<T extends TSchema> = (T extends TTemplateLiteral ? TFromTemplateLiteral<T> : T extends TUnion<infer S> ? TFromUnion<S> : T extends TLiteral<infer S> ? TFromLiteral<S> : T extends TNumber ? ['[number]'] : T extends TInteger ? ['[number]'] : [
    ]);
    /** Returns a tuple of PropertyKeys derived from the given TSchema */
    export function IndexPropertyKeys<T extends TSchema>(T: T): TIndexPropertyKeys<T>;
    export interface TRegExp extends TSchema {
        [Kind]: "RegExp";
        static: `${string}`;
        type: "RegExp";
        source: string;
        flags: string;
    }
    /** `[JavaScript]` Creates a RegExp type */
    export function RegExp(pattern: string, options?: SchemaOptions): TRegExp;
    /** `[JavaScript]` Creates a RegExp type */
    export function RegExp(regex: RegExp, options?: SchemaOptions): TRegExp;
    type TFromTemplateLiteralKeyInfinite<K extends TTemplateLiteral, T extends TSchema> = Ensure<TRecord<K, T>>;
    type TFromTemplateLiteralKeyFinite<K extends TTemplateLiteral, T extends TSchema, I extends string = Static<K>> = (Ensure<TObject<Evaluate<{
        [_ in I]: T;
    }>>>);
    type TFromTemplateLiteralKey<K extends TTemplateLiteral, T extends TSchema> = TIsTemplateLiteralFinite<K> extends false ? TFromTemplateLiteralKeyInfinite<K, T> : TFromTemplateLiteralKeyFinite<K, T>;
    type TFromEnumKey<K extends Record<string, string | number>, T extends TSchema> = Ensure<TObject<{
        [_ in K[keyof K]]: T;
    }>>;
    type TFromUnionKeyLiteralString<K extends TLiteral<string>, T extends TSchema> = {
        [_ in K['const']]: T;
    };
    type TFromUnionKeyLiteralNumber<K extends TLiteral<number>, T extends TSchema> = {
        [_ in K['const']]: T;
    };
    type TFromUnionKeyRest<K extends TSchema[], T extends TSchema> = K extends [infer L extends TSchema, ...infer R extends TSchema[]] ? (L extends TUnion<infer S> ? TFromUnionKeyRest<S, T> & TFromUnionKeyRest<R, T> : L extends TLiteral<string> ? TFromUnionKeyLiteralString<L, T> & TFromUnionKeyRest<R, T> : L extends TLiteral<number> ? TFromUnionKeyLiteralNumber<L, T> & TFromUnionKeyRest<R, T> : {}) : {};
    type TFromUnionKey<K extends TSchema[], T extends TSchema, P extends TProperties = TFromUnionKeyRest<K, T>> = (Ensure<TObject<Evaluate<P>>>);
    type TFromLiteralKey<K extends TLiteralValue, T extends TSchema> = (Ensure<TObject<{
        [_ in Assert<K, PropertyKey>]: T;
    }>>);
    type TFromRegExpKey<_ extends TRegExp, T extends TSchema> = (Ensure<TRecord<TRegExp, T>>);
    type TFromStringKey<_ extends TString, T extends TSchema> = (Ensure<TRecord<TString, T>>);
    type TFromIntegerKey<_ extends TSchema, T extends TSchema> = (Ensure<TRecord<TNumber, T>>);
    type TFromNumberKey<_ extends TSchema, T extends TSchema> = (Ensure<TRecord<TNumber, T>>);
    type RecordStatic<K extends TSchema, T extends TSchema, P extends unknown[]> = (Evaluate<Record<Assert<Static<K>, PropertyKey>, Static<T, P>>>);
    export interface TRecord<K extends TSchema = TSchema, T extends TSchema = TSchema> extends TSchema {
        [Kind]: 'Record';
        static: RecordStatic<K, T, this['params']>;
        type: 'object';
        patternProperties: {
            [pattern: string]: T;
        };
        additionalProperties: TAdditionalProperties;
    }
    export type TRecordOrObject<K extends TSchema, T extends TSchema> = K extends TTemplateLiteral ? TFromTemplateLiteralKey<K, T> : K extends TEnum<infer S> ? TFromEnumKey<S, T> : K extends TUnion<infer S> ? TFromUnionKey<S, T> : K extends TLiteral<infer S> ? TFromLiteralKey<S, T> : K extends TInteger ? TFromIntegerKey<K, T> : K extends TNumber ? TFromNumberKey<K, T> : K extends TRegExp ? TFromRegExpKey<K, T> : K extends TString ? TFromStringKey<K, T> : TNever;
    /** `[Json]` Creates a Record type */
    export function Record<K extends TSchema, T extends TSchema>(K: K, T: T, options?: ObjectOptions): TRecordOrObject<K, T>;
    export interface TThis extends TSchema {
        [Kind]: "This";
        static: this["params"][0];
        $ref: string;
    }
    type RecursiveStatic<T extends TSchema> = Static<T, [RecursiveStatic<T>]>;
    export interface TRecursive<T extends TSchema> extends TSchema {
        [Hint]: "Recursive";
        static: RecursiveStatic<T>;
    }
    /** `[Json]` Creates a Recursive type */
    export function Recursive<T extends TSchema>(callback: (thisType: TThis) => T, options?: SchemaOptions): TRecursive<T>;
    export interface TRef<T extends TSchema = TSchema> extends TSchema {
        [Kind]: "Ref";
        static: Static<T, this["params"]>;
        $ref: string;
    }
    /** `[Json]` Creates a Ref type. The referenced type must contain a $id */
    export function Ref<T extends TSchema>(schema: T, options?: SchemaOptions): TRef<T>;
    /** `[Json]` Creates a Ref type. */
    export function Ref<T extends TSchema>($ref: string, options?: SchemaOptions): TRef<T>;
    type TupleStatic<T extends TSchema[], P extends unknown[], Acc extends unknown[] = []> = T extends [
        infer L extends TSchema,
        ...infer R extends TSchema[]
    ] ? TupleStatic<R, P, [...Acc, Static<L, P>]> : Acc;
    export interface TTuple<T extends TSchema[] = TSchema[]> extends TSchema {
        [Kind]: "Tuple";
        static: TupleStatic<T, this["params"]>;
        type: "array";
        items?: T;
        additionalItems?: false;
        minItems: number;
        maxItems: number;
    }
    /** `[Json]` Creates a Tuple type */
    export function Tuple<T extends TSchema[]>(items: [...T], options?: SchemaOptions): TTuple<T>;
    export type DecodeProperties<T extends TProperties> = {
        [K in keyof T]: DecodeType<T[K]>;
    };
    export type DecodeRest<T extends TSchema[], Acc extends TSchema[] = []> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? DecodeRest<R, [...Acc, DecodeType<L>]> : Acc;
    export type DecodeType<T extends TSchema> = (T extends TOptional<infer S extends TSchema> ? TOptional<DecodeType<S>> : T extends TReadonly<infer S extends TSchema> ? TReadonly<DecodeType<S>> : T extends TTransform<infer _, infer R> ? TUnsafe<R> : T extends TArray<infer S extends TSchema> ? TArray<DecodeType<S>> : T extends TAsyncIterator<infer S extends TSchema> ? TAsyncIterator<DecodeType<S>> : T extends TConstructor<infer P extends TSchema[], infer R extends TSchema> ? TConstructor<DecodeRest<P>, DecodeType<R>> : T extends TEnum<infer S> ? TEnum<S> : T extends TFunction<infer P extends TSchema[], infer R extends TSchema> ? TFunction<DecodeRest<P>, DecodeType<R>> : T extends TIntersect<infer S extends TSchema[]> ? TIntersect<DecodeRest<S>> : T extends TIterator<infer S extends TSchema> ? TIterator<DecodeType<S>> : T extends TNot<infer S extends TSchema> ? TNot<DecodeType<S>> : T extends TObject<infer S> ? TObject<Evaluate<DecodeProperties<S>>> : T extends TPromise<infer S extends TSchema> ? TPromise<DecodeType<S>> : T extends TRecord<infer K, infer S> ? TRecord<K, DecodeType<S>> : T extends TRecursive<infer S extends TSchema> ? TRecursive<DecodeType<S>> : T extends TRef<infer S extends TSchema> ? TRef<DecodeType<S>> : T extends TTuple<infer S extends TSchema[]> ? TTuple<DecodeRest<S>> : T extends TUnion<infer S extends TSchema[]> ? TUnion<DecodeRest<S>> : T);
    /** Creates an decoded static type from a TypeBox type */
    export type StaticDecode<T extends TSchema, P extends unknown[] = []> = Static<DecodeType<T>, P>;
    /** Creates an encoded static type from a TypeBox type */
    export type StaticEncode<T extends TSchema, P extends unknown[] = []> = Static<T, P>;
    /** Creates a static type from a TypeBox type */
    export type Static<T extends TSchema, P extends unknown[] = []> = (T & {
        params: P;
    })["static"];
    export interface TAny extends TSchema {
        [Kind]: "Any";
        static: any;
    }
    /** `[Json]` Creates an Any type */
    export function Any(options?: SchemaOptions): TAny;
    export interface TUnknown extends TSchema {
        [Kind]: "Unknown";
        static: unknown;
    }
    /** `[Json]` Creates an Unknown type */
    export function Unknown(options?: SchemaOptions): TUnknown;
    /** `[JavaScript]` Creates a Symbol type */
    export interface Uint8ArrayOptions extends SchemaOptions {
        maxByteLength?: number;
        minByteLength?: number;
    }
    export interface TUint8Array extends TSchema, Uint8ArrayOptions {
        [Kind]: "Uint8Array";
        static: Uint8Array;
        type: "uint8array";
    }
    /** `[JavaScript]` Creates a Uint8Array type */
    export function _Uint8Array(options?: Uint8ArrayOptions): TUint8Array;
    export interface TNull extends TSchema {
        [Kind]: "Null";
        static: null;
        type: "null";
    }
    /** `[Json]` Creates a Null type */
    export function Null(options?: SchemaOptions): TNull;
    export interface DateOptions extends SchemaOptions {
        /** The exclusive maximum timestamp value */
        exclusiveMaximumTimestamp?: number;
        /** The exclusive minimum timestamp value */
        exclusiveMinimumTimestamp?: number;
        /** The maximum timestamp value */
        maximumTimestamp?: number;
        /** The minimum timestamp value */
        minimumTimestamp?: number;
        /** The multiple of timestamp value */
        multipleOfTimestamp?: number;
    }
    export interface TDate extends TSchema, DateOptions {
        [Kind]: "Date";
        static: Date;
        type: "date";
    }
    /** `[JavaScript]` Creates a Date type */
    export function _Date(options?: DateOptions): TDate;
    type TFromProperties<P extends TProperties, F extends boolean> = ({
        [K2 in keyof P]: TOptionalWithFlag<P[K2], F>;
    });
    type TFromMappedResult<R extends TMappedResult, F extends boolean> = (TFromProperties<R['properties'], F>);
    export type TOptionalFromMappedResult<R extends TMappedResult, F extends boolean, P extends TProperties = TFromMappedResult<R, F>> = (TMappedResult<P>);
    export function OptionalFromMappedResult<R extends TMappedResult, F extends boolean, P extends TProperties = TFromMappedResult<R, F>>(R: R, F: F): TMappedResult<P>;
    export interface TMappedResult<T extends TProperties = TProperties> extends TSchema {
        [Kind]: "MappedResult";
        properties: T;
        static: unknown;
    }
    export function MappedResult<T extends TProperties>(properties: T): TMappedResult<T>;
    export function Discard(value: Record<PropertyKey, any>, keys: PropertyKey[]): Record<PropertyKey, any>;
    type TRemoveOptional<T extends TSchema> = T extends TOptional<infer S> ? S : T;
    type TAddOptional<T extends TSchema> = T extends TOptional<infer S> ? TOptional<S> : Ensure<TOptional<T>>;
    export type TOptionalWithFlag<T extends TSchema, F extends boolean> = F extends false ? TRemoveOptional<T> : TAddOptional<T>;
    export type TOptional<T extends TSchema> = T & {
        [OptionalKind]: "Optional";
    };
    /** `[Json]` Creates a Optional property */
    export function Optional<T extends TMappedResult, F extends boolean>(schema: T, enable: F): TOptionalFromMappedResult<T, F>;
    /** `[Json]` Creates a Optional property */
    export function Optional<T extends TSchema, F extends boolean>(schema: T, enable: F): TOptionalWithFlag<T, F>;
    /** `[Json]` Creates a Optional property */
    export function Optional<T extends TMappedResult>(schema: T): TOptionalFromMappedResult<T, true>;
    /** `[Json]` Creates a Optional property */
    export function Optional<T extends TSchema>(schema: T): TOptionalWithFlag<T, true>;
    export interface TUndefined extends TSchema {
        [Kind]: "Undefined";
        static: undefined;
        type: "undefined";
    }
    /** `[JavaScript]` Creates a Undefined type */
    export function Undefined(options?: SchemaOptions): TUndefined;
    export interface TVoid extends TSchema {
        [Kind]: "Void";
        static: void;
        type: "void";
    }
    /** `[JavaScript]` Creates a Void type */
    export function Void(options?: SchemaOptions): TVoid;
    export class TypeGuardUnknownTypeError extends TypeBoxError {
    }
    /** Returns true if this value has a Readonly symbol */
    export function IsReadonly<T extends TSchema>(value: T): value is TReadonly<T>;
    /** Returns true if this value has a Optional symbol */
    export function IsOptional<T extends TSchema>(value: T): value is TOptional<T>;
    /** Returns true if the given value is TAny */
    export function IsAny(value: unknown): value is TAny;
    /** Returns true if the given value is TArray */
    export function IsArray(value: unknown): value is TArray;
    /** Returns true if the given value is TAsyncIterator */
    export function IsAsyncIterator(value: unknown): value is TAsyncIterator;
    /** Returns true if the given value is TBigInt */
    export function IsBigInt(value: unknown): value is TBigInt;
    /** Returns true if the given value is TBoolean */
    export function IsBoolean(value: unknown): value is TBoolean;
    /** Returns true if the given value is TConstructor */
    export function IsConstructor(value: unknown): value is TConstructor;
    /** Returns true if the given value is TDate */
    export function IsDate(value: unknown): value is TDate;
    /** Returns true if the given value is TFunction */
    export function IsFunction(value: unknown): value is TFunction;
    /** Returns true if the given value is TInteger */
    export function IsInteger(value: unknown): value is TInteger;
    /** Returns true if the given schema is TProperties */
    export function IsProperties(value: unknown): value is TProperties;
    /** Returns true if the given value is TIntersect */
    export function IsIntersect(value: unknown): value is TIntersect;
    /** Returns true if the given value is TIterator */
    export function IsIterator(value: unknown): value is TIterator;
    /** Returns true if the given value is a TKind with the given name. */
    export function IsKindOf<T extends string>(value: unknown, kind: T): value is Record<PropertyKey, unknown> & {
        [Kind]: T;
    };
    /** Returns true if the given value is TLiteral<string> */
    export function IsLiteralString(value: unknown): value is TLiteral<string>;
    /** Returns true if the given value is TLiteral<number> */
    export function IsLiteralNumber(value: unknown): value is TLiteral<number>;
    /** Returns true if the given value is TLiteral<boolean> */
    export function IsLiteralBoolean(value: unknown): value is TLiteral<boolean>;
    /** Returns true if the given value is TLiteral */
    export function IsLiteral(value: unknown): value is TLiteral;
    /** Returns true if the given value is a TLiteralValue */
    export function IsLiteralValue(value: unknown): value is TLiteralValue;
    /** Returns true if the given value is a TMappedKey */
    export function IsMappedKey(value: unknown): value is TMappedKey;
    /** Returns true if the given value is TMappedResult */
    export function IsMappedResult(value: unknown): value is TMappedResult;
    /** Returns true if the given value is TNever */
    export function IsNever(value: unknown): value is TNever;
    /** Returns true if the given value is TNot */
    export function IsNot(value: unknown): value is TNot;
    /** Returns true if the given value is TNull */
    export function IsNull(value: unknown): value is TNull;
    /** Returns true if the given value is TNumber */
    export function IsNumber(value: unknown): value is TNumber;
    /** Returns true if the given value is TObject */
    export function IsObject(value: unknown): value is TObject;
    /** Returns true if the given value is TPromise */
    export function IsPromise(value: unknown): value is TPromise;
    /** Returns true if the given value is TRecord */
    export function IsRecord(value: unknown): value is TRecord;
    /** Returns true if this value is TRecursive */
    export function IsRecursive(value: unknown): value is {
        [Hint]: "Recursive";
    };
    /** Returns true if the given value is TRef */
    export function IsRef(value: unknown): value is TRef;
    /** Returns true if the given value is TRegExp */
    export function IsRegExp(value: unknown): value is TRegExp;
    /** Returns true if the given value is TString */
    export function IsString(value: unknown): value is TString;
    /** Returns true if the given value is TSymbol */
    export function IsSymbol(value: unknown): value is Symbol;
    /** Returns true if the given value is TTemplateLiteral */
    export function IsTemplateLiteral(value: unknown): value is TTemplateLiteral<TTemplateLiteralKind[]>;
    /** Returns true if the given value is TThis */
    export function IsThis(value: unknown): value is TThis;
    /** Returns true of this value is TTransform */
    export function IsTransform(value: unknown): value is {
        [TransformKind]: TransformOptions;
    };
    /** Returns true if the given value is TTuple */
    export function IsTuple(value: unknown): value is TTuple;
    /** Returns true if the given value is TUndefined */
    export function IsUndefined(value: unknown): value is TUndefined;
    /** Returns true if the given value is TUnion<Literal<string | number>[]> */
    export function IsUnionLiteral(value: unknown): value is TUnion<TLiteral[]>;
    /** Returns true if the given value is TUnion */
    export function IsUnion(value: unknown): value is TUnion;
    /** Returns true if the given value is TUint8Array */
    export function IsUint8Array(value: unknown): value is TUint8Array;
    /** Returns true if the given value is TUnknown */
    export function IsUnknown(value: unknown): value is TUnknown;
    /** Returns true if the given value is a raw TUnsafe */
    export function IsUnsafe(value: unknown): value is TUnsafe<unknown>;
    /** Returns true if the given value is TVoid */
    export function IsVoid(value: unknown): value is TVoid;
    /** Returns true if the given value is TKind */
    export function IsKind(value: unknown): value is Record<PropertyKey, unknown> & {
        [Kind]: string;
    };
    /** Returns true if the given value is TSchema */
    export function IsSchema(value: unknown): value is TSchema;
    /** `[Json]` Omits compositing symbols from this schema. */
    export function Strict<T extends TSchema>(schema: T): T;
    export type ObjectType = Record<PropertyKey, unknown>;
    export function HasPropertyKey<K extends PropertyKey>(value: Record<any, unknown>, key: K): value is ObjectType & Record<K, unknown>;
    export class ValueCreateError extends TypeBoxError {
        readonly schema: TSchema;
        constructor(schema: TSchema, message: string);
    }
    function FromString(schema: TString, references: TSchema[]): any;
    /** Creates a value from the given schema and references */
    export function Create<T extends TSchema>(schema: T, references: TSchema[]): Static<T>;
    /** Creates a value from the given schema */
    export function Create<T extends TSchema>(schema: T): Static<T>;
    /**
    if (import.meta.env.NODE_ENV === "test") {
      await tests();
    }
    async function tests() {
      const { describe, expect, it } = await import("bun:test");
      describe("value/create/Date", () => {
        it("Should create value", () => {
          const T = v.date();
          const A = Create(T);
          const B = new Date();
          expect(B).toEqual(A);
        });
      });
      describe("value/create/literal", () => {
        it("Should create value", () => {
          const A = v.literal("HELLO");
          const B = Create(A);
          expect(B).toEqual("HELLO");
        });
      });
    }
    
    // it('Should create default', () => {
    //   const T = Type.Date({ default: new Date(1001) })
    //   const A = Value.Create(T)
    //   const B = new Date(1001)
    //   expect(T).toEqual(A)
    // })
    // it('Should create value nested', () => {
    //   const T = Type.Object({ value: Type.Date() })
    //   const A = Value.Create(T)
    //   const B = { value: new Date() }
    //   Assert.InRange(A.value.getTime(), B.value.getTime(), 1000)
    // })
    // it('Should create default nested', () => {
    //   const T = Type.Object({ value: Type.Date({ default: new Date(1001) }) })
    //   const A = Value.Create(T)
    //   const B = { value: new Date(1001) }
    //   Assert.IsEqual(A, B)
    // })
    */
    export const v: {
        object: typeof _Object;
        array: typeof _Array;
        string: typeof String;
        number: NumberConstructor;
        date: typeof _Date;
        literal: typeof Literal;
        record: typeof Record;
        boolean: typeof _Boolean;
        bool: typeof _Boolean;
        optional: typeof Optional;
        func: typeof Function;
        union: typeof Union;
        nul: typeof Null;
        any: typeof Any;
        promise: typeof _Promise;
        void: typeof Void;
        strict: typeof Strict;
        enum: typeof Enum;
        never: typeof Never;
    };
}
declare module "apps/main/index" { }
