
/*--------------------------------------------------------------------------
@sinclair/typebox/type

The MIT License (MIT)

Copyright (c) 2017-2023 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/
//#region [ /Users/paulvu/v/pkgs/typebox/src/type/error/error.ts ]
/** The base Error type thrown for all TypeBox exceptions  */
export class TypeBoxError extends Error {
  constructor(message: string) {
    super(message);
  }
}

//#endregion
//#region [/src/type/symbols/symbols.ts]
/** Symbol key applied to transform types */
export const TransformKind = Symbol.for("TypeBox.Transform");
/** Symbol key applied to readonly types */
export const ReadonlyKind = Symbol.for("TypeBox.Readonly");
/** Symbol key applied to optional types */
export const OptionalKind = Symbol.for("TypeBox.Optional");
/** Symbol key applied to types */
export const Hint = Symbol.for("TypeBox.Hint");
/** Symbol key applied to types */
export const Kind = Symbol.for("TypeBox.Kind");
//#endregion

//#region [/src/type/schema/schema.ts]
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
//#endregion

//#region [ /src/type/string/string.ts ]
export type StringFormatOption =
  | "date-time"
  | "time"
  | "date"
  | "email"
  | "idn-email"
  | "hostname"
  | "idn-hostname"
  | "ipv4"
  | "ipv6"
  | "uri"
  | "uri-reference"
  | "iri"
  | "uuid"
  | "iri-reference"
  | "uri-template"
  | "json-pointer"
  | "relative-json-pointer"
  | "regex"
  | ({} & string);
// prettier-ignore
export type StringContentEncodingOption =
  | '7bit'
  | '8bit'
  | 'binary'
  | 'quoted-printable'
  | 'base64'
  | ({} & string)
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
export function String(options: StringOptions = {}): TString {
  return { ...options, [Kind]: "String", type: "string" } as unknown as TString;
}

//#endregion

//#region [ /src/type/number/number.ts ]
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
export function _Number(options: NumberOptions = {}): TNumber {
  return {
    ...options,
    [Kind]: "Number",
    type: "number",
  } as unknown as TNumber;
}

//#endregion

//#region [ PATH ]
/** Clones a Rest */
export function CloneRest<T extends TSchema[]>(schemas: T): T {
  return schemas.map(schema => CloneType(schema)) as T;
}
/** Clones a Type */
export function CloneType<T extends TSchema>(schema: T, options: SchemaOptions = {}): T {
  return { ...Clone(schema), ...options };
}
//#endregion

//#region [ PATH ]
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
export function _Array<T extends TSchema>(schema: T, options: ArrayOptions = {}): TArray<T> {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema),
  } as unknown as TArray<T>;
}

//#endregion

//#region [ PATH ] MODIFIED // note: we can turn default exports to regular named export and enclose all functions  for reuse within same file
export const ValueGuard = {
  IsAsyncIterator(value: unknown): value is AsyncIterableIterator<unknown> {
    return IsObject(value) && !IsArray(value) && !IsUint8Array(value) && Symbol.asyncIterator in value;
  },
  /** Returns true if this value is an array */
  IsArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  },
  /** Returns true if this value is bigint */
  IsBigInt(value: unknown): value is bigint {
    return typeof value === "bigint";
  },
  /** Returns true if this value is a boolean */
  IsBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
  },
  /** Returns true if this value is a Date object */
  IsDate(value: unknown): value is Date {
    return value instanceof globalThis.Date;
  },
  /** Returns true if this value is a function */
  IsFunction(value: unknown): value is Function {
    return typeof value === "function";
  },
  /** Returns true if this value is an iterator */
  IsIterator(value: unknown): value is IterableIterator<unknown> {
    return IsObject(value) && !IsArray(value) && !IsUint8Array(value) && Symbol.iterator in value;
  },
  /** Returns true if this value is null */
  IsNull(value: unknown): value is null {
    return value === null;
  },
  /** Returns true if this value is number */
  IsNumber(value: unknown): value is number {
    return typeof value === "number";
  },
  /** Returns true if this value is an object */
  IsObject(value: unknown): value is Record<PropertyKey, unknown> {
    return typeof value === "object" && value !== null;
  },
  /** Returns true if this value is RegExp */
  IsRegExp(value: unknown): value is RegExp {
    return value instanceof globalThis.RegExp;
  },
  /** Returns true if this value is string */
  IsString(value: unknown): value is string {
    return typeof value === "string";
  },
  /** Returns true if this value is symbol */
  IsSymbol(value: unknown): value is symbol {
    return typeof value === "symbol";
  },
  /** Returns true if this value is a Uint8Array */
  IsUint8Array(value: unknown): value is Uint8Array {
    return value instanceof globalThis.Uint8Array;
  },
  /** Returns true if this value is undefined */
  IsUndefined(value: unknown): value is undefined {
    return value === undefined;
  },
};
//#endregion

//#region [ pkgs/typebox/src/type/clone/value.ts ] MODIFIED ADDED_TS_IGNORE
function ArrayType(value: unknown[]) {
  return (value as any).map((value: unknown) => Visit(value as any));
}
function DateType(value: Date) {
  //@ts-ignore
  return new Date(value.getTime());
}
function Uint8ArrayType(value: Uint8Array) {
  ///@ts-ignore
  return new Uint8Array(value);
}
function RegExpType(value: RegExp) {
  //@ts-ignore
  return new RegExp(value.source, value.flags);
}
function ObjectType(value: Record<keyof any, unknown>) {
  const clonedProperties = Object.getOwnPropertyNames(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
  const clonedSymbols = Object.getOwnPropertySymbols(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key as any]) }), {});
  return { ...clonedProperties, ...clonedSymbols };
}
// prettier-ignore
function Visit(value: unknown): any {
      return (
        ValueGuard.IsArray(value) ? ArrayType(value) : 
        ValueGuard.IsDate(value) ? DateType(value) : 
        ValueGuard.IsUint8Array(value) ? Uint8ArrayType(value) : 
        ValueGuard.IsRegExp(value) ? RegExpType(value) :
        ValueGuard.IsObject(value) ? ObjectType(value) : 
        value
      )
    }
/** Clones a value */
export function Clone<T>(value: T): T {
  return Visit(value);
}

//#endregion

//#region [ /Users/paulvu/v/pkgs/typebox/src/type/mapped/mapped-key.ts ]
export interface TMappedKey<T extends PropertyKey[] = PropertyKey[]> extends TSchema {
  [Kind]: "MappedKey";
  static: T[number];
  keys: T;
}
// prettier-ignore
export function MappedKey<T extends PropertyKey[]>(T: [...T]): TMappedKey<T> {
    return {
      [Kind]: 'MappedKey',
      keys: T
    } as unknown as TMappedKey<T> 
  }

//#endregion

//#region [PATH]
// ------------------------------------------------------------------
// FromProperties
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// FromMappedResult
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// ReadonlyFromMappedResult
// ------------------------------------------------------------------
// prettier-ignore
export type TReadonlyFromMappedResult<
  R extends TMappedResult,
  F extends boolean,
  P extends TProperties = TFromMappedResult<R, F>
> = (
  TMappedResult<P>
)
// prettier-ignore
export function ReadonlyFromMappedResult<
  R extends TMappedResult,
  F extends boolean,
  P extends TProperties = TFromMappedResult<R, F>
>(R: R, F: F): TMappedResult<P> {
  const P = FromMappedResult(R, F) as unknown as P
  return MappedResult(P) 
}

//#endregion
//#region [PATH]
// ------------------------------------------------------------------
// RemoveReadonly
// ------------------------------------------------------------------
type TRemoveReadonly<T extends TSchema> = T extends TReadonly<infer S> ? S : T;
function RemoveReadonly<T extends TSchema>(schema: T) {
  return Discard(CloneType(schema), [ReadonlyKind]);
}
// ------------------------------------------------------------------
// AddReadonly
// ------------------------------------------------------------------
type TAddReadonly<T extends TSchema> = T extends TReadonly<infer S> ? TReadonly<S> : Ensure<TReadonly<T>>;
function AddReadonly<T extends TSchema>(schema: T) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
}
// prettier-ignore
export type TReadonlyWithFlag<T extends TSchema, F extends boolean> = 
  F extends false 
    ? TRemoveReadonly<T> 
    : TAddReadonly<T>
// prettier-ignore
function ReadonlyWithFlag<T extends TSchema, F extends boolean>(schema: T, F: F) {
  return (
    F === false
      ? RemoveReadonly(schema)
      : AddReadonly(schema)
  )
}

// ------------------------------------------------------------------
// TReadonly
// ------------------------------------------------------------------
export type TReadonly<T extends TSchema> = T & { [ReadonlyKind]: "Readonly" };

/** `[Json]` Creates a Readonly property */
export function Readonly<T extends TMappedResult, F extends boolean>(schema: T, enable: F): TReadonlyFromMappedResult<T, F>;
/** `[Json]` Creates a Readonly property */
export function Readonly<T extends TSchema, F extends boolean>(schema: T, enable: F): TReadonlyWithFlag<T, F>;
/** `[Json]` Creates a Readonly property */
export function Readonly<T extends TMappedResult>(schema: T): TReadonlyFromMappedResult<T, true>;
/** `[Json]` Creates a Readonly property */
export function Readonly<T extends TSchema>(schema: T): TReadonlyWithFlag<T, true>;
/** `[Json]` Creates a Readonly property */
export function Readonly(schema: TSchema, enable?: boolean): any {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

//#endregion

//#region [/src/type/object/object.ts]  EXTRACTED MODIFIED_OBJECT
// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// ObjectStatic
// ------------------------------------------------------------------
type ReadonlyOptionalPropertyKeys<T extends TProperties> = {
  [K in keyof T]: T[K] extends TReadonly<TSchema> ? (T[K] extends TOptional<T[K]> ? K : never) : never;
}[keyof T];
type ReadonlyPropertyKeys<T extends TProperties> = {
  [K in keyof T]: T[K] extends TReadonly<TSchema> ? (T[K] extends TOptional<T[K]> ? never : K) : never;
}[keyof T];
type OptionalPropertyKeys<T extends TProperties> = {
  [K in keyof T]: T[K] extends TOptional<TSchema> ? (T[K] extends TReadonly<T[K]> ? never : K) : never;
}[keyof T];
type RequiredPropertyKeys<T extends TProperties> = keyof Omit<
  T,
  ReadonlyOptionalPropertyKeys<T> | ReadonlyPropertyKeys<T> | OptionalPropertyKeys<T>
>;

// prettier-ignore
type ObjectStaticProperties<T extends TProperties, R extends Record<keyof any, unknown>> = Evaluate<(
  Readonly<Partial<Pick<R, ReadonlyOptionalPropertyKeys<T>>>> &
  Readonly<Pick<R, ReadonlyPropertyKeys<T>>> &
  Partial<Pick<R, OptionalPropertyKeys<T>>> &
  Required<Pick<R, RequiredPropertyKeys<T>>>
)>
// prettier-ignore
type ObjectStatic<T extends TProperties, P extends unknown[]> = ObjectStaticProperties<T, {
  [K in keyof T]: Static<T[K], P>
}>
// ------------------------------------------------------------------
// TProperties
// ------------------------------------------------------------------
export type TPropertyKey = string | number; // Consider making this PropertyKey
export type TProperties = Record<TPropertyKey, TSchema>;
// ------------------------------------------------------------------
// TObject
// ------------------------------------------------------------------
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
export function _Object<T extends TProperties>(properties: T, options: ObjectOptions = {}): TObject<T> {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter(key => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter(name => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties)
    ? { additionalProperties: CloneType(options.additionalProperties) }
    : {};
  const clonedProperties = propertyKeys.reduce((acc, key) => ({ ...acc, [key]: CloneType(properties[key]) }), {} as TProperties);
  return (requiredKeys.length > 0
    ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys }
    : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties }) as unknown as TObject<T>;
}

/** `[Json]` Creates an Object type */
// export const Object = _Object;

//#endregion

//#region [ /src/type/helpers/helpers.ts ]
// ------------------------------------------------------------------
// Helper: Common
// ------------------------------------------------------------------
export type TupleToIntersect<T extends any[]> = T extends [infer I] ? I : T extends [infer I, ...infer R] ? I & TupleToIntersect<R> : never;
export type TupleToUnion<T extends any[]> = { [K in keyof T]: T[K] }[number];
export type UnionToIntersect<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never;
export type UnionLast<U> = UnionToIntersect<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never;
export type UnionToTuple<U, Acc extends unknown[] = [], R = UnionLast<U>> = [U] extends [never]
  ? Acc
  : UnionToTuple<Exclude<U, R>, [Extract<U, R>, ...Acc]>;
