import { isNumber } from "util";

export default class DividendUtil {
    public static getDividendCost(dividend : any) : string {
        if (isNumber(dividend.dividendCost)) {
            return this.toFixedNumber(dividend.dividendCost/1000000.0);
        }
        return '-';
    }

    public static toFixedNumber(value: any): string {
        if (isNumber(value)) {
            return value.toFixed(2);
        }
        return '-';
    }
}