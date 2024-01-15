/**
MIT License

Copyright (c) 2021 Sasha Koss and Lesha Koss https://kossnocorp.mit-license.org

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
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
export const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
export const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
export const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
export const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
export const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
export const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
export const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
export const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
export const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
export const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
export const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
export const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
export const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
export const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
export const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
export const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
export const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
export const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
export const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
export const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
export const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
export const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
export const secondsInQuarter = secondsInMonth * 3;

/**
 * The locale object with all functions and data needed to parse and format
 * dates. This is what each locale implements and exports.
 */
export interface Locale {
  /** The locale code (ISO 639-1 + optional country code) */
  code: string;
  /** The function to format distance */
  formatDistance: FormatDistanceFn;
  /** The function to relative time */
  formatRelative: FormatRelativeFn;
  /** The object with functions used to localize various values */
  localize: Localize;
  /** The object with functions that return localized formats */
  formatLong: FormatLong;
  /** The object with functions used to match and parse various localized values */
  match: Match;
  /** An object with locale options */
  options?: LocaleOptions;
}
/**
 * The locale options.
 */
export interface LocaleOptions extends WeekOptions, FirstWeekContainsDateOptions {}
/**
 * The function that takes a token (i.e. halfAMinute) passed by `formatDistance`
 * or `formatDistanceStrict` and payload, and returns localized distance.
 *
 * @param token - The token to localize
 * @param count - The distance number
 * @param options - The object with options
 *
 * @returns The localized distance in words
 */
export type FormatDistanceFn = (token: FormatDistanceToken, count: number, options?: FormatDistanceFnOptions) => string;
/**
 * The {@link FormatDistanceFn} function options.
 */
export interface FormatDistanceFnOptions {
  /** Add "X ago"/"in X" in the locale language */
  addSuffix?: boolean;
  /** The distance vector. -1 represents past and 1 future. Tells which suffix
   * to use. */
  comparison?: -1 | 0 | 1;
}
/**
 * The function used inside the {@link FormatDistanceFn} function, implementing
 * formatting for a particular token.
 */
export type FormatDistanceTokenFn = (
  /** The distance as number to format */
  count: number,
  /** The object with options */
  options?: FormatDistanceFnOptions
) => string;
/**
 * The tokens map to string templates used in the format distance function.
 * It looks like this:
 *
 *   const formatDistanceLocale: FormatDistanceLocale<FormatDistanceTokenValue> = {
 *     lessThanXSeconds: 'តិចជាង {{count}} វិនាទី',
 *     xSeconds: '{{count}} វិនាទី',
 *     // ...
 *   }
 *
 * @typeParam Template - The property value type.
 */
export type FormatDistanceLocale<Template> = {
  [Token in FormatDistanceToken]: Template;
};
/**
 * The token used in the format distance function. Represents the distance unit
 * with prespecified precision.
 */
export type FormatDistanceToken =
  | "lessThanXSeconds"
  | "xSeconds"
  | "halfAMinute"
  | "lessThanXMinutes"
  | "xMinutes"
  | "aboutXHours"
  | "xHours"
  | "xDays"
  | "aboutXWeeks"
  | "xWeeks"
  | "aboutXMonths"
  | "xMonths"
  | "aboutXYears"
  | "xYears"
  | "overXYears"
  | "almostXYears";
/**
 * The locale function that does the work for the `formatRelative` function.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param token - The token to localize
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - The object with options
 *
 * @returns The localized relative date format
 */
export type FormatRelativeFn = <DateType extends Date>(
  token: FormatRelativeToken,
  date: DateType,
  baseDate: DateType,
  options?: FormatRelativeFnOptions
) => string;
/**
 * The {@link FormatRelativeFn} function options.
 */
export interface FormatRelativeFnOptions extends WeekOptions, LocalizedOptions<"options" | "formatRelative"> {}
/**
 * The locale function used inside the {@link FormatRelativeFn} function
 * implementing formatting for a particular token.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - The object with options
 */
