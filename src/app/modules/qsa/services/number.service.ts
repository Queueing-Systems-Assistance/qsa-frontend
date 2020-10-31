import { Injectable } from "@angular/core"

const STRING_START = '^'
const SIGN = '[-+]?'
const INTEGRAL_PART_WITH_DOT = '(?:[0-9]{0,30}\\.)?'
const FRACTIONAL_PART = '[0-9]{1,30}'
const SCIENTIFIC_FORM = '(?:[eE][-+]?\\d+)?'
const STRING_END = '$'

const TRAILING_0 = /0+$/
const TRAILING_DOT = /\.+$/
const EMPTY_STRING = ''
const ZERO = '0'
const DEFAULT_PRECISION = 3

const SCIENTIFIC_FORM_DECIMAL_PLACES = /(?:[eE]([+-]?\d+))?$/

@Injectable()
export class NumberService {
    public isNumber(value: string): boolean {
        return new RegExp(
            STRING_START + SIGN + INTEGRAL_PART_WITH_DOT + FRACTIONAL_PART + SCIENTIFIC_FORM + STRING_END
        ).test(value)
    }

    public isScientificZero(num: string, precision?: number): boolean {
        const currentPrecision = precision ? precision : DEFAULT_PRECISION
        const decimalPlaces = num.match(SCIENTIFIC_FORM_DECIMAL_PLACES)
        console.log(`num: ${num}, decimalPlaces: ${decimalPlaces[1]}`)
        return decimalPlaces[1] && Number.parseInt(decimalPlaces[1]) < -currentPrecision
    }

    public getSimplestForm(num: string, precision?: number): string {
        let result: string
        if (this.isScientificZero(num)) {
            result = ZERO
        } else {
            const currentPrecision = precision ? precision : DEFAULT_PRECISION
            result = this.roundValue(num, currentPrecision)
        }
        return result
    }

    public roundValue(num: string, precision: number): string {
        return parseFloat(num)
                .toPrecision(precision)
                .replace(TRAILING_0, EMPTY_STRING)
                .replace(TRAILING_DOT, EMPTY_STRING)
    }
}