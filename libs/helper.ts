import first from"@/assets/bg/mobile/first.jpg"
import second from"@/assets/bg/mobile/second.jpg"
import third from"@/assets/bg/mobile/third.jpg"
import  fourth from"@/assets/bg/mobile/fourth.jpg"
import fifth from"@/assets/bg/mobile/fifth.jpg"
import { number } from "zod"

export const MobileImages = [first, second, third, fourth, fifth]
export const DesktopImages = []

export const splitDescription= (description: string) => {
    const eachDescription = description.split(",")
    return eachDescription;
}

export function round2(value: number | string){
    if (typeof value === 'number'){
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }else if(typeof value === 'string'){
        return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    }else{
        throw new Error('value is not a number or string')
    }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-NG', {
    currency: 'NGN',
    style: 'currency',
    minimumFractionDigits: 2
})

// format currency using the formatter above
export function formatCurrency(amount: number | string | null){
    if (typeof amount === 'number'){
        return CURRENCY_FORMATTER.format(amount)
    } else if (typeof amount === 'string'){
        return CURRENCY_FORMATTER.format(Number(amount))
    }
    return NaN
}