export type FormatRelativeTokenFn = <DateType extends Date>(
  date: DateType | number | string,
  baseDate: DateType | number | string,
  options?: FormatRelativeTokenFnOptions
) => string;
/**
 * The {@link FormatRelativeTokenFn} function options.
 */
export interface FormatRelativeTokenFnOptions extends WeekOptions {}
/**
 * The token used in format relative function. Represents the time unit.
 */
export type FormatRelativeToken = "lastWeek" | "yesterday" | "today" | "tomorrow" | "nextWeek" | "other";
/**
 * The object with functions used to localize various values. Part of the public
 * locale API.
 */
export interface Localize {
  /** The function that localizes an ordinal number */
  ordinalNumber: LocalizeFn<number>;
  /** The function that localized the era */
  era: LocalizeFn<Era>;
  /** The function that localizes the quarter */
  quarter: LocalizeFn<Quarter>;
  /** The function that localizes the month */
  month: LocalizeFn<Month>;
  /** The function that localizes the day of the week */
  day: LocalizeFn<Day>;
  /** The function that localizes the day period */
  dayPeriod: LocalizeFn<LocaleDayPeriod>;
}
/**
 * Individual localize function. Part of {@link Localize}.
 *
 * @typeParam Value - The value type to localize.
 *
 * @param value - The value to localize
 * @param options - The object with options
 *
 * @returns The localized string
 */
export type LocalizeFn<Value extends LocaleUnitValue | number> = (value: Value, options?: LocalizeFnOptions) => string;
/**
 * The {@link LocalizeFn} function options.
 */
export interface LocalizeFnOptions {
  /** The width to use formatting the value, defines how short or long
   * the formatted string might be. */
  width?: LocaleWidth;
  /** The context where the formatted value is used - standalone: the result
   * should make grammatical sense as is and formatting: the result is a part
   * of the formatted string. See: https://date-fns.org/docs/I18n-Contribution-Guide */
  context?: "formatting" | "standalone";
  /** The unit to format */
  unit?: LocaleUnit;
}
/**
 * The object with functions used to match and parse various localized values.
 */
export interface Match {
  /** The function that parses a localized ordinal number. */
  ordinalNumber: MatchFn<
    number,
    {
      unit: LocaleUnit;
    }
  >;
  /** The function that parses a localized era. */
  era: MatchFn<Era>;
  /** The function that parses a localized quarter. */
  quarter: MatchFn<Quarter>;
  /** The function that parses a localized month. */
  month: MatchFn<Month>;
  /** The function that parses a localized day of the week. */
  day: MatchFn<Day>;
  /** The function that parses a localized time of the day. */
  dayPeriod: MatchFn<LocaleDayPeriod>;
}
/**
 * The match function. Part of {@link Match}. Implements matcher for particular
 * unit type.
 *
 * @typeParam Result - The matched value type.
 * @typeParam ExtraOptions - The the extra options type.
 *
 * @param str - The string to match
 * @param options - The object with options
 *
 * @returns The match result or null if match failed
 */
export type MatchFn<Result, ExtraOptions = Record<string, unknown>> = (
  str: string,
  options?: MatchFnOptions<Result> & ExtraOptions
) => MatchFnResult<Result> | null;
/**
 * The {@link MatchFn} function options.
 *
 * @typeParam Result - The matched value type.
 */
export interface MatchFnOptions<Result> {
  /** The width to use matching the value, defines how short or long
   * the matched string might be. */
  width?: LocaleWidth;
  /**
   * @deprecated Map the value manually instead.
   * @example
   * const matchResult = locale.match.ordinalNumber('1st')
   * if (matchResult) {
   *   matchResult.value = valueCallback(matchResult.value)
   * }
   */
  valueCallback?: MatchValueCallback<string, Result>;
}
/**
 * The function that allows to map the matched value to the actual type.
 *
 * @typeParam Arg - The argument type.
 * @typeParam Result - The matched value type.
 *
 * @param arg - The value to match
 *
 * @returns The matched value
 */
