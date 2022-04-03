import Vue from "vue"
import Step, {StepField} from "@/services/createStep"
import {Maybe} from "@/types/utils/other"

export const state = Vue.observable({
    number: '',
    financeProductId: null,
    date: ['', ''],
    sum: '',
    proposedPrice: '',
})

export const errors = Vue.observable({
    number: false,
    financeProductId: false,
    date: [false, false],
    sum: false,
    proposedPrice: false,
})

export const isValid = (): boolean => {
    return Object.values(state).every(item => {
        console.log('auctionStep isValid')

        if (Array.isArray(item)) {
            return item.every(value => Boolean(value))
        }
        return Boolean(item)
    })
}

export const appearance = {
    number: {
        component: 'input',
        validRegex: /.+/,
        label: 'Номер аукциона',
        placeholder: 'Введите номер аукциона',
        mask: 'number',
        loading: false,
        size: 'l',
    },
    financeProductId: {
        component: 'select',
        validRegex: /.+/,
        label: 'Тип банковской гарантии',
        placeholder: 'Выберите тип',
        size: 'l',
        options: [
            {
                id: 1,
                text: 'some text'
            }
        ],
    },
    date: {
        component: 'input-multi-datepicker',
        validRegex: /.+/,
        label: 'Срок предоставления',
        placeholders: ['дд.мм.гггг', 'дд.мм.гггг'],
        size: 'l',
    },
    sum: {
        component: 'input',
        validRegex: /.+/,
        label: 'Сумма гарантии, ₽',
        placeholder: 'Введите сумму',
        mask: 'decimal',
        size: 'l',
    },
    proposedPrice: {
        component: 'input',
        validRegex: /.+/,
        label: 'Итоговая цена контракта, ₽',
        placeholder: 'Введите цену',
        mask: 'decimal',
        size: 'l',
    },
}

export const createAuctionStep = (fields?: any) => {
    const createState = () => ({
        number: '',
        financeProductId: null,
        date: ['', ''],
        sum: '',
        proposedPrice: '',
    })

    const state = Vue.observable({
        ...createState(),
        ...fields,
    })
    const errors = Vue.observable({
        number: false,
        financeProductId: false,
        date: [false, false],
        sum: false,
        proposedPrice: false,
    })
    const noReactive = {
        number: {
            component: 'input',
            validRegex: /.+/,
            label: 'Номер аукциона',
            placeholder: 'Введите номер аукциона',
            mask: 'number',
            loading: false,
            size: 'l',
        },
        financeProductId: {
            component: 'select',
            validRegex: /.+/,
            label: 'Тип банковской гарантии',
            placeholder: 'Выберите тип',
            size: 'l',
            options: [
                {
                    id: 1,
                    text: 'some text'
                }
            ],
        },
        date: {
            component: 'input-multi-datepicker',
            validRegex: /.+/,
            label: 'Срок предоставления',
            placeholders: ['дд.мм.гггг', 'дд.мм.гггг'],
            size: 'l',
        },
        sum: {
            component: 'input',
            validRegex: /.+/,
            label: 'Сумма гарантии, ₽',
            placeholder: 'Введите сумму',
            mask: 'decimal',
            size: 'l',
        },
        proposedPrice: {
            component: 'input',
            validRegex: /.+/,
            label: 'Итоговая цена контракта, ₽',
            placeholder: 'Введите цену',
            mask: 'decimal',
            size: 'l',
        },
    }
    const bind = (name: string): Record<string, unknown> => {
        return { ...binding[name], ...noReactive[name] }
    }
    const validate = (): void => {
        console.log('auction step validate')

        Object.entries(state).forEach(([name, value]) => {
            const data = bind(name)

            if (Array.isArray(errors[name])) {
                errors[name] = value.map(
                    val => !data.validRegex.test(val ?? '')
                )
            } else {
                errors[name] = !data.validRegex.test(value ?? '')
            }
        })
    }
    const isValid = (): boolean => {
        console.log('auction step isValid')

        return Object.values(errors).every(item => !item)
    }

    return {
        state,
        errors,
        binding,
        static: noReactive,
        bind,
        validate,
        isValid,
    }
}

export const auctionStep = createAuctionStep()

type AuctionStepFields = {
    number: StepField<string, boolean>,
    financeProductId: StepField<Maybe<number>, boolean>,
    date: StepField<[string, string], [boolean, boolean]>,
    sum: StepField<string, boolean>,
    proposedPrice: StepField<string, boolean>,
}

export class AuctionStep extends Step<AuctionStepFields> {
    static key = Symbol()

    constructor(fields?: Partial<AuctionStepFields>) {
        super({
            number: {
                component: 'input',
                value: '',
                error: false,
                validRegex: /.+/,
                binding: {
                    label: 'Номер аукциона',
                    placeholder: 'Введите номер аукциона',
                    mask: 'number',
                    loading: false,
                    size: 'l',
                }
            },
            financeProductId: {
                component: 'select',
                value: null,
                error: false,
                validRegex: /.+/,
                binding: {
                    label: 'Тип банковской гарантии',
                    placeholder: 'Выберите тип',
                    size: 'l',
                    options: [],
                }
            },
            date: {
                component: 'input-multi-datepicker',
                value: ['', ''],
                error: [false, false],
                validRegex: /.+/,
                binding: {
                    label: 'Срок предоставления',
                    placeholders: ['дд.мм.гггг', 'дд.мм.гггг'],
                    size: 'l',
                }
            },
            sum: {
                component: 'input',
                value: '',
                error: false,
                validRegex: /.+/,
                binding: {
                    label: 'Сумма гарантии, ₽',
                    placeholder: 'Введите сумму',
                    mask: 'decimal',
                    size: 'l',
                }
            },
            proposedPrice: {
                component: 'input',
                value: '',
                error: false,
                validRegex: /.+/,
                binding: {
                    label: 'Итоговая цена контракта, ₽',
                    placeholder: 'Введите цену',
                    mask: 'decimal',
                    size: 'l',
                }
            },
            ...fields,
        })
    }

    validate(): void {
        //
    }
}

const AS = new AuctionStep()