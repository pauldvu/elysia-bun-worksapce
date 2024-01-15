declare module "date-fns" {
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
    export const maxTime: number;
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
    export const minTime: number;
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
    export const secondsInDay: number;
    /**
     * @constant
     * @name secondsInWeek
     * @summary Seconds in 1 week.
     */
    export const secondsInWeek: number;
    /**
     * @constant
     * @name secondsInYear
     * @summary Seconds in 1 year.
     */
    export const secondsInYear: number;
    /**
     * @constant
     * @name secondsInMonth
     * @summary Seconds in 1 month
     */
    export const secondsInMonth: number;
    /**
     * @constant
     * @name secondsInQuarter
     * @summary Seconds in 1 quarter.
     */
    export const secondsInQuarter: number;
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
    export interface LocaleOptions extends WeekOptions, FirstWeekContainsDateOptions {
    }
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
    options?: FormatDistanceFnOptions) => string;
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
    export type FormatDistanceToken = "lessThanXSeconds" | "xSeconds" | "halfAMinute" | "lessThanXMinutes" | "xMinutes" | "aboutXHours" | "xHours" | "xDays" | "aboutXWeeks" | "xWeeks" | "aboutXMonths" | "xMonths" | "aboutXYears" | "xYears" | "overXYears" | "almostXYears";
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
    export type FormatRelativeFn = <DateType extends Date>(token: FormatRelativeToken, date: DateType, baseDate: DateType, options?: FormatRelativeFnOptions) => string;
    /**
     * The {@link FormatRelativeFn} function options.
     */
    export interface FormatRelativeFnOptions extends WeekOptions, LocalizedOptions<"options" | "formatRelative"> {
    }
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
    export type FormatRelativeTokenFn = <DateType extends Date>(date: DateType | number | string, baseDate: DateType | number | string, options?: FormatRelativeTokenFnOptions) => string;
    /**
     * The {@link FormatRelativeTokenFn} function options.
     */
    export interface FormatRelativeTokenFnOptions extends WeekOptions {
    }
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
        ordinalNumber: MatchFn<number, {
            unit: LocaleUnit;
        }>;
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
    export type MatchFn<Result, ExtraOptions = Record<string, unknown>> = (str: string, options?: MatchFnOptions<Result> & ExtraOptions) => MatchFnResult<Result> | null;
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
    export type NearestMinutes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
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
    export function toDate<DateType extends Date>(argument: DateType | number | string): DateType;
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
    export function constructFrom<DateType extends Date>(date: DateType | number | string, value: Date | number | string): DateType;
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
    export function addDays<DateType extends Date>(date: DateType | number | string, amount: number): DateType;
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
    export function subDays<DateType extends Date>(date: DateType | number | string, amount: number): DateType;
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
    export function addMilliseconds<DateType extends Date>(date: DateType | number | string, amount: number): DateType;
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
    export function addHours<DateType extends Date>(date: DateType | number | string, amount: number): DateType;
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
    export function addMonths<DateType extends Date>(date: DateType | number | string, amount: number): DateType;
    /**
     * The {@link eachDayOfInterval} function options.
     */
    export interface EachDayOfIntervalOptions extends StepOptions {
    }
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
    export function eachDayOfInterval<DateType extends Date>(interval: Interval<DateType>, options?: EachDayOfIntervalOptions): DateType[];
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
    export function endOfMonth<DateType extends Date>(date: DateType | number | string): DateType;
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
    export function isEqual<DateType extends Date>(leftDate: DateType | number | string, rightDate: DateType | number | string): boolean;
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
    export function getDay<DateType extends Date>(date: DateType | number | string): number;
    /**
     * The {@link startOfWeek} function options.
     */
    export interface StartOfWeekOptions extends LocalizedOptions<"options">, WeekOptions {
    }
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
    export function getDefaultOptions(): DefaultOptions;
    export function setDefaultOptions(newOptions: DefaultOptions): void;
    export function startOfWeek<DateType extends Date>(date: DateType | number | string, options?: StartOfWeekOptions): DateType;
    /**
     * The {@link endOfWeek} function options.
     */
    export interface EndOfWeekOptions extends WeekOptions, LocalizedOptions<"options"> {
    }
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
    export function endOfWeek<DateType extends Date>(date: DateType | number | string, options?: EndOfWeekOptions): DateType;
}
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