export type MatchValueCallback<Arg, Result> = (value: Arg) => Result;
/**
 * The {@link MatchFn} function result.
 *
 * @typeParam Result - The matched value type.
 */
export interface MatchFnResult<Result> {
  /** The matched value parsed as the corresponding unit type */
  value: Result;
  /** The remaining string after parsing */
  rest: string;
}
/**
 * The object with functions that return localized formats. Long stands for
 * sequence of tokens (i.e. PPpp) that allows to define how format both date
 * and time at once. Part of the public locale API.
 */
export interface FormatLong {
  /** The function that returns a localized long date format */
  date: FormatLongFn;
  /** The function that returns a localized long time format */
  time: FormatLongFn;
  /** The function that returns a localized format of date and time combined */
  dateTime: FormatLongFn;
}
/**
 * The format long function. Formats date, time or both.
 *
 * @param options - The object with options
 *
 * @returns The localized string
 */
export type FormatLongFn = (options: FormatLongFnOptions) => string;
/**
 * The {@link FormatLongFn} function options.
 */
export interface FormatLongFnOptions {
  /** Format width to set */
  width?: FormatLongWidth;
}
/**
 * The format long width token, defines how short or long the formnatted value
 * might be. The actual result length is defined by the locale.
 */
export type FormatLongWidth = "full" | "long" | "medium" | "short" | "any";
/**
 * The formatting unit value, represents the raw value that can be formatted.
 */
export type LocaleUnitValue = Era | Quarter | Month | Day | LocaleDayPeriod;
/**
 * The format width. Defines how short or long the formatted string might be.
 * The actaul result length depends on the locale.
 */
export type LocaleWidth = "narrow" | "short" | "abbreviated" | "wide" | "any";
/**
 * Token representing particular period of the day.
 */
export type LocaleDayPeriod = "am" | "pm" | "midnight" | "noon" | "morning" | "afternoon" | "evening" | "night";
/**
 * The units commonly used in the date formatting or parsing.
 */
export type LocaleUnit = "second" | "minute" | "hour" | "day" | "dayOfYear" | "date" | "week" | "month" | "quarter" | "year";

/**
 * The generic date constructor. Replicates the Date constructor. Used to build
 * generic functions.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 */