export type Trim<T> = T extends `${" "}${infer U}` ? Trim<U> : T extends `${infer U}${" "}` ? Trim<U> : T;
export type Assert<T, E> = T extends E ? T : never;
export type Evaluate<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type Ensure<T> = T extends infer U ? U : never;
export type EmptyString = "";
export type ZeroString = "0";
// ------------------------------------------------------------------
// Helper: Increment
// ------------------------------------------------------------------
type IncrementBase = { m: "9"; t: "01"; "0": "1"; "1": "2"; "2": "3"; "3": "4"; "4": "5"; "5": "6"; "6": "7"; "7": "8"; "8": "9"; "9": "0" };
type IncrementTake<T extends keyof IncrementBase> = IncrementBase[T];
type IncrementStep<T extends string> = T extends IncrementBase["m"]
  ? IncrementBase["t"]
  : T extends `${infer L extends keyof IncrementBase}${infer R}`
  ? L extends IncrementBase["m"]
    ? `${IncrementTake<L>}${IncrementStep<R>}`
    : `${IncrementTake<L>}${R}`
  : never;
type IncrementReverse<T extends string> = T extends `${infer L}${infer R}` ? `${IncrementReverse<R>}${L}` : T;
export type Increment<T extends string> = IncrementReverse<IncrementStep<IncrementReverse<T>>>;
/** Increments the given string value + 1 */
export function Increment<T extends string>(T: T): Increment<T> {
  return (parseInt(T) + 1).toString() as Increment<T>;
}
// ------------------------------------------------------------------
// Helper: Type Asserts
// ------------------------------------------------------------------
export type AssertProperties<T> = T extends TProperties ? T : TProperties;
export type AssertRest<T, E extends TSchema[] = TSchema[]> = T extends E ? T : [];
export type AssertType<T, E extends TSchema = TSchema> = T extends E ? T : TNever;

//#endregion

//#region [ /src/type/never/never.ts ]
export interface TNever extends TSchema {
  [Kind]: "Never";
  static: never;
  not: {};
}
/** `[Json]` Creates a Never type */
export function Never(options: SchemaOptions = {}): TNever {
  return {
    ...options,
    [Kind]: "Never",
    not: {},
  } as unknown as TNever;
}

//#endregion

//#region [ /Users/paulvu/v/pkgs/typebox/src/type/transform/transform.ts ]
// ------------------------------------------------------------------
// TransformBuilders
// ------------------------------------------------------------------
export class TransformDecodeBuilder<T extends TSchema> {
  constructor(private readonly schema: T) {}
  public Decode<U extends unknown, D extends TransformFunction<StaticDecode<T>, U>>(decode: D): TransformEncodeBuilder<T, D> {
    return new TransformEncodeBuilder(this.schema, decode);
  }
}
// prettier-ignore
export class TransformEncodeBuilder<T extends TSchema, D extends TransformFunction> {
    constructor(private readonly schema: T, private readonly decode: D) { }
    private EncodeTransform<E extends TransformFunction<ReturnType<D>, StaticDecode<T>>>(encode: E, schema: TTransform) {
      const Encode = (value: unknown) => schema[TransformKind as any].Encode(encode(value as any))
      const Decode = (value: unknown) => this.decode(schema[TransformKind as any].Decode(value))
      const Codec = { Encode: Encode, Decode: Decode }
      return { ...schema, [TransformKind]: Codec }
    }
    private EncodeSchema<E extends TransformFunction<ReturnType<D>, StaticDecode<T>>>(encode: E, schema: TSchema) {
      const Codec = { Decode: this.decode, Encode: encode }
      return { ...schema as TSchema, [TransformKind]: Codec }
    }
    public Encode<E extends TransformFunction<ReturnType<D>, StaticDecode<T>>>(encode: E): TTransform<T, ReturnType<D>> {
      const schema = CloneType(this.schema)
      return (
        IsTransform(schema) ? this.EncodeTransform(encode, schema): this.EncodeSchema(encode, schema)
      ) as unknown as TTransform<T, ReturnType<D>>
    }
  }
// ------------------------------------------------------------------
// TransformStatic
// ------------------------------------------------------------------
type TransformStatic<T extends TSchema, P extends unknown[] = []> = T extends TTransform<infer _, infer S> ? S : Static<T, P>;
// ------------------------------------------------------------------
// TTransform
// ------------------------------------------------------------------
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
export function Transform<I extends TSchema>(schema: I): TransformDecodeBuilder<I> {
  return new TransformDecodeBuilder(schema);
}

//#endregion

//#region [/Users/paulvu/v/pkgs/typebox/src/type/unsafe/unsafe.ts]
export interface UnsafeOptions extends SchemaOptions {
  [Kind]?: string;
}
export interface TUnsafe<T> extends TSchema {
  [Kind]: string;
  static: T;
}
/** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
export function Unsafe<T>(options: UnsafeOptions = {}): TUnsafe<T> {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe",
  } as unknown as TUnsafe<T>;
}

//#endregion
//#region [/Users/paulvu/v/pkgs/typebox/src/type/async-iterator/async-iterator.ts]
export interface TAsyncIterator<T extends TSchema = TSchema> extends TSchema {
  [Kind]: "AsyncIterator";
  static: AsyncIterableIterator<Static<T, this["params"]>>;
  type: "AsyncIterator";
  items: T;
}
/** `[JavaScript]` Creates a AsyncIterator type */
export function AsyncIterator<T extends TSchema>(items: T, options: SchemaOptions = {}): TAsyncIterator<T> {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items),
  } as unknown as TAsyncIterator<T>;
}

//#endregion

//#region [/Users/paulvu/v/pkgs/typebox/src/type/constructor/constructor.ts]
// ------------------------------------------------------------------
// TConstructorStatic
// ------------------------------------------------------------------
type ConstructorStaticReturnType<T extends TSchema, P extends unknown[]> = Static<T, P>;
// prettier-ignore
type ConstructorStaticParameters<T extends TSchema[], P extends unknown[], Acc extends unknown[] = []> = 
  T extends [infer L extends TSchema, ...infer R extends TSchema[]]
    ? ConstructorStaticParameters<R, P, [...Acc, Static<L, P>]>
    : Acc
// prettier-ignore
type ConstructorStatic<T extends TSchema[], U extends TSchema, P extends unknown[]> = (
  Ensure<new (...param: ConstructorStaticParameters<T, P>) => ConstructorStaticReturnType<U, P>>
)
// ------------------------------------------------------------------
// TConstructor
// ------------------------------------------------------------------
export interface TConstructor<T extends TSchema[] = TSchema[], U extends TSchema = TSchema> extends TSchema {
  [Kind]: "Constructor";
  static: ConstructorStatic<T, U, this["params"]>;
  type: "Constructor";
  parameters: T;
  returns: U;
}
/** `[JavaScript]` Creates a Constructor type */
export function Constructor<T extends TSchema[], U extends TSchema>(
  parameters: [...T],
  returns: U,
  options?: SchemaOptions
): TConstructor<T, U> {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns),
  } as unknown as TConstructor<T, U>;
}

//#endregion

//#region []
// ------------------------------------------------------------------
// TEnum
// ------------------------------------------------------------------
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
export function Enum<V extends TEnumValue, T extends Record<TEnumKey, V>>(item: T, options: SchemaOptions = {}): TEnum<T> {
  if (IsUndefined(item)) throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item)
    .filter(key => isNaN(key as any))
    .map(key => item[key]) as T[keyof T][];
  const values2 = [...new Set(values1)];
  const anyOf = values2.map(value => Literal(value));
  return Union(anyOf, { ...options, [Hint]: "Enum" }) as unknown as TEnum<T>;
}

//#endregion

//#region  [/Users/paulvu/v/pkgs/typebox/src/type/literal/literal.ts]
// ------------------------------------------------------------------
// TLiteralValue
// ------------------------------------------------------------------
export type TLiteralValue = boolean | number | string; // | bigint - supported but variant disable due to potential numeric type conflicts

// ------------------------------------------------------------------
// TLiteral
// ------------------------------------------------------------------
export interface TLiteral<T extends TLiteralValue = TLiteralValue> extends TSchema {
  [Kind]: "Literal";
  static: T;
  const: T;
}
/** `[Json]` Creates a Literal type */
export function Literal<T extends TLiteralValue>(value: T, options: SchemaOptions = {}): TLiteral<T> {
  return {
    ...options,
    [Kind]: "Literal",
    const: value,
    type: typeof value as "string" | "number" | "boolean",
  } as unknown as TLiteral<T>;
}

//#endregion
//#region

//#region [/Users/paulvu/v/pkgs/typebox/src/type/union/union-evaluated.ts]
type TIsUnionOptional<T extends TSchema[]> = T extends [infer L extends TSchema, ...infer R extends TSchema[]]
  ? L extends TOptional<TSchema>
    ? true
    : TIsUnionOptional<R>
  : false;
// prettier-ignore
function IsUnionOptional<T extends TSchema[]>(T: T): TIsUnionOptional<T> {
    return T.some(L => IsOptional(L)) as TIsUnionOptional<T>
  }
// ------------------------------------------------------------------
// RemoveOptionalFromRest
// ------------------------------------------------------------------
// prettier-ignore
type TRemoveOptionalFromRest<T extends TSchema[], Acc extends TSchema[] = []> = (
    T extends [infer L extends TSchema, ...infer R extends TSchema[]]
      ? L extends TOptional<infer S extends TSchema>
        ? TRemoveOptionalFromRest<R, [...Acc, TRemoveOptionalFromType<S>]>
        : TRemoveOptionalFromRest<R, [...Acc, L]>
      : Acc
  )
// prettier-ignore
function RemoveOptionalFromRest<T extends TSchema[]>(T: T): TRemoveOptionalFromRest<T> {
    return T.map(L => IsOptional(L) ? RemoveOptionalFromType(L) : L) as TRemoveOptionalFromRest<T>
  }
// ------------------------------------------------------------------
// RemoveOptionalFromType
// ------------------------------------------------------------------
// prettier-ignore
type TRemoveOptionalFromType<T extends TSchema> = (
    T extends TReadonly<infer S extends TSchema> ? TReadonly<TRemoveOptionalFromType<S>> :
    T extends TOptional<infer S extends TSchema> ? TRemoveOptionalFromType<S> :
    T
  )
// prettier-ignore
function RemoveOptionalFromType<T extends TSchema>(T: T): TRemoveOptionalFromType<T> {
    return (
      Discard(T, [OptionalKind])
    ) as TRemoveOptionalFromType<T>
  }
// ------------------------------------------------------------------
// ResolveUnion
// ------------------------------------------------------------------
// prettier-ignore
type TResolveUnion<T extends TSchema[], R extends TSchema[] = TRemoveOptionalFromRest<T>> = (
    TIsUnionOptional<T> extends true 
      ? TOptional<TUnion<R>> 
      : TUnion<R>
  )
// prettier-ignore
function ResolveUnion<T extends TSchema[]>(T: T, options: SchemaOptions): TResolveUnion<T> {
    return (
      IsUnionOptional(T)
        ? Optional(UnionCreate(RemoveOptionalFromRest(T) as TSchema[], options))
        : UnionCreate(RemoveOptionalFromRest(T) as TSchema[], options)
    ) as TResolveUnion<T>
  }
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
// prettier-ignore
export type TUnionEvaluated<T extends TSchema[]> = (
    T extends [] ? TNever :
    T extends [TSchema] ? T[0] :
    TResolveUnion<T>
  )
/** `[Json]` Creates an evaluated Union type */
export function UnionEvaluated<T extends TSchema[], R = TUnionEvaluated<T>>(T: [...T], options: SchemaOptions = {}): R {
  // prettier-ignore
  return (
      T.length === 0 ? Never(options) :
      T.length === 1 ? CloneType(T[0], options) :
      ResolveUnion(T, options)
    ) as R
}

//#endregion
//#region [/Users/paulvu/v/pkgs/typebox/src/type/union/union-type.ts]

// ------------------------------------------------------------------
// UnionStatic
// ------------------------------------------------------------------
// prettier-ignore
type UnionStatic<T extends TSchema[], P extends unknown[]> = {
    [K in keyof T]: T[K] extends TSchema ? Static<T[K], P> : never 
  }[number]

// ------------------------------------------------------------------
// TUnion
// ------------------------------------------------------------------
export interface TUnion<T extends TSchema[] = TSchema[]> extends TSchema {
  [Kind]: "Union";
  static: UnionStatic<T, this["params"]>;
  anyOf: T;
}

//#endregion
//#region  [/Users/paulvu/v/pkgs/typebox/src/type/union/union-create.ts ]
export function UnionCreate<T extends TSchema[]>(T: [...T], options: SchemaOptions): TUnion<T> {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) } as unknown as TUnion<T>;
}

//#endregion
//#region [/Users/paulvu/v/pkgs/typebox/src/type/union/union.ts]
export type Union<T extends TSchema[]> = T extends [] ? TNever : T extends [TSchema] ? T[0] : TUnion<T>;
/** `[Json]` Creates a Union type */
export function Union<T extends TSchema[]>(T: [...T], options: SchemaOptions = {}): Union<T> {
  // prettier-ignore
  return (
      T.length === 0 ? Never(options) :
      T.length === 1 ? CloneType(T[0], options) :
      UnionCreate(T, options)
    ) as Union<T>
}
//#endregion

