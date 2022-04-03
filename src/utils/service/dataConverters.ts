import { CardView } from '../../types/components/ui/card'

export const orderCardView = {
    1: 'base',
    2: 'success',
    3: 'critical',
    4: 'warning',
    5: 'primary',
} as Record<number, CardView>

export const orderStatus = {
    1: {
        text: 'рассматривается',
        view: 'system',
    },
    2: {
        text: 'запрос',
        view: 'warning',
    },
    3: {
        text: 'одобрено',
        view: 'success',
    },
} as Record<number, Record<string, string>>

export const maskOptions = {
    date: {
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y'],
    },
    number: {
        numeral: true,
        numeralDecimalMark: '',
        delimiter: '',
    },
    bik: {
        numericOnly: true,
        blocks: [9],
    },
    inn: {
        numericOnly: true,
        blocks: [12],
    },
    ikz: {
        numericOnly: true,
        blocks: [36],
    },
    iku: {
        numericOnly: true,
        blocks: [36],
    },
    snils: {
        numericOnly: true,
        blocks: [3, 3, 3, 2],
        delimiters: ['-', '-', ' '],
    },
    bankAccount: {
        numericOnly: true,
        blocks: [20],
    },
    decimal: {
        numeral: true,
        numeralDecimalMark: ',',
        delimiter: ' ',
    },
    phone: {
        numericOnly: true,
        blocks: [2, 3, 3, 2, 2],
        delimiters: [' ', ' ', '-', '-'],
        prefix: '+7',
        noImmediatePrefix: true,
    },
    passport: {
        numericOnly: true,
        blocks: [4, 6],
        delimiter: ' ',
    },
    passportCode: {
        numericOnly: true,
        blocks: [3, 3],
        delimiter: '-',
    },
    'subdivision-code': {
        numericOnly: true,
        blocks: [3, 3],
        delimiter: ' ',
    },
    okpd2: {
        numericOnly: true,
        blocks: [2, 2, 2, 3],
        delimiter: '.',
    },
}

export const perPageCounts = {
    1: 15,
    2: 30,
    3: 50,
}