export interface GenericDateConstructor<DateType extends Date = Date> {
  /**
   * The date constructor. Creates date with the current date and time.
   *
   * @returns The date instance
   */
  new (): DateType;
  /**
   * The date constructor. Creates date with the passed date, number of
   * milliseconds or string to parse.
   *
   * @param value - The date, number of milliseconds or string to parse
   *
   * @returns The date instance
   */
  new (value: Date | number | string): DateType;
  /**
   * The date constructor. Creates date with the passed date values (year,
   * month, etc.) Note that the month is 0-indexed.
   *
   * @param year - The year
   * @param month - The month. Note that the month is 0-indexed.
   * @param date - The day of the month
   * @param hours - The hours
   * @param minutes - The minutes
   * @param seconds - The seconds
   * @param ms - The milliseconds
   *
   * @returns The date instance
   */
  new (year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateType;
}
/**
 * The duration object. Contains the duration in the units specified by the
 * object.
 */
export interface Duration {
  /** The number of years in the duration */
  years?: number;
  /** The number of months in the duration */
  months?: number;
  /** The number of weeks in the duration */
  weeks?: number;
  /** The number of days in the duration */
  days?: number;
  /** The number of hours in the duration */
  hours?: number;
  /** The number of minutes in the duration */
  minutes?: number;
  /** The number of seconds in the duration */
  seconds?: number;
}
/**
 * The duration unit type alias.
 */
export type DurationUnit = keyof Duration;
/**
 * An object that combines two dates to represent the time interval.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 */
export interface Interval<DateType extends Date = Date> {
  /** The start of the interval. */
  start: DateType | number | string;
  /** The end of the interval. */
  end: DateType | number | string;
}
/**
 * A version of {@link Interval} that has both start and end resolved to Date.
 */
export interface NormalizedInterval<DateType extends Date = Date> {
  /** The start of the interval. */
  start: DateType;
  /** The end of the interval. */
  end: DateType;
}
/**
 * The era. Can be either 0 (AD - Anno Domini) or 1 (BC - Before Christ).
 */
export type Era = 0 | 1;
/**
 * The year quarter. Goes from 1 to 4.
 */
export type Quarter = 1 | 2 | 3 | 4;
/**
 * The day of the week type alias. Unlike the date (the number of days since
 * the beginning of the month), which begins with 1 and is dynamic (can go up to
 * 28, 30, or 31), the day starts with 0 and static (always ends at 6). Look at
 * it as an index in an array where Sunday is the first element and Saturday
 * is the last.
 */
export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/**
 * The month type alias. Goes from 0 to 11, where 0 is January and 11 is
 * December.
 */
export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
/**
 * FirstWeekContainsDate is used to determine which week is the first week of
 * the year, based on what day the January, 1 is in that week.
 *
 * The day in that week can only be 1 (Monday) or 4 (Thursday).
 *
 * Please see https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system for more information.
 */
export type FirstWeekContainsDate = 1 | 4;
/**
 * The date values, used to set or get date object values.
 */
export interface DateValues {
  /** The year */
  year?: number;
  /** The month */
  month?: number;
  /** The day of the month */
  date?: number;
  /** The hours */
  hours?: number;
  /** The minutes */
  minutes?: number;
  /** The seconds */
  seconds?: number;
  /** The milliseconds */
  milliseconds?: number;
}
/**
 * The number rounding method.
 */
export type RoundingMethod = "ceil" | "floor" | "round" | "trunc";
/**
 * The ISO string format.
 *
 * - basic: Minimal number of separators
 * - extended: With separators added to enhance human readability
 */
export type ISOStringFormat = "extended" | "basic";
/**
 * The ISO date representation. Represents which component the string includes,
 * date, time or both.
 */
export type ISOStringRepresentation = "complete" | "date" | "time";
/**
 * The step function options. Used to build function options.
 */
export interface StepOptions {
  /** The step to use when iterating */
  step?: number;
}
/**
 * The week function options. Used to build function options.
 */
export interface WeekOptions {
  /** Which day the week starts on. */
  weekStartsOn?: Day;
}
/**
 * The first week contains date options. Used to build function options.
 */
export interface FirstWeekContainsDateOptions {
  /** See {@link FirstWeekContainsDate} for more details. */
  firstWeekContainsDate?: FirstWeekContainsDate;
}
/**
 * The localized function options. Used to build function options.
 *
 * @typeParam LocaleFields - The locale fields used in the relevant function. Defines the minimum set of locale fields that must be provided.
 */
export interface LocalizedOptions<LocaleFields extends keyof Locale> {
  /** The locale to use in the function. */
  locale?: Pick<Locale, LocaleFields>;
}
/**
 * The ISO format function options. Used to build function options.
 */
export interface ISOFormatOptions {
  /** The format to use: basic with minimal number of separators or extended
   * with separators added to enhance human readability */
  format?: ISOStringFormat;
  /** The date representation - what component to format: date, time\
   * or both (complete) */
  representation?: ISOStringRepresentation;
}
/**
 * The rounding options. Used to build function options.
 */
export interface RoundingOptions {
  /** The rounding method to use */
  roundingMethod?: RoundingMethod;
}
/**
 * Additional tokens options. Used to build function options.
 */
export interface AdditionalTokensOptions {
  /** If true, allows usage of the week-numbering year tokens `YY` and `YYYY`.
   * See: https://date-fns.org/docs/Unicode-Tokens */
  useAdditionalWeekYearTokens?: boolean;
  /** If true, allows usage of the day of year tokens `D` and `DD`.
   * See: https://date-fns.org/docs/Unicode-Tokens */
  useAdditionalDayOfYearTokens?: boolean;
}
/**
 * Nearest minute type. Goes from 1 to 30, where 1 is the nearest minute and 30
 * is nearest half an hour.
 */
export type NearestMinutes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30;
/**
 * The nearest minutes function options. Used to build function options.
 */
export interface NearestMinutesOptions {
  /** The nearest number of minutes to round to. E.g. `15` to round to quarter hours. */
  nearestTo?: NearestMinutes;
}
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
export function toDate<DateType extends Date>(argument: DateType | number | string): DateType {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (typeof argument === "object" && argStr === "[object Date]")) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new (argument.constructor as GenericDateConstructor<DateType>)(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    // TODO: Can we get rid of as?
    return new Date(argument) as DateType;
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN) as DateType;
  }
}