//#region []
// ------------------------------------------------------------------
// FunctionStatic
// ------------------------------------------------------------------
type FunctionStaticReturnType<T extends TSchema, P extends unknown[]> = Static<T, P>;
// prettier-ignore
type FunctionStaticParameters<T extends TSchema[], P extends unknown[], Acc extends unknown[] = []> = 
  T extends [infer L extends TSchema, ...infer R extends TSchema[]]
    ? FunctionStaticParameters<R, P, [...Acc, Static<L, P>]>
    : Acc
// prettier-ignore
type FunctionStatic<T extends TSchema[], U extends TSchema, P extends unknown[]> = (
  Ensure<(...param: FunctionStaticParameters<T, P>) => FunctionStaticReturnType<U, P>>
)
// ------------------------------------------------------------------
// TFunction
// ------------------------------------------------------------------
export interface TFunction<T extends TSchema[] = TSchema[], U extends TSchema = TSchema> extends TSchema {
  [Kind]: "Function";
  static: FunctionStatic<T, U, this["params"]>;
  type: "Function";
  parameters: T;
  returns: U;
}
/** `[JavaScript]` Creates a Function type */
export function Function<T extends TSchema[], U extends TSchema>(parameters: [...T], returns: U, options?: SchemaOptions): TFunction<T, U> {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns),
  } as unknown as TFunction<T, U>;
}

//#endregion

//#region
// ------------------------------------------------------------------
// IntersectStatic
// ------------------------------------------------------------------
// prettier-ignore
type TIntersectStatic<T extends TSchema[], P extends unknown[], Acc extends unknown = unknown> = 
  T extends [infer L extends TSchema, ...infer R extends TSchema[]]
    ? TIntersectStatic<R, P, Acc & Static<L, P>>
    : Acc
// ------------------------------------------------------------------
// TIntersect
// ------------------------------------------------------------------
// prettier-ignore
export type TUnevaluatedProperties = undefined | TSchema | boolean
// prettier-ignore
export interface IntersectOptions extends SchemaOptions {
  unevaluatedProperties?: TUnevaluatedProperties
}
// prettier-ignore
export interface TIntersect<T extends TSchema[] = TSchema[]> extends TSchema, IntersectOptions {
  [Kind]: 'Intersect'
  static: TIntersectStatic<T, this['params']>
  type?: 'object'
  allOf: [...T]
}

//#endregion
//#region

export interface TIterator<T extends TSchema = TSchema> extends TSchema {
  [Kind]: "Iterator";
  static: IterableIterator<Static<T, this["params"]>>;
  type: "Iterator";
  items: T;
}
/** `[JavaScript]` Creates an Iterator type */
export function Iterator<T extends TSchema>(items: T, options: SchemaOptions = {}): TIterator<T> {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items),
  } as unknown as TIterator<T>;
}

//#endregion
//#region

export interface TNot<T extends TSchema = TSchema> extends TSchema {
  [Kind]: "Not";
  static: T extends TNot<infer U> ? Static<U> : unknown;
  not: T;
}
/** `[Json]` Creates a Not type */
export function Not<T extends TSchema>(schema: T, options?: SchemaOptions): TNot<T> {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema),
  } as unknown as TNot<T>;
}

//#endregion

//#region
export interface TPromise<T extends TSchema = TSchema> extends TSchema {
  [Kind]: "Promise";
  static: Promise<Static<T, this["params"]>>;
  type: "Promise";
  item: TSchema;
}
/** `[JavaScript]` Creates a Promise type */
export function _Promise<T extends TSchema>(item: T, options: SchemaOptions = {}): TPromise<T> {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item),
  } as unknown as TPromise<T>;
}

//#endregion

//#region
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
export function _BigInt(options: BigIntOptions = {}): TBigInt {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint",
  } as TBigInt;
}

//#endregion
//#region [/Users/paulvu/v/pkgs/typebox/src/type/boolean/boolean.ts]
export interface TBoolean extends TSchema {
  [Kind]: "Boolean";
  static: boolean;
  type: "boolean";
}
/** `[Json]` Creates a Boolean type */
export function _Boolean(options: SchemaOptions = {}): TBoolean {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean",
  } as unknown as TBoolean;
}

//#endregion
//#region
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
export function Integer(options: IntegerOptions = {}): TInteger {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer",
  } as unknown as TInteger;
}

//#endregion
//#region
function* FromUnion(syntax: string): IterableIterator<TTemplateLiteralKind> {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean"
    ? yield _Boolean()
    : trim === "number"
    ? yield _Number()
    : trim === "bigint"
    ? yield _BigInt()
    : trim === "string"
    ? yield String()
    : yield (() => {
        const literals = trim.split("|").map(literal => Literal(literal.trim()));
        return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
      })();
}
// prettier-ignore
function* FromTerminal(syntax: string): IterableIterator<TTemplateLiteralKind> {
    if (syntax[1] !== '{') {
      const L = Literal('$')
      const R = FromSyntax(syntax.slice(1))
      return yield* [L, ...R]
    }
    for (let i = 2; i < syntax.length; i++) {
      if (syntax[i] === '}') {
        const L = FromUnion(syntax.slice(2, i))
        const R = FromSyntax(syntax.slice(i + 1))
        return yield* [...L, ...R]
      }
    }
    yield Literal(syntax)
  }
// prettier-ignore
function* FromSyntax(syntax: string): IterableIterator<TTemplateLiteralKind> {
    for (let i = 0; i < syntax.length; i++) {
      if (syntax[i] === '$') {
        const L = Literal(syntax.slice(0, i))
        const R = FromTerminal(syntax.slice(i))
        return yield* [L, ...R]
      }
    }
    yield Literal(syntax)
  }
// prettier-ignore
type FromUnionLiteral<T extends string> =
    T extends `${infer L}|${infer R}` ? [TLiteral<Trim<L>>, ...FromUnionLiteral<R>] :
    T extends `${infer L}` ? [TLiteral<Trim<L>>] :
    []
type FromUnion<T extends string> = TUnionEvaluated<FromUnionLiteral<T>>;
// prettier-ignore
type FromTerminal<T extends string> =
    T extends 'boolean' ? TBoolean :
    T extends 'bigint' ? TBigInt :
    T extends 'number' ? TNumber :
    T extends 'string' ? TString :
    FromUnion<T>
// prettier-ignore
type FromString<T extends string> =
    T extends `{${infer L}}${infer R}` ? [FromTerminal<L>, ...FromString<R>] :
    T extends `${infer L}$${infer R}` ? [TLiteral<L>, ...FromString<R>] :
    T extends `${infer L}` ? [TLiteral<L>] :
    []

// ------------------------------------------------------------------
// TTemplateLiteralSyntax
// ------------------------------------------------------------------
// prettier-ignore
export type TTemplateLiteralSyntax<T extends string> = (
    TTemplateLiteral<Assert<FromString<T>, TTemplateLiteralKind[]>>
  )
/** Parses TemplateLiteralSyntax and returns a tuple of TemplateLiteralKinds */
export function TemplateLiteralSyntax(syntax: string): TTemplateLiteralKind[] {
  return [...FromSyntax(syntax)];
}

//#endregion
//#region [/Users/paulvu/v/pkgs/typebox/src/type/template-literal/parse.tss]

// ------------------------------------------------------------------
// TemplateLiteralParserError
// ------------------------------------------------------------------
export class TemplateLiteralParserError extends TypeBoxError {}
// ------------------------------------------------------------------
// TemplateLiteralParse
// ------------------------------------------------------------------
// prettier-ignore
export type Expression = ExpressionAnd | ExpressionOr | ExpressionConst
export type ExpressionConst = { type: "const"; const: string };
export type ExpressionAnd = { type: "and"; expr: Expression[] };
export type ExpressionOr = { type: "or"; expr: Expression[] };
// prettier-ignore
function IsNonEscaped(pattern: string, index: number, char: string) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92
}
// prettier-ignore
function IsOpenParen(pattern: string, index: number) {
  return IsNonEscaped(pattern, index, '(')
}
// prettier-ignore
function IsCloseParen(pattern: string, index: number) {
  return IsNonEscaped(pattern, index, ')')
}
// prettier-ignore
function IsSeparator(pattern: string, index: number) {
  return IsNonEscaped(pattern, index, '|')
}
// prettier-ignore
function IsGroup(pattern: string) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1))) return false
  let count = 0
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) count += 1
    if (IsCloseParen(pattern, index)) count -= 1
    if (count === 0 && index !== pattern.length - 1) return false
  }
  return true
}
// prettier-ignore
function InGroup(pattern: string) {
  return pattern.slice(1, pattern.length - 1)
}
// prettier-ignore
function IsPrecedenceOr(pattern: string) {
  let count = 0
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) count += 1
    if (IsCloseParen(pattern, index)) count -= 1
    if (IsSeparator(pattern, index) && count === 0) return true
  }
  return false
}
// prettier-ignore
function IsPrecedenceAnd(pattern: string) {
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) return true
  }
  return false
}
// prettier-ignore
function Or(pattern: string): Expression {
  let [count, start] = [0, 0]
  const expressions: Expression[] = []
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) count += 1
    if (IsCloseParen(pattern, index)) count -= 1
    if (IsSeparator(pattern, index) && count === 0) {
      const range = pattern.slice(start, index)
      if (range.length > 0) expressions.push(TemplateLiteralParse(range))
      start = index + 1
    }
  }
  const range = pattern.slice(start)
  if (range.length > 0) expressions.push(TemplateLiteralParse(range))
  if (expressions.length === 0) return { type: 'const', const: '' }
  if (expressions.length === 1) return expressions[0]
  return { type: 'or', expr: expressions }
}
// prettier-ignore
function And(pattern: string): Expression {
  function Group(value: string, index: number): [number, number] {
    if (!IsOpenParen(value, index)) throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`)
    let count = 0
    for (let scan = index; scan < value.length; scan++) {
      if (IsOpenParen(value, scan)) count += 1
      if (IsCloseParen(value, scan)) count -= 1
      if (count === 0) return [index, scan]
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`)
  }
  function Range(pattern: string, index: number): [number, number] {
    for (let scan = index; scan < pattern.length; scan++) {
      if (IsOpenParen(pattern, scan)) return [index, scan]
    }
    return [index, pattern.length]
  }
  const expressions: Expression[] = []
  for (let index = 0; index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index)
      const range = pattern.slice(start, end + 1)
      expressions.push(TemplateLiteralParse(range))
      index = end
    } else {
      const [start, end] = Range(pattern, index)
      const range = pattern.slice(start, end)
      if (range.length > 0) expressions.push(TemplateLiteralParse(range))
      index = end - 1
    }
  }
  return (
    (expressions.length === 0) ? { type: 'const', const: '' } :
    (expressions.length === 1) ? expressions[0] :
    { type: 'and', expr: expressions }
  )
}
// ------------------------------------------------------------------
// TemplateLiteralParse
// ------------------------------------------------------------------
/** Parses a pattern and returns an expression tree */
export function TemplateLiteralParse(pattern: string): Expression {
  // prettier-ignore
  return (
    IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) :
    IsPrecedenceOr(pattern) ? Or(pattern) :
    IsPrecedenceAnd(pattern) ? And(pattern) :
    { type: 'const', const: pattern }
  )
}
// ------------------------------------------------------------------
// TemplateLiteralParseExact
// ------------------------------------------------------------------
/** Parses a pattern and strips forward and trailing ^ and $ */
export function TemplateLiteralParseExact(pattern: string): Expression {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

//#endregion
//#region

// ------------------------------------------------------------------
// TemplateLiteralFiniteError
// ------------------------------------------------------------------
export class TemplateLiteralFiniteError extends TypeBoxError {}

// ------------------------------------------------------------------
// IsTemplateLiteralFiniteCheck
// ------------------------------------------------------------------
// prettier-ignore
function IsNumberExpression(expression: Expression): boolean {
  return (
    expression.type === 'or' &&
    expression.expr.length === 2 &&
    expression.expr[0].type === 'const' &&
    expression.expr[0].const === '0' &&
    expression.expr[1].type === 'const' &&
    expression.expr[1].const === '[1-9][0-9]*'
  )
}
// prettier-ignore
function IsBooleanExpression(expression: Expression): boolean {
  return (
    expression.type === 'or' &&
    expression.expr.length === 2 &&
    expression.expr[0].type === 'const' &&
    expression.expr[0].const === 'true' &&
    expression.expr[1].type === 'const' &&
    expression.expr[1].const === 'false'
  )
}
// prettier-ignore
function IsStringExpression(expression: Expression) {
  return expression.type === 'const' && expression.const === '.*'
}
// prettier-ignore
type TFromTemplateLiteralKind<T> =
  T extends TTemplateLiteral<infer U extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<U> :
  T extends TUnion<infer U extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<U> :
  T extends TString ? false :
  T extends TNumber ? false :
  T extends TInteger ? false :
  T extends TBigInt ? false :
  T extends TBoolean ? true :
  T extends TLiteral ? true :
  false
// prettier-ignore
type TFromTemplateLiteralKinds<T extends TTemplateLiteralKind[]> =
  T extends [infer L extends TTemplateLiteralKind, ...infer R extends TTemplateLiteralKind[]] 
    ? TFromTemplateLiteralKind<L> extends false 
      ? false 
      : TFromTemplateLiteralKinds<R> :
  true
// ------------------------------------------------------------------
// IsTemplateLiteralExpressionFinite
// ------------------------------------------------------------------
// prettier-ignore
export function IsTemplateLiteralExpressionFinite(expression: Expression): boolean {
  return (
    IsNumberExpression(expression) || IsStringExpression(expression) ? false :
    IsBooleanExpression(expression) ? true :
    (expression.type === 'and') ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) :
    (expression.type === 'or') ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) :
    (expression.type === 'const') ? true :
    (() => { throw new TemplateLiteralFiniteError(`Unknown expression type`) })()
  )
}
// ------------------------------------------------------------------
// TIsTemplateLiteralFinite
// ------------------------------------------------------------------
// prettier-ignore
export type TIsTemplateLiteralFinite<T> = 
  T extends TTemplateLiteral<infer U> 
    ? TFromTemplateLiteralKinds<U>
    : false
/** Returns true if this TemplateLiteral resolves to a finite set of values */
export function IsTemplateLiteralFinite<T extends TTemplateLiteral>(schema: T) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}

//#endregion

///#region
export const PatternBoolean = "(true|false)";
export const PatternNumber = "(0|[1-9][0-9]*)";
export const PatternString = "(.*)";
export const PatternBooleanExact = `^${PatternBoolean}$`;
export const PatternNumberExact = `^${PatternNumber}$`;
export const PatternStringExact = `^${PatternString}$`;

//#endregion
//#region [/Users/paulvu/v/pkgs/typebox/src/type/template-literal/parse.ts] MODIFIED x2 ADDED AS ANY
// ------------------------------------------------------------------
// TemplateLiteralPatternError
// ------------------------------------------------------------------
export class TemplateLiteralPatternError extends TypeBoxError {}

// ------------------------------------------------------------------
// TemplateLiteralPattern
// ------------------------------------------------------------------
function Escape(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// prettier-ignore
// function Visit(schema: TSchema, acc: string): string {
//   return (
//     IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) :
//     IsUnion(schema) ? `(${schema.anyOf.map((schema) => Visit(schema, acc)).join('|')})` :
//     IsNumber(schema) ? `${acc}${PatternNumber}` :
//     IsInteger(schema) ? `${acc}${PatternNumber}` :
//     IsBigInt(schema) ? `${acc}${PatternNumber}` :
//     IsString(schema) ? `${acc}${PatternString}` :
//     IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` :
//     IsBoolean(schema) ? `${acc}${PatternBoolean}` :
//     (() => { throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`) })()
//   )
// }
export function TemplateLiteralPattern(kinds: TTemplateLiteralKind[]): string {
  function Visit(schema: TSchema, acc: string): string {
    return (
      IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) :
      IsUnion(schema) ? `(${schema.anyOf.map((schema) => Visit(schema, acc)).join('|')})` :
      IsNumber(schema) ? `${acc}${PatternNumber}` :
      IsInteger(schema) ? `${acc}${PatternNumber}` :
      IsBigInt(schema) ? `${acc}${PatternNumber}` :
      IsString(schema) ? `${acc}${PatternString}` :
      IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` :
      IsBoolean(schema) ? `${acc}${PatternBoolean}` :
      (() => { throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`) })()
    )
  }
  return `^${kinds.map((schema) => Visit(schema, '')).join('')}\$`
}

//#endregion

//#region
// ------------------------------------------------------------------
// TemplateLiteralStaticKind
// ------------------------------------------------------------------
// prettier-ignore
type TemplateLiteralStaticKind<T, Acc extends string> =
  T extends TUnion<infer U> ? { [K in keyof U]: TemplateLiteralStatic<Assert<[U[K]], TTemplateLiteralKind[]>, Acc> }[number] :
  T extends TTemplateLiteral ? `${Static<T>}` :
  T extends TLiteral<infer U> ? `${U}` :
  T extends TString ? `${string}` :
  T extends TNumber ? `${number}` :
  T extends TBigInt ? `${bigint}` :
  T extends TBoolean ? `${boolean}` :
  never
// ------------------------------------------------------------------
// TemplateLiteralStatic
// ------------------------------------------------------------------
// prettier-ignore
type TemplateLiteralStatic<T extends TTemplateLiteralKind[], Acc extends string> =
  T extends [infer L, ...infer R] ? `${TemplateLiteralStaticKind<L, Acc>}${TemplateLiteralStatic<Assert<R, TTemplateLiteralKind[]>, Acc>}` :
  Acc
// ------------------------------------------------------------------
// TTemplateLiteralKind
// ------------------------------------------------------------------
// prettier-ignore
export type TTemplateLiteralKind =
  | TTemplateLiteral
  | TUnion
  | TLiteral
  | TInteger
  | TNumber
  | TBigInt
  | TString
  | TBoolean
  | TNever
// ------------------------------------------------------------------
// TTemplateLiteral
// ------------------------------------------------------------------
// prettier-ignore
export interface TTemplateLiteral<T extends TTemplateLiteralKind[] = TTemplateLiteralKind[]> extends TSchema {
  [Kind]: 'TemplateLiteral'
  static: TemplateLiteralStatic<T, EmptyString>
  type: 'string'
  pattern: string // todo: it may be possible to infer this pattern
}
/** `[Json]` Creates a TemplateLiteral type from template dsl string */
export function TemplateLiteral<T extends string>(syntax: T, options?: SchemaOptions): TTemplateLiteralSyntax<T>;
/** `[Json]` Creates a TemplateLiteral type */
export function TemplateLiteral<T extends TTemplateLiteralKind[]>(kinds: [...T], options?: SchemaOptions): TTemplateLiteral<T>;
/** `[Json]` Creates a TemplateLiteral type */
// prettier-ignore

export function TemplateLiteral(unresolved: TTemplateLiteralKind[] | string, options: SchemaOptions = {}) {
  const pattern = IsString(unresolved) 
    ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved as any)) 
    : TemplateLiteralPattern(unresolved as TTemplateLiteralKind[])
  return { ...options, [Kind]: 'TemplateLiteral', type: 'string', pattern }
}

//#endregion

//#region  [/Users/paulvu/v/pkgs/typebox/src/type/template-literal/generate.ts] MODIFIED
// ------------------------------------------------------------------
// TemplateLiteralGenerateError
// ------------------------------------------------------------------
export class TemplateLiteralGenerateError extends TypeBoxError {}
// ------------------------------------------------------------------
// StringReducers
// ------------------------------------------------------------------
// StringReduceUnary<"A", ["B", "C"]> -> ["AB", "AC"]
// prettier-ignore
type TStringReduceUnary<L extends string, R extends string[], Acc extends string[] = []> = 
  R extends [infer A extends string, ...infer B extends string[]] 
    ? TStringReduceUnary<L, B, [...Acc, `${L}${A}`]>
    : Acc
// StringReduceBinary<['A', 'B'], ['C', 'D']> -> ["AC", "AD", "BC", "BD"]
// prettier-ignore
type TStringReduceBinary<L extends string[], R extends string[], Acc extends string[] = []> = 
  L extends [infer A extends string, ...infer B extends string[]]
    ? TStringReduceBinary<B, R, [...Acc, ...TStringReduceUnary<A, R>]>
    : Acc
// StringReduceMany<[['A', 'B'], ['C', 'D'], ['E']]> -> [["ACE", "ADE", "BCE", "BDE"]]
// prettier-ignore
type TStringReduceMany<T extends string[][]> = // consider optimizing
  T extends [infer L extends string[], infer R extends string[], ...infer Rest extends string[][]] 
    ? TStringReduceMany<[TStringReduceBinary<L, R>, ...Rest]> 
    : T
// Reduce<[['A', 'B'], ['C', 'D'], ['E']]> -> ["ACE", "ADE", "BCE", "BDE"]
// prettier-ignore
type TStringReduce<T extends string[][], O = TStringReduceMany<T>> = 
  0 extends keyof O
    ? Assert<O[0], string[]>
    : []
// ------------------------------------------------------------------
// FromTemplateLiteralUnionKinds
// ------------------------------------------------------------------
// prettier-ignore
type TFromTemplateLiteralUnionKinds<T extends TTemplateLiteralKind[]> = 
  T extends [infer L extends TLiteral, ...infer R extends TLiteral[]]
    ? [`${L['const']}`, ...TFromTemplateLiteralUnionKinds<R>]
    : []