/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from 'date-fns'
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use contrustor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   )
 * }
 */
export function constructFrom<DateType extends Date>(date: DateType | number | string, value: Date | number | string): DateType {
  if (date instanceof Date) {
    return new (date.constructor as GenericDateConstructor<DateType>)(value);
  } else {
    return new Date(value) as DateType;
  }
}

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
export function addDays<DateType extends Date>(date: DateType | number | string, amount: number): DateType {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
export function subDays<DateType extends Date>(date: DateType | number | string, amount: number): DateType {
  return addDays(date, -amount);
}

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be added.
 *
 * @returns The new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
export function addMilliseconds<DateType extends Date>(date: DateType | number | string, amount: number): DateType {
  const timestamp = +toDate(date);
  return constructFrom(date, timestamp + amount);
}

/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be added.
 *
 * @returns The new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
export function addHours<DateType extends Date>(date: DateType | number | string, amount: number): DateType {
  return addMilliseconds(date, amount * millisecondsInHour);
}
/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
export function addMonths<DateType extends Date>(date: DateType | number | string, amount: number): DateType {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return _date;
  }
}

/**
 * The {@link eachDayOfInterval} function options.
 */
export interface EachDayOfIntervalOptions extends StepOptions {}

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
export function eachDayOfInterval<DateType extends Date>(interval: Interval<DateType>, options?: EachDayOfIntervalOptions): DateType[] {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);

  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
export function endOfMonth<DateType extends Date>(date: DateType | number | string): DateType {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
export function isEqual<DateType extends Date>(leftDate: DateType | number | string, rightDate: DateType | number | string): boolean {
  const _dateLeft = toDate(leftDate);
  const _dateRight = toDate(rightDate);
  return +_dateLeft === +_dateRight;
}
/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
export function getDay<DateType extends Date>(date: DateType | number | string): number {
  const _date = toDate(date);
  const day = _date.getDay();
  return day;
}
/**
 * The {@link startOfWeek} function options.
 */
export interface StartOfWeekOptions extends LocalizedOptions<"options">, WeekOptions {}

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
export type DefaultOptions = LocalizedOptions<keyof Locale> & WeekOptions & FirstWeekContainsDateOptions;

let defaultOptions: DefaultOptions = {};

export function getDefaultOptions(): DefaultOptions {
  return defaultOptions;
}

export function setDefaultOptions(newOptions: DefaultOptions): void {
  defaultOptions = newOptions;
}

export function startOfWeek<DateType extends Date>(date: DateType | number | string, options?: StartOfWeekOptions): DateType {
  const defaultOptions = getDefaultOptions();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
/**
 * The {@link endOfWeek} function options.
 */
export interface EndOfWeekOptions extends WeekOptions, LocalizedOptions<"options"> {}

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
export function endOfWeek<DateType extends Date>(date: DateType | number | string, options?: EndOfWeekOptions): DateType {
  const defaultOptions = getDefaultOptions();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