// ------------------------------------------------------------------
// FromTemplateLiteralKinds
// ------------------------------------------------------------------
// prettier-ignore
// type TFromTemplateLiteralKinds<T extends TTemplateLiteralKind[], Acc extends TLiteralValue[][] = []> =
//   T extends [infer L extends TTemplateLiteralKind, ...infer R extends TTemplateLiteralKind[]]
//     ? (
//      L extends TLiteral<infer S extends TLiteralValue> ? TFromTemplateLiteralKinds<R, [...Acc, [S]]> :
//      L extends TUnion<infer S extends TTemplateLiteralKind[]> ? TFromTemplateLiteralKinds<R, [...Acc, TFromTemplateLiteralUnionKinds<S>]> :
//      L extends TBoolean ? TFromTemplateLiteralKinds<R, [...Acc, ['true', 'false']]> :
//      Acc
//   ) : Acc
// // ------------------------------------------------------------------
// TemplateLiteralExpressionGenerate
// ------------------------------------------------------------------
// prettier-ignore
function* GenerateReduce(buffer: string[][]): IterableIterator<string> {
  if (buffer.length === 1) return yield* buffer[0]
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`
    }
  }
}
// prettier-ignore
function* GenerateAnd(expression: ExpressionAnd): IterableIterator<string> {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]))
}
// prettier-ignore
function* GenerateOr(expression: ExpressionOr): IterableIterator<string> {
  for (const expr of expression.expr) yield* TemplateLiteralExpressionGenerate(expr)
}
// prettier-ignore
function* GenerateConst(expression: ExpressionConst): IterableIterator<string> {
  return yield expression.const
}
export function* TemplateLiteralExpressionGenerate(expression: Expression): IterableIterator<string> {
  return expression.type === "and"
    ? yield* GenerateAnd(expression)
    : expression.type === "or"
    ? yield* GenerateOr(expression)
    : expression.type === "const"
    ? yield* GenerateConst(expression)
    : (() => {
        throw new TemplateLiteralGenerateError("Unknown expression");
      })();
}
// ------------------------------------------------------------------
// TTemplateLiteralGenerate
// ------------------------------------------------------------------
// prettier-ignore
export type TTemplateLiteralGenerate<T extends TTemplateLiteral, F = TIsTemplateLiteralFinite<T>> =
  F extends true
    ? (
    T extends TTemplateLiteral<infer S extends TTemplateLiteralKind[]>
      ? TFromTemplateLiteralKinds<S> extends infer R extends string[][]
        ? TStringReduce<R>
        : []
      : []
  ) : []
/** Generates a tuple of strings from the given TemplateLiteral. Returns an empty tuple if infinite. */
export function TemplateLiteralGenerate<T extends TTemplateLiteral>(schema: T): TTemplateLiteralGenerate<T> {
  const expression = TemplateLiteralParseExact(schema.pattern);
  // prettier-ignore
  return (
    IsTemplateLiteralExpressionFinite(expression)
     ? [...TemplateLiteralExpressionGenerate(expression)]
     : []
  ) as TTemplateLiteralGenerate<T>
}

//#endregion

//#region [] MODIFIED SEE FROM_UNION 2
// ------------------------------------------------------------------
// FromTemplateLiteral
// ------------------------------------------------------------------
// prettier-ignore
type TFromTemplateLiteral<T extends TTemplateLiteral, R extends string[] = TTemplateLiteralGenerate<T>> = (R)
// prettier-ignore
function _FromTemplateLiteral<T extends TTemplateLiteral>(T: T): TFromTemplateLiteral<T> {
  const R = TemplateLiteralGenerate(T) as string[]
  return R.map(S => S.toString()) as TFromTemplateLiteral<T>
}
// ------------------------------------------------------------------
// FromUnion
// ------------------------------------------------------------------
// prettier-ignore
type TFromUnion<T extends TSchema[], Acc extends string[] = []> = (
  T extends [infer L extends TSchema, ...infer R extends TSchema[]] 
    ? TFromUnion<R, [...Acc, ...TIndexPropertyKeys<L>]>
    : Acc
)
// prettier-ignore
function FromUnion2<T extends TSchema[]>(T: T): TFromUnion<T> {
  return T.reduce((Acc, L) => {
    return [...Acc, ...IndexPropertyKeys(L)]
  }, [] as string[]) as TFromUnion<T>
}
// ------------------------------------------------------------------
// FromLiteral
// ------------------------------------------------------------------
// prettier-ignore
type TFromLiteral<T extends TLiteralValue> = (
  T extends PropertyKey 
    ? [`${T}`] 
    : []
)
// prettier-ignore
function _FromLiteral<T extends TLiteralValue>(T: T): TFromLiteral<T> {
  return (
    [(T as string).toString()] // TS 5.4 observes TLiteralValue as not having a toString()
  ) as TFromLiteral<T>
}
// ------------------------------------------------------------------
// IndexedKeyResolve
// ------------------------------------------------------------------
// prettier-ignore
export type TIndexPropertyKeys<T extends TSchema> = (
  T extends TTemplateLiteral  ? TFromTemplateLiteral<T> :
  T extends TUnion<infer S>   ? TFromUnion<S> :
  T extends TLiteral<infer S> ? TFromLiteral<S> :
  T extends TNumber           ? ['[number]'] :  
  T extends TInteger          ? ['[number]'] :
  []
)
/** Returns a tuple of PropertyKeys derived from the given TSchema */
// prettier-ignore
export function IndexPropertyKeys<T extends TSchema>(T: T): TIndexPropertyKeys<T> {
  return [...new Set<string>((
    IsTemplateLiteral(T) ? _FromTemplateLiteral(T) :
    IsUnion(T) ? FromUnion2(T.anyOf) :
    IsLiteral(T) ? _FromLiteral(T.const) :
    IsNumber(T) ? ['[number]'] : 
    IsInteger(T) ? ['[number]'] :
    []
  ))] as TIndexPropertyKeys<T>
}

//#endregion
//#region

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
/** `[JavaScript]` Creates a RegExp type */

// Non-standard extensions
/**
 *  @deprecated A legacy feature for browser compatibility
 *    compile(pattern: string, flags?: string): this;
 * */

export function RegExp(unresolved: RegExp | string, options: SchemaOptions = {}) {
  const expr = IsString(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp" } as never;
}

//#endregion

//#region [] MODIFIED x2 References internal _Object  | ADDED AN AS ANY | added ts-ignore on @.$id
// ------------------------------------------------------------------
// RecordCreateFromPattern
// ------------------------------------------------------------------
// prettier-ignore
function RecordCreateFromPattern(pattern: string, T: TSchema, options: ObjectOptions): TRecord<TSchema, TSchema> {
    return { 
      ...options, 
      [Kind]: 'Record', 
      type: 'object', 
      patternProperties: { [pattern]: CloneType(T) } 
    } as unknown as TRecord<TSchema, TSchema> 
  }
// ------------------------------------------------------------------
// RecordCreateFromKeys
// ------------------------------------------------------------------
// prettier-ignore
function RecordCreateFromKeys(K: string[], T: TSchema, options: ObjectOptions): TObject<TProperties> {
    const P = K.reduce((Acc, K) => ({ ...Acc, [K]: CloneType(T) }), {} as TProperties)
    return _Object(P, { ...options, [Hint]: 'Record' })
  }
// ------------------------------------------------------------------
// FromTemplateLiteralKey (Fast Inference)
// ------------------------------------------------------------------
// prettier-ignore
type TFromTemplateLiteralKeyInfinite<K extends TTemplateLiteral, T extends TSchema> = Ensure<TRecord<K, T>>
// prettier-ignore
type TFromTemplateLiteralKeyFinite<K extends TTemplateLiteral, T extends TSchema, I extends string = Static<K>> = (
    Ensure<TObject<Evaluate<{ [_ in I]: T }>>>
  )
// prettier-ignore
type TFromTemplateLiteralKey<K extends TTemplateLiteral, T extends TSchema> = TIsTemplateLiteralFinite<K> extends false
    ? TFromTemplateLiteralKeyInfinite<K, T>
    : TFromTemplateLiteralKeyFinite<K, T>
// prettier-ignore
function FromTemplateLiteralKey<K extends TTemplateLiteral, T extends TSchema>(K: K, T: T, options: ObjectOptions): TFromTemplateLiteralKey<K, T> {
    return (
      IsTemplateLiteralFinite(K)
        ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options)
        : RecordCreateFromPattern(K.pattern, T, options)
    ) as TFromTemplateLiteralKey<K, T>
  }
// ------------------------------------------------------------------
// FromEnumKey (Special Case)
// ------------------------------------------------------------------
// prettier-ignore
type TFromEnumKey<K extends Record<string, string | number>, T extends TSchema> = Ensure<TObject<{ [_ in K[keyof K]]: T }>>
// ------------------------------------------------------------------
// FromUnionKey
// ------------------------------------------------------------------
// prettier-ignore
type TFromUnionKeyLiteralString<K extends TLiteral<string>, T extends TSchema> = { [_ in K['const']]: T }
// prettier-ignore
type TFromUnionKeyLiteralNumber<K extends TLiteral<number>, T extends TSchema> = { [_ in K['const']]: T }
// prettier-ignore
type TFromUnionKeyRest<K extends TSchema[], T extends TSchema> = 
    K extends [infer L extends TSchema, ...infer R extends TSchema[]] ? (
      L extends TUnion<infer S> ? TFromUnionKeyRest<S, T> & TFromUnionKeyRest<R, T> :
      L extends TLiteral<string> ? TFromUnionKeyLiteralString<L, T> & TFromUnionKeyRest<R, T> :
      L extends TLiteral<number> ? TFromUnionKeyLiteralNumber<L, T> & TFromUnionKeyRest<R, T> :
    {}) : {}
// prettier-ignore
type TFromUnionKey<K extends TSchema[], T extends TSchema, P extends TProperties = TFromUnionKeyRest<K, T>> = (
    Ensure<TObject<Evaluate<P>>>
  )
// prettier-ignore
function FromUnionKey<K extends TSchema[], T extends TSchema>(K: K, T: T, options: ObjectOptions): TFromUnionKey<K, T> {
    return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options) as  TFromUnionKey<K, T>
  }
// ------------------------------------------------------------------
// FromLiteralKey
// ------------------------------------------------------------------
// prettier-ignore
type TFromLiteralKey<K extends TLiteralValue, T extends TSchema> = (
    Ensure<TObject<{ [_ in Assert<K, PropertyKey>]: T }>>
  )
// prettier-ignore
function FromLiteralKey<K extends TLiteralValue, T extends TSchema>(K: K, T: T, options: ObjectOptions): TFromLiteralKey<K, T> {
    return RecordCreateFromKeys([(K as string).toString()], T, options) as TFromLiteralKey<K, T>
  }
// ------------------------------------------------------------------
// TFromRegExpKey
// ------------------------------------------------------------------
// prettier-ignore
type TFromRegExpKey<_ extends TRegExp, T extends TSchema> = (
    Ensure<TRecord<TRegExp, T>>
  )
// prettier-ignore
function FromRegExpKey<K extends TRegExp, T extends TSchema>(K: K, T: T, options: ObjectOptions): TFromRegExpKey<K, T> {
    return RecordCreateFromPattern(K.source, T, options) as TFromRegExpKey<K, T>
  }
// ------------------------------------------------------------------
// FromStringKey
// ------------------------------------------------------------------
// prettier-ignore
type TFromStringKey<_ extends TString, T extends TSchema> = (
    Ensure<TRecord<TString, T>>
  )
// prettier-ignore
function FromStringKey<K extends TString, T extends TSchema>(K: K, T: T, options: ObjectOptions): TFromStringKey<K, T> {
    const pattern = IsUndefined(K.pattern) ? PatternStringExact : K.pattern as string
    return RecordCreateFromPattern(pattern, T, options) as TFromStringKey<K, T>
  }
// ------------------------------------------------------------------
// FromIntegerKey
// ------------------------------------------------------------------
// prettier-ignore
type TFromIntegerKey<_ extends TSchema, T extends TSchema> = (
    Ensure<TRecord<TNumber, T>>
  )
// prettier-ignore
function FromIntegerKey<K extends TInteger, T extends TSchema>(_: K, T: T, options: ObjectOptions): TFromIntegerKey<K, T> {
    return RecordCreateFromPattern(PatternNumberExact, T, options) as TFromIntegerKey<K, T>
  }
// ------------------------------------------------------------------
// FromNumberKey
// ------------------------------------------------------------------
// prettier-ignore
type TFromNumberKey<_ extends TSchema, T extends TSchema> = (
    Ensure<TRecord<TNumber, T>>
  )
// prettier-ignore
function FromNumberKey<K extends TNumber, T extends TSchema>(_: K, T: T, options: ObjectOptions): TFromNumberKey<K, T> {
    return RecordCreateFromPattern(PatternNumberExact, T, options) as TFromNumberKey<K, T>
  }
// ------------------------------------------------------------------
// TRecord
// ------------------------------------------------------------------
// prettier-ignore
type RecordStatic<K extends TSchema, T extends TSchema, P extends unknown[]> = (
    Evaluate<Record<Assert<Static<K>, PropertyKey>, Static<T, P>>>
  )
// prettier-ignore
export interface TRecord<K extends TSchema = TSchema, T extends TSchema = TSchema> extends TSchema {
    [Kind]: 'Record'
    static: RecordStatic<K, T, this['params']>
    type: 'object'
    patternProperties: { [pattern: string]: T }
    additionalProperties: TAdditionalProperties
  }
// ------------------------------------------------------------------
// TRecordOrObject
// ------------------------------------------------------------------
// prettier-ignore
export type TRecordOrObject<K extends TSchema, T extends TSchema> =
    K extends TTemplateLiteral ? TFromTemplateLiteralKey<K, T> :  
    K extends TEnum<infer S> ? TFromEnumKey<S, T> : // (Special: Ensure resolve Enum before Union)
    K extends TUnion<infer S> ? TFromUnionKey<S, T> :
    K extends TLiteral<infer S> ? TFromLiteralKey<S, T> :
    K extends TInteger ? TFromIntegerKey<K, T> :
    K extends TNumber ? TFromNumberKey<K, T> :
    K extends TRegExp ? TFromRegExpKey<K, T> :
    K extends TString ? TFromStringKey<K, T> :
    TNever
// ------------------------------------------------------------------
// TRecordOrObject
// ------------------------------------------------------------------
/** `[Json]` Creates a Record type */
export function Record<K extends TSchema, T extends TSchema>(K: K, T: T, options: ObjectOptions = {}): TRecordOrObject<K, T> {
  // prettier-ignore
  return (
      IsUnion(K) ? FromUnionKey(K.anyOf, T, options) :
      IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) :
      IsLiteral(K) ? FromLiteralKey(K.const, T, options) :
      IsInteger(K) ? FromIntegerKey(K, T, options) :
      IsNumber(K) ? FromNumberKey(K, T, options) :
      IsRegExp(K) ? FromRegExpKey(K, T, options) :
      IsString(K) ? FromStringKey(K, T, options) :
      Never(options)
    ) as TRecordOrObject<K, T>
}

//#endregion
//#region
// ------------------------------------------------------------------
// TThis
// ------------------------------------------------------------------
export interface TThis extends TSchema {
  [Kind]: "This";
  static: this["params"][0];
  $ref: string;
}
// ------------------------------------------------------------------
// RecursiveStatic
// ------------------------------------------------------------------
type RecursiveStatic<T extends TSchema> = Static<T, [RecursiveStatic<T>]>;
// ------------------------------------------------------------------
// TRecursive
// ------------------------------------------------------------------
export interface TRecursive<T extends TSchema> extends TSchema {
  [Hint]: "Recursive";
  static: RecursiveStatic<T>;
}
// Auto Tracked For Recursive Types without ID's
let Ordinal = 0;
/** `[Json]` Creates a Recursive type */
export function Recursive<T extends TSchema>(callback: (thisType: TThis) => T, options: SchemaOptions = {}): TRecursive<T> {
  if (IsUndefined(options.$id)) (options as any).$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` } as any);
  thisType.$id = options.$id;
  // prettier-ignore
  return CloneType({ ...options, [Hint]: 'Recursive', ...thisType }) as unknown as TRecursive<T>
}

//#endregion
//#region
export interface TRef<T extends TSchema = TSchema> extends TSchema {
  [Kind]: "Ref";
  static: Static<T, this["params"]>;
  $ref: string;
}
/** `[Json]` Creates a Ref type. The referenced type must contain a $id */
export function Ref<T extends TSchema>(schema: T, options?: SchemaOptions): TRef<T>;
/** `[Json]` Creates a Ref type. */
export function Ref<T extends TSchema>($ref: string, options?: SchemaOptions): TRef<T>;
/** `[Json]` Creates a Ref type. */
export function Ref(unresolved: TSchema | string, options: SchemaOptions = {}) {
  if (IsString(unresolved)) return { ...options, [Kind]: "Ref", $ref: unresolved };
  //@ts-ignore
  if (IsUndefined(unresolved.$id)) throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    //@ts-ignore
    $ref: unresolved.$id!,
  };
}

//#endregion
//#region
type TupleStatic<T extends TSchema[], P extends unknown[], Acc extends unknown[] = []> = T extends [
  infer L extends TSchema,
  ...infer R extends TSchema[]
]
  ? TupleStatic<R, P, [...Acc, Static<L, P>]>
  : Acc;
// ------------------------------------------------------------------
// TTuple
// ------------------------------------------------------------------
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
export function Tuple<T extends TSchema[]>(items: [...T], options: SchemaOptions = {}): TTuple<T> {
  // return TupleResolver.Resolve(T)
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  // prettier-ignore
  return (
    items.length > 0 ?
      { ...options, [Kind]: 'Tuple', type: 'array', items: CloneRest(items), additionalItems, minItems, maxItems } :
      { ...options, [Kind]: 'Tuple', type: 'array', minItems, maxItems }
  ) as unknown as TTuple<T>
}

//#endregion
//#region []

// ------------------------------------------------------------------
// DecodeType
// ------------------------------------------------------------------
// prettier-ignore
export type DecodeProperties<T extends TProperties> = {
    [K in keyof T]: DecodeType<T[K]>
  }
// prettier-ignore
export type DecodeRest<T extends TSchema[], Acc extends TSchema[] = []> = 
    T extends [infer L extends TSchema, ...infer R extends TSchema[]]
      ? DecodeRest<R, [...Acc, DecodeType<L>]>
      : Acc
// prettier-ignore
export type DecodeType<T extends TSchema> = (
    T extends TOptional<infer S extends TSchema> ? TOptional<DecodeType<S>> :
    T extends TReadonly<infer S extends TSchema> ? TReadonly<DecodeType<S>> :
    T extends TTransform<infer _, infer R> ? TUnsafe<R> :
    T extends TArray<infer S extends TSchema> ? TArray<DecodeType<S>> :
    T extends TAsyncIterator<infer S extends TSchema> ? TAsyncIterator<DecodeType<S>> :
    T extends TConstructor<infer P extends TSchema[], infer R extends TSchema> ? TConstructor<DecodeRest<P>, DecodeType<R>> :
    T extends TEnum<infer S> ? TEnum<S> : // intercept for union. interior non decodable
    T extends TFunction<infer P extends TSchema[], infer R extends TSchema> ? TFunction<DecodeRest<P>, DecodeType<R>> :
    T extends TIntersect<infer S extends TSchema[]> ? TIntersect<DecodeRest<S>> :
    T extends TIterator<infer S extends TSchema> ? TIterator<DecodeType<S>> :
    T extends TNot<infer S extends TSchema> ? TNot<DecodeType<S>> :
    T extends TObject<infer S> ? TObject<Evaluate<DecodeProperties<S>>> :
    T extends TPromise<infer S extends TSchema> ? TPromise<DecodeType<S>> :
    T extends TRecord<infer K, infer S> ? TRecord<K, DecodeType<S>> :
    T extends TRecursive<infer S extends TSchema> ? TRecursive<DecodeType<S>> :
    T extends TRef<infer S extends TSchema> ? TRef<DecodeType<S>> :
    T extends TTuple<infer S extends TSchema[]> ? TTuple<DecodeRest<S>> :
    T extends TUnion<infer S extends TSchema[]> ? TUnion<DecodeRest<S>> :
    T
  )
// ------------------------------------------------------------------
// Static
// ------------------------------------------------------------------
/** Creates an decoded static type from a TypeBox type */
export type StaticDecode<T extends TSchema, P extends unknown[] = []> = Static<DecodeType<T>, P>;
/** Creates an encoded static type from a TypeBox type */
export type StaticEncode<T extends TSchema, P extends unknown[] = []> = Static<T, P>;
/** Creates a static type from a TypeBox type */
export type Static<T extends TSchema, P extends unknown[] = []> = (T & { params: P })["static"];

//#endregion
//#region [ /Users/paulvu/v/pkgs/typebox/src/type/tuple/tuple.ts ]
export interface TAny extends TSchema {
  [Kind]: "Any";
  static: any;
}

/** `[Json]` Creates an Any type */
export function Any(options: SchemaOptions = {}): TAny {
  return { ...options, [Kind]: "Any" } as unknown as TAny;
}

//#endregion
//#region [ PATH ]
export interface TUnknown extends TSchema {
  [Kind]: "Unknown";
  static: unknown;
}
/** `[Json]` Creates an Unknown type */
export function Unknown(options: SchemaOptions = {}): TUnknown {
  return {
    ...options,
    [Kind]: "Unknown",
  } as unknown as TUnknown;
}

//#endregion
//#region [ PATH ]
//#endregion
//#region [ PATH ]

// export type TSymbolValue = string | number | undefined
// export interface TSymbol extends TSchema, SchemaOptions {
//   [Kind]: 'Symbol'
//   static: symbol
//   type: 'symbol'
// }
/** `[JavaScript]` Creates a Symbol type */
// export function Symbol(options?: SchemaOptions): TSymbol {
//   return { ...options, [Kind]: 'Symbol', type: 'symbol' } as unknown as TSymbol
// }

//#endregion
//#region  [PATH]
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
export function _Uint8Array(options: Uint8ArrayOptions = {}): TUint8Array {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" } as unknown as TUint8Array;
}
//#endregion
//#region [ PATH ]

export interface TNull extends TSchema {
  [Kind]: "Null";
  static: null;
  type: "null";
}
/** `[Json]` Creates a Null type */
export function Null(options: SchemaOptions = {}): TNull {
  return {
    ...options,
    [Kind]: "Null",
    type: "null",
  } as unknown as TNull;
}

//#endregion

//#region
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
export function _Date(options: DateOptions = {}): TDate {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date",
  } as unknown as TDate;
}

//#endregion

//#region [ /src/type/optional/optional-from-mapped-result.ts ]
// ------------------------------------------------------------------
// FromProperties
// ------------------------------------------------------------------
// prettier-ignore
type TFromProperties<
  P extends TProperties,
  F extends boolean,
> = (
  { [K2 in keyof P]: TOptionalWithFlag<P[K2], F> }   
)
// prettier-ignore
function FromProperties<
  P extends TProperties,
  F extends boolean,
>(P: P, F: F): TFromProperties<P, F> {
  return globalThis.Object.getOwnPropertyNames(P).reduce((Acc, K2) => {
    return {...Acc, [K2]: Optional(P[K2], F) }
  }, {}) as TFromProperties<P, F>
}
// ------------------------------------------------------------------
// FromMappedResult
// ------------------------------------------------------------------
// prettier-ignore
type TFromMappedResult<
  R extends TMappedResult,
  F extends boolean,
> = (
  TFromProperties<R['properties'], F>
)
// prettier-ignore
function FromMappedResult<
  R extends TMappedResult,
  F extends boolean,
>(R: R, F: F): TFromMappedResult<R, F> {
  return FromProperties(R.properties, F) as TFromMappedResult<R, F>
}
// ------------------------------------------------------------------
// OptionalFromMappedResult
// ------------------------------------------------------------------
// prettier-ignore
export type TOptionalFromMappedResult<
  R extends TMappedResult,
  F extends boolean,
  P extends TProperties = TFromMappedResult<R, F>
> = (
  TMappedResult<P>
)
// prettier-ignore
export function OptionalFromMappedResult<
  R extends TMappedResult,
  F extends boolean,
  P extends TProperties = TFromMappedResult<R, F>
>(R: R, F: F): TMappedResult<P> {
  const P = FromMappedResult(R, F) as unknown as P
  return MappedResult(P) 
}

//#endregion

//#region [ /src/type/mapped/mapped-result.ts ]
export interface TMappedResult<T extends TProperties = TProperties> extends TSchema {
  [Kind]: "MappedResult";
  properties: T;
  static: unknown;
}
// prettier-ignore
export function MappedResult<T extends TProperties>(properties: T): TMappedResult<T> {
  return {
    [Kind]: 'MappedResult',
    properties
  } as never
}

//#endregion

//#region [ /src/type/discard/discard.ts ]

function DiscardKey(value: Record<PropertyKey, any>, key: PropertyKey) {
  const { [key]: _, ...rest } = value;
  return rest;
}
export function Discard(value: Record<PropertyKey, any>, keys: PropertyKey[]) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value);
}

//#endregion

//#region [ /src/type/optional/optional.ts ]
type TRemoveOptional<T extends TSchema> = T extends TOptional<infer S> ? S : T;
function RemoveOptional<T extends TSchema>(schema: T) {
  return Discard(CloneType(schema), [OptionalKind]);
}
// ------------------------------------------------------------------
// AddOptional
// ------------------------------------------------------------------
type TAddOptional<T extends TSchema> = T extends TOptional<infer S> ? TOptional<S> : Ensure<TOptional<T>>;
function AddOptional<T extends TSchema>(schema: T) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
}
// prettier-ignore
export type TOptionalWithFlag<T extends TSchema, F extends boolean> = 
  F extends false 
    ? TRemoveOptional<T> 
    : TAddOptional<T>
// prettier-ignore
function OptionalWithFlag<T extends TSchema, F extends boolean>(schema: T, F: F) {
  return (
    F === false
      ? RemoveOptional(schema)
      : AddOptional(schema)
  )
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
export type TOptional<T extends TSchema> = T & { [OptionalKind]: "Optional" };

/** `[Json]` Creates a Optional property */
export function Optional<T extends TMappedResult, F extends boolean>(schema: T, enable: F): TOptionalFromMappedResult<T, F>;
/** `[Json]` Creates a Optional property */
export function Optional<T extends TSchema, F extends boolean>(schema: T, enable: F): TOptionalWithFlag<T, F>;
/** `[Json]` Creates a Optional property */
export function Optional<T extends TMappedResult>(schema: T): TOptionalFromMappedResult<T, true>;
/** `[Json]` Creates a Optional property */
export function Optional<T extends TSchema>(schema: T): TOptionalWithFlag<T, true>;
/** `[Json]` Creates a Optional property */
export function Optional(schema: TSchema, enable?: boolean): any {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

//#endregion

//#region [PATH]
export interface TUndefined extends TSchema {
  [Kind]: "Undefined";
  static: undefined;
  type: "undefined";
}
/** `[JavaScript]` Creates a Undefined type */
export function Undefined(options: SchemaOptions = {}): TUndefined {
  return { ...options, [Kind]: "Undefined", type: "undefined" } as unknown as TUndefined;
}

//#endregion

//#region  [PATH]
export interface TVoid extends TSchema {
  [Kind]: "Void";
  static: void;
  type: "void";
}
/** `[JavaScript]` Creates a Void type */
export function Void(options: SchemaOptions = {}): TVoid {
  return {
    ...options,
    [Kind]: "Void",
    type: "void",
  } as unknown as TVoid;
}
//#endregion

//#region [ /src/type/guard/type.ts ] MODIFIED added ts-ignore on new Regex

export class TypeGuardUnknownTypeError extends TypeBoxError {}

const KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void",
];
function IsPattern(value: unknown): value is string {
  try {
    //@ts-ignore
    new RegExp(value as string);
    return true;
  } catch {
    return false;
  }
}
function IsControlCharacterFree(value: unknown): value is string {
  if (!ValueGuard.IsString(value)) return false;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if ((code >= 7 && code <= 13) || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
}
function IsAdditionalProperties(value: unknown): value is TAdditionalProperties {
  return IsOptionalBoolean(value) || IsSchema(value);
}
function IsOptionalBigInt(value: unknown): value is bigint | undefined {
  return ValueGuard.IsUndefined(value) || ValueGuard.IsBigInt(value);
}
function IsOptionalNumber(value: unknown): value is number | undefined {
  return ValueGuard.IsUndefined(value) || ValueGuard.IsNumber(value);
}
function IsOptionalBoolean(value: unknown): value is boolean | undefined {
  return ValueGuard.IsUndefined(value) || ValueGuard.IsBoolean(value);
}
function IsOptionalString(value: unknown): value is string | undefined {
  return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value);
}
function IsOptionalPattern(value: unknown): value is string | undefined {
  return ValueGuard.IsUndefined(value) || (ValueGuard.IsString(value) && IsControlCharacterFree(value) && IsPattern(value));
}
function IsOptionalFormat(value: unknown): value is string | undefined {
  return ValueGuard.IsUndefined(value) || (ValueGuard.IsString(value) && IsControlCharacterFree(value));
}
function IsOptionalSchema(value: unknown): value is boolean | undefined {
  return ValueGuard.IsUndefined(value) || IsSchema(value);
}
// ------------------------------------------------------------------
// Modifiers
// ------------------------------------------------------------------
/** Returns true if this value has a Readonly symbol */
export function IsReadonly<T extends TSchema>(value: T): value is TReadonly<T> {
  return ValueGuard.IsObject(value) && value[ReadonlyKind] === "Readonly";
}
/** Returns true if this value has a Optional symbol */
export function IsOptional<T extends TSchema>(value: T): value is TOptional<T> {
  return ValueGuard.IsObject(value) && value[OptionalKind] === "Optional";
}
// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
/** Returns true if the given value is TAny */
export function IsAny(value: unknown): value is TAny {
  // prettier-ignore
  return (
    IsKindOf(value, 'Any') &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TArray */
export function IsArray(value: unknown): value is TArray {
  return (
    IsKindOf(value, "Array") &&
    value.type === "array" &&
    IsOptionalString(value.$id) &&
    IsSchema(value.items) &&
    IsOptionalNumber(value.minItems) &&
    IsOptionalNumber(value.maxItems) &&
    IsOptionalBoolean(value.uniqueItems) &&
    IsOptionalSchema(value.contains) &&
    IsOptionalNumber(value.minContains) &&
    IsOptionalNumber(value.maxContains)
  );
}
/** Returns true if the given value is TAsyncIterator */
export function IsAsyncIterator(value: unknown): value is TAsyncIterator {
  // prettier-ignore
  return (
    IsKindOf(value, 'AsyncIterator') &&
    value.type === 'AsyncIterator' &&
    IsOptionalString(value.$id) &&
    IsSchema(value.items)
  )
}
/** Returns true if the given value is TBigInt */
export function IsBigInt(value: unknown): value is TBigInt {
  // prettier-ignore
  return (
    IsKindOf(value, 'BigInt') &&
    value.type === 'bigint' &&
    IsOptionalString(value.$id) &&
    IsOptionalBigInt(value.exclusiveMaximum) &&
    IsOptionalBigInt(value.exclusiveMinimum) &&
    IsOptionalBigInt(value.maximum) &&
    IsOptionalBigInt(value.minimum) &&
    IsOptionalBigInt(value.multipleOf)
  )
}
/** Returns true if the given value is TBoolean */
export function IsBoolean(value: unknown): value is TBoolean {
  // prettier-ignore
  return (
    IsKindOf(value, 'Boolean') &&
    value.type === 'boolean' &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TConstructor */
export function IsConstructor(value: unknown): value is TConstructor {
  // prettier-ignore
  return (
    IsKindOf(value, 'Constructor') &&
    value.type === 'Constructor' &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsArray(value.parameters) &&
    value.parameters.every(schema => IsSchema(schema)) &&
    IsSchema(value.returns)
  )
}
/** Returns true if the given value is TDate */
export function IsDate(value: unknown): value is TDate {
  return (
    IsKindOf(value, "Date") &&
    value.type === "Date" &&
    IsOptionalString(value.$id) &&
    IsOptionalNumber(value.exclusiveMaximumTimestamp) &&
    IsOptionalNumber(value.exclusiveMinimumTimestamp) &&
    IsOptionalNumber(value.maximumTimestamp) &&
    IsOptionalNumber(value.minimumTimestamp) &&
    IsOptionalNumber(value.multipleOfTimestamp)
  );
}
/** Returns true if the given value is TFunction */
export function IsFunction(value: unknown): value is TFunction {
  // prettier-ignore
  return (
    IsKindOf(value, 'Function') &&
    value.type === 'Function' &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsArray(value.parameters) &&
    value.parameters.every(schema => IsSchema(schema)) &&
    IsSchema(value.returns)
  )
}
/** Returns true if the given value is TInteger */
export function IsInteger(value: unknown): value is TInteger {
  return (
    IsKindOf(value, "Integer") &&
    value.type === "integer" &&
    IsOptionalString(value.$id) &&
    IsOptionalNumber(value.exclusiveMaximum) &&
    IsOptionalNumber(value.exclusiveMinimum) &&
    IsOptionalNumber(value.maximum) &&
    IsOptionalNumber(value.minimum) &&
    IsOptionalNumber(value.multipleOf)
  );
}
/** Returns true if the given schema is TProperties */
export function IsProperties(value: unknown): value is TProperties {
  // prettier-ignore
  return (
    ValueGuard.IsObject(value) && 

    Object.entries(value).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema(schema))
  )
}
/** Returns true if the given value is TIntersect */
export function IsIntersect(value: unknown): value is TIntersect {
  // prettier-ignore
  return (
    IsKindOf(value, 'Intersect') &&
    (ValueGuard.IsString(value.type) && value.type !== 'object' ? false : true) &&
    ValueGuard.IsArray(value.allOf) &&
    value.allOf.every(schema => IsSchema(schema) && !IsTransform(schema)) &&
    IsOptionalString(value.type) &&
    (IsOptionalBoolean(value.unevaluatedProperties) || IsOptionalSchema(value.unevaluatedProperties)) &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TIterator */
export function IsIterator(value: unknown): value is TIterator {
  // prettier-ignore
  return (
    IsKindOf(value, 'Iterator') &&
    value.type === 'Iterator' &&
    IsOptionalString(value.$id) &&
    IsSchema(value.items)
  )
}
/** Returns true if the given value is a TKind with the given name. */
export function IsKindOf<T extends string>(value: unknown, kind: T): value is Record<PropertyKey, unknown> & { [Kind]: T } {
  return ValueGuard.IsObject(value) && Kind in value && value[Kind] === kind;
}
/** Returns true if the given value is TLiteral<string> */
export function IsLiteralString(value: unknown): value is TLiteral<string> {
  return IsLiteral(value) && ValueGuard.IsString(value.const);
}
/** Returns true if the given value is TLiteral<number> */
export function IsLiteralNumber(value: unknown): value is TLiteral<number> {
  return IsLiteral(value) && ValueGuard.IsNumber(value.const);
}
/** Returns true if the given value is TLiteral<boolean> */
export function IsLiteralBoolean(value: unknown): value is TLiteral<boolean> {
  return IsLiteral(value) && ValueGuard.IsBoolean(value.const);
}
/** Returns true if the given value is TLiteral */
export function IsLiteral(value: unknown): value is TLiteral {
  // prettier-ignore
  return (
    IsKindOf(value, 'Literal') &&
    IsOptionalString(value.$id) && IsLiteralValue(value.const)
  )
}
/** Returns true if the given value is a TLiteralValue */
export function IsLiteralValue(value: unknown): value is TLiteralValue {
  return ValueGuard.IsBoolean(value) || ValueGuard.IsNumber(value) || ValueGuard.IsString(value);
}
/** Returns true if the given value is a TMappedKey */
export function IsMappedKey(value: unknown): value is TMappedKey {
  // prettier-ignore
  return (
    IsKindOf(value, 'MappedKey') &&
    ValueGuard.IsArray(value.keys) &&
    value.keys.every(key => ValueGuard.IsNumber(key) || ValueGuard.IsString(key))
  )
}
/** Returns true if the given value is TMappedResult */
export function IsMappedResult(value: unknown): value is TMappedResult {
  // prettier-ignore
  return (
    IsKindOf(value, 'MappedResult') && 
    IsProperties(value.properties)
  )
}
/** Returns true if the given value is TNever */
export function IsNever(value: unknown): value is TNever {
  // prettier-ignore
  return (
    IsKindOf(value, 'Never') &&
    ValueGuard.IsObject(value.not) &&
    Object.getOwnPropertyNames(value.not).length === 0
  )
}
/** Returns true if the given value is TNot */
export function IsNot(value: unknown): value is TNot {
  // prettier-ignore
  return (
    IsKindOf(value, 'Not') &&
    IsSchema(value.not)
  )
}
/** Returns true if the given value is TNull */
export function IsNull(value: unknown): value is TNull {
  // prettier-ignore
  return (
    IsKindOf(value, 'Null') &&
    value.type === 'null' &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TNumber */
export function IsNumber(value: unknown): value is TNumber {
  return (
    IsKindOf(value, "Number") &&
    value.type === "number" &&
    IsOptionalString(value.$id) &&
    IsOptionalNumber(value.exclusiveMaximum) &&
    IsOptionalNumber(value.exclusiveMinimum) &&
    IsOptionalNumber(value.maximum) &&
    IsOptionalNumber(value.minimum) &&
    IsOptionalNumber(value.multipleOf)
  );
}
Object;
/** Returns true if the given value is TObject */
export function IsObject(value: unknown): value is TObject {
  // prettier-ignore
  return (
    IsKindOf(value, 'Object') &&
    value.type === 'object' &&
    IsOptionalString(value.$id) &&
    IsProperties(value.properties) &&
    IsAdditionalProperties(value.additionalProperties) &&
    IsOptionalNumber(value.minProperties) &&
    IsOptionalNumber(value.maxProperties)
  )
}
/** Returns true if the given value is TPromise */
export function IsPromise(value: unknown): value is TPromise {
  // prettier-ignore
  return (
    IsKindOf(value, 'Promise') &&
    value.type === 'Promise' &&
    IsOptionalString(value.$id) &&
    IsSchema(value.item)
  )
}
/** Returns true if the given value is TRecord */
export function IsRecord(value: unknown): value is TRecord {
  // prettier-ignore
  return (
    IsKindOf(value, 'Record') &&
    value.type === 'object' &&
    IsOptionalString(value.$id) &&
    IsAdditionalProperties(value.additionalProperties) &&
    ValueGuard.IsObject(value.patternProperties) &&
    ((schema: Record<PropertyKey, unknown>) => {
      const keys = Object.getOwnPropertyNames(schema.patternProperties)
      return (
        keys.length === 1 &&
        IsPattern(keys[0]) &&
        ValueGuard.IsObject(schema.patternProperties) &&
        IsSchema(schema.patternProperties[keys[0]])
      )
    })(value)
  )
}
/** Returns true if this value is TRecursive */
export function IsRecursive(value: unknown): value is { [Hint]: "Recursive" } {
  return ValueGuard.IsObject(value) && Hint in value && value[Hint] === "Recursive";
}
/** Returns true if the given value is TRef */
export function IsRef(value: unknown): value is TRef {
  // prettier-ignore
  return (
    IsKindOf(value, 'Ref') &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsString(value.$ref)
  )
}
/** Returns true if the given value is TRegExp */
export function IsRegExp(value: unknown): value is TRegExp {
  // prettier-ignore
  return (
    IsKindOf(value, 'RegExp') &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsString(value.source) &&
    ValueGuard.IsString(value.flags)
  )
}
/** Returns true if the given value is TString */
export function IsString(value: unknown): value is TString {
  // prettier-ignore
  return (
    IsKindOf(value, 'String') &&
    value.type === 'string' &&
    IsOptionalString(value.$id) &&
    IsOptionalNumber(value.minLength) &&
    IsOptionalNumber(value.maxLength) &&
    IsOptionalPattern(value.pattern) &&
    IsOptionalFormat(value.format)
  )
}
/** Returns true if the given value is TSymbol */
export function IsSymbol(value: unknown): value is Symbol {
  // prettier-ignore
  return (
    IsKindOf(value, 'Symbol') &&
    value.type === 'symbol' &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TTemplateLiteral */
export function IsTemplateLiteral(value: unknown): value is TTemplateLiteral<TTemplateLiteralKind[]> {
  // prettier-ignore
  return (
    IsKindOf(value, 'TemplateLiteral') &&
    value.type === 'string' &&
    ValueGuard.IsString(value.pattern) &&
    value.pattern[0] === '^' &&
    value.pattern[value.pattern.length - 1] === '$'
  )
}
/** Returns true if the given value is TThis */
export function IsThis(value: unknown): value is TThis {
  // prettier-ignore
  return (
    IsKindOf(value, 'This') &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsString(value.$ref)
  )
}
/** Returns true of this value is TTransform */
export function IsTransform(value: unknown): value is { [TransformKind]: TransformOptions } {
  return ValueGuard.IsObject(value) && TransformKind in value;
}
/** Returns true if the given value is TTuple */
export function IsTuple(value: unknown): value is TTuple {
  // prettier-ignore
  return (
    IsKindOf(value, 'Tuple') &&
    value.type === 'array' &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsNumber(value.minItems) &&
    ValueGuard.IsNumber(value.maxItems) &&
    value.minItems === value.maxItems &&
    (( // empty
      ValueGuard.IsUndefined(value.items) &&
      ValueGuard.IsUndefined(value.additionalItems) &&
      value.minItems === 0
    ) || (
        ValueGuard.IsArray(value.items) &&
        value.items.every(schema => IsSchema(schema))
      ))
  )
}
/** Returns true if the given value is TUndefined */
export function IsUndefined(value: unknown): value is TUndefined {
  // prettier-ignore
  return (
    IsKindOf(value, 'Undefined') &&
    value.type === 'undefined' &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TUnion<Literal<string | number>[]> */
export function IsUnionLiteral(value: unknown): value is TUnion<TLiteral[]> {
  return IsUnion(value) && value.anyOf.every(schema => IsLiteralString(schema) || IsLiteralNumber(schema));
}
/** Returns true if the given value is TUnion */
export function IsUnion(value: unknown): value is TUnion {
  // prettier-ignore
  return (
    IsKindOf(value, 'Union') &&
    IsOptionalString(value.$id) &&
    ValueGuard.IsObject(value) &&
    ValueGuard.IsArray(value.anyOf) &&
    value.anyOf.every(schema => IsSchema(schema))
  )
}
/** Returns true if the given value is TUint8Array */
export function IsUint8Array(value: unknown): value is TUint8Array {
  // prettier-ignore
  return (
    IsKindOf(value, 'Uint8Array') &&
    value.type === 'Uint8Array' &&
    IsOptionalString(value.$id) &&
    IsOptionalNumber(value.minByteLength) &&
    IsOptionalNumber(value.maxByteLength)
  )
}
/** Returns true if the given value is TUnknown */
export function IsUnknown(value: unknown): value is TUnknown {
  // prettier-ignore
  return (
    IsKindOf(value, 'Unknown') &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is a raw TUnsafe */
export function IsUnsafe(value: unknown): value is TUnsafe<unknown> {
  return IsKindOf(value, "Unsafe");
}
/** Returns true if the given value is TVoid */
export function IsVoid(value: unknown): value is TVoid {
  // prettier-ignore
  return (
    IsKindOf(value, 'Void') &&
    value.type === 'void' &&
    IsOptionalString(value.$id)
  )
}
/** Returns true if the given value is TKind */
export function IsKind(value: unknown): value is Record<PropertyKey, unknown> & { [Kind]: string } {
  return ValueGuard.IsObject(value) && Kind in value && ValueGuard.IsString(value[Kind]) && !KnownTypes.includes(value[Kind] as string);
}
/** Returns true if the given value is TSchema */
export function IsSchema(value: unknown): value is TSchema {
  // prettier-ignore
  return (
    ValueGuard.IsObject(value)
  ) && (
      IsAny(value) ||
      IsArray(value) ||
      IsBoolean(value) ||
      IsBigInt(value) ||
      IsAsyncIterator(value) ||
      IsConstructor(value) ||
      IsDate(value) ||
      IsFunction(value) ||
      IsInteger(value) ||
      IsIntersect(value) ||
      IsIterator(value) ||
      IsLiteral(value) ||
      IsMappedKey(value) ||
      IsMappedResult(value) ||
      IsNever(value) ||
      IsNot(value) ||
      IsNull(value) ||
      IsNumber(value) ||
      IsObject(value) ||
      IsPromise(value) ||
      IsRecord(value) ||
      IsRef(value) ||
      IsRegExp(value) ||
      IsString(value) ||
      IsSymbol(value) ||
      IsTemplateLiteral(value) ||
      IsThis(value) ||
      IsTuple(value) ||
      IsUndefined(value) ||
      IsUnion(value) ||
      IsUint8Array(value) ||
      IsUnknown(value) ||
      IsUnsafe(value) ||
      IsVoid(value) ||
      IsKind(value)
    )
}

//#endregion

//#region  [PATH]
/** `[Json]` Omits compositing symbols from this schema. */
export function Strict<T extends TSchema>(schema: T): T {
  return JSON.parse(JSON.stringify(schema));
}
//#endregion

export type ObjectType = Record<PropertyKey, unknown>;
export function HasPropertyKey<K extends PropertyKey>(value: Record<any, unknown>, key: K): value is ObjectType & Record<K, unknown> {
  return key in value;
}

//------------------------
//TYPEBOX VALUE
//------------------------
//#region [PATH]
// ------------------------------------------------------------------
// Errors
// ------------------------------------------------------------------
export class ValueCreateError extends TypeBoxError {
  constructor(public readonly schema: TSchema, message: string) {
    super(message);
  }
}
// ------------------------------------------------------------------
// Create
// ------------------------------------------------------------------
function FromAny(schema: TAny, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return {};
  }
}
function FromArray(schema: TArray, references: TSchema[]): any {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return schema.default;
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map(item => {
      return Visit2(schema.items, references);
    });
  } else {
    return [];
  }
}
function FromAsyncIterator(schema: TAsyncIterator, references: TSchema[]) {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return (async function* () {})();
  }
}
function FromBigInt(schema: TBigInt, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return BigInt(0);
  }
}
function FromBoolean(schema: TBoolean, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return false;
  }
}
function FromConstructor(schema: TConstructor, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    const value = Visit2(schema.returns, references) as any;
    if (typeof value === "object" && !Array.isArray(value)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value)) {
            const self = this as any;
            self[key] = val;
          }
        }
      };
    } else {
      return class {};
    }
  }
}
function FromDate(schema: TDate, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date();
  }
}
function FromFunction(schema: TFunction, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return () => Visit2(schema.returns, references);
  }
}
function FromInteger(schema: TInteger, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
// function FromIntersect(schema: TIntersect, references: TSchema[]): any {
//   if (HasPropertyKey(schema, "default")) {
//     return schema.default;
//   } else {
//     // --------------------------------------------------------------
//     // Note: The best we can do here is attempt to instance each
//     // sub type and apply through object assign. For non-object
//     // sub types, we just escape the assignment and just return
//     // the value. In the latter case, this is typically going to
//     // be a consequence of an illogical intersection.
//     // --------------------------------------------------------------
//     const value = schema.allOf.reduce((acc, schema) => {
//       const next = Visit2(schema, references) as any;
//       return typeof next === "object" ? { ...acc, ...next } : next;
//     }, {});
//     if (!Check(schema, references, value)) throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
//     return value;
//   }
// }
function FromIterator(schema: TIterator, references: TSchema[]) {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return (function* () {})();
  }
}
function FromLiteral(schema: TLiteral, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return schema.const;
  }
}
function FromNever(schema: TNever, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
}
function FromNot(schema: TNot, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
}
function FromNull(schema: TNull, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return null;
  }
}
function FromNumber(schema: TNumber, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromObject(schema: TObject, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    const required = new Set(schema.required);
    return (
      schema.default ||
      Object.entries(schema.properties).reduce((acc, [key, schema]) => {
        return required.has(key) ? { ...acc, [key]: Visit2(schema, references) } : { ...acc };
      }, {})
    );
  }
}
function FromPromise(schema: TPromise, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return Promise.resolve(Visit2(schema.item, references));
  }
}
function FromRecord(schema: TRecord, references: TSchema[]): any {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    return propertyKeys.reduce((acc, key) => {
      return { ...acc, [key]: Visit2(valueSchema, references) };
    }, {});
  } else {
    return {};
  }
}
// function FromRef(schema: TRef, references: TSchema[]): any {
//   if (HasPropertyKey(schema, "default")) {
//     return schema.default;
//   } else {
//     return Visit(Deref(schema, references), references);
//   }
// }
function FromRegExp(schema: TRegExp, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
}
function FromString(schema: TString, references: TSchema[]): any {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return schema.default;
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return schema.default;
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (schema.minLength !== undefined) {
      // prettier-ignore
      return Array.from({ length: schema.minLength }).map(() => ' ').join('')
    } else {
      return "";
    }
  }
}
// function FromSymbol(schema: TSymbol, references: TSchema[]): any {
//   if (HasPropertyKey(schema, "default")) {
//     return schema.default;
//   } else if ("value" in schema) {
//     return Symbol.for(schema.value);
//   } else {
//     return Symbol();
//   }
// }
function FromTemplateLiteral(schema: TTemplateLiteral, references: TSchema[]) {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema) as string[];
  return generated[0];
}
// function FromThis(schema: TThis, references: TSchema[]): any {
//   if (recursiveDepth++ > recursiveMaxDepth)
//     throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
//   if (HasPropertyKey(schema, "default")) {
//     return schema.default;
//   } else {
//     return Visit(Deref(schema, references), references);
//   }
// }
function FromTuple(schema: TTuple, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit2((schema.items as any[])[index], references));
  }
}
function FromUndefined(schema: TUndefined, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return undefined;
  }
}
function $FromUnion(schema: TUnion, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit2(schema.anyOf[0], references);
  }
}
function FromUint8Array(schema: TUint8Array, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
}
function FromUnknown(schema: TUnknown, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return {};
  }
}
function FromVoid(schema: TVoid, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    return void 0;
  }
}
function FromKind(schema: TSchema, references: TSchema[]): any {
  if (HasPropertyKey(schema, "default")) {
    return schema.default;
  } else {
    throw new Error("User defined types must specify a default value");
  }
}
function Visit2(schema: TSchema, references: TSchema[]): unknown {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema as any;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny(schema_, references_);
    case "Array":
      return FromArray(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator(schema_, references_);
    case "BigInt":
      return FromBigInt(schema_, references_);
    case "Boolean":
      return FromBoolean(schema_, references_);
    case "Constructor":
      return FromConstructor(schema_, references_);
    case "Date":
      return FromDate(schema_, references_);
    case "Function":
      return FromFunction(schema_, references_);
    case "Integer":
      return FromInteger(schema_, references_);
    // case "Intersect":
    //   return FromIntersect(schema_, references_);
    case "Iterator":
      return FromIterator(schema_, references_);
    case "Literal":
      return FromLiteral(schema_, references_);
    case "Never":
      return FromNever(schema_, references_);
    case "Not":
      return FromNot(schema_, references_);
    case "Null":
      return FromNull(schema_, references_);
    case "Number":
      return FromNumber(schema_, references_);
    case "Object":
      return FromObject(schema_, references_);
    case "Promise":
      return FromPromise(schema_, references_);
    case "Record":
      return FromRecord(schema_, references_);
    // case "Ref":
    //   return FromRef(schema_, references_);
    case "RegExp":
      return FromRegExp(schema_, references_);
    case "String":
      return FromString(schema_, references_);
    // case "Symbol":
    // return FromSymbol(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral(schema_, references_);
    // case "This":
    // return FromThis(schema_, references_);
    case "Tuple":
      return FromTuple(schema_, references_);
    case "Undefined":
      return FromUndefined(schema_, references_);
    case "Union":
      return $FromUnion(schema_, references_);
    case "Uint8Array":
      return FromUint8Array(schema_, references_);
    case "Unknown":
      return FromUnknown(schema_, references_);
    case "Void":
      return FromVoid(schema_, references_);
    default:
      // if (!TypeRegistry.Has(schema_[Kind])) throw new ValueCreateError(schema_, 'Unknown type')
      return FromKind(schema_, references_);
  }
}
// ------------------------------------------------------------------
// State
// ------------------------------------------------------------------
const recursiveMaxDepth = 512;
let recursiveDepth = 0;
// ------------------------------------------------------------------
// Create
// ------------------------------------------------------------------
/** Creates a value from the given schema and references */
export function Create<T extends TSchema>(schema: T, references: TSchema[]): Static<T>;
/** Creates a value from the given schema */
export function Create<T extends TSchema>(schema: T): Static<T>;
/** Creates a value from the given schema */
export function Create(...args: any[]) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit2(args[0], args[1]) : Visit2(args[0], []);
}
//#endregion

// ---------------------
// TYPEBOX TEST SUITE PORTED TO MONOFILE TEST USING BUN RUNTIME
//---------------------
//currently demos how tests will be run in a single file
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
//--------------------------------------------------------------------------------
//  CODE AFTER THIS LINE IN THE NEXT SECTION IS PRIVATELY LICENSED CODE
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//  CODE AFTER THIS LINE IN THE NEXT SECTION IS PRIVATELY LICENSED CODE
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//  CODE AFTER THIS LINE IN THE NEXT SECTION IS PRIVATELY LICENSED CODE
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//  CODE AFTER THIS LINE IN THE NEXT SECTION IS PRIVATELY LICENSED CODE
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//  CODE AFTER THIS LINE IN THE NEXT SECTION IS PRIVATELY LICENSED CODE
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//  CODE AFTER THIS LINE IN THE NEXT SECTION IS PRIVATELY LICENSED CODE
//--------------------------------------------------------------------------------

//------------------------
// VTYPE EXPORT
//-----------------------
export const v = {
  object: _Object,
  array: _Array,
  string: String,
  number: Number,
  date: _Date,
  literal: Literal,
  record: Record,
  boolean: _Boolean,
  bool: _Boolean,
  optional: Optional,
  // template: TemplateLiteral,
  func: Function,
  union: Union,
  nul: Null,
  any: Any,
  promise: _Promise,
  void: Void,
  //
  strict: Strict,
  enum: Enum,
  never: Never,
};
//todo need to fix template literals
if (import.meta.main && import.meta.env.NODE_ENV !== "test") {
  const value = Create(
    v.object({
      array: v.array(v.string()),
      date: v.date(),
      record: v.record(v.string(), v.date()),
      bool: v.bool(),
    })
  );
  console.log("🚀 ~ value:", value);
}
