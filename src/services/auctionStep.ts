import {
    createAppearance, createBinding,
    createErrors,
    createState,
    StepField
} from "@/services/createStep"
import {Maybe} from "@/types/utils/other"
import {sum} from "@/helpers"
import Vue from "vue"

type AuctionStepFields = {
    number: StepField<string, boolean>,
    financeProductId: StepField<Maybe<number>, boolean>,
    date: StepField<[string, string], [boolean, boolean]>,
    sum: StepField<string, boolean>,
    proposedPrice: StepField<string, boolean>,
}

export const auctionStepKey = Symbol('AuctionStep')
export const createAuctionStep = (fields?: Partial<AuctionStepFields>) => {
    const stepFields = {
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
    }

    const state = createState(stepFields)
    const errors = createErrors(stepFields)
    const binding = createBinding(stepFields)
    const appearance = createAppearance(stepFields)

    const setBinding = (bindings: any) => {
        Object.entries(bindings).forEach(([name, value]) => {
            binding[name] = {
                ...binding[name],
                ...value,
            }
        })
    }

    const setAppearance = (appearancies: any) => {
        Object.entries(appearancies).forEach(([name, value]) => {
            Object.entries(([appearanceName, appearanceValue]) => {
                Vue.set(appearance[name], appearanceName, appearanceValue)
            })
        })
    }

    const validate = (): void => {
        console.log('auctionStep.validate')

        Object.entries(state).forEach(([name, value]) => {
            const validRegex = appearance[name].validRegex

            if (Array.isArray(value)) {
                errors[name] = value.map(
                    val => !validRegex.test(val ?? '')
                )
            } else {
                console.log('error datas')
                console.log(name, errors[name], !validRegex.test(value ?? ''))
                errors[name] = !validRegex.test(value ?? '')
            }
        })
    }

    const isValid = (): boolean => {
        console.log('auctionStep.isValid')

        return Object.values(errors ?? {}).every(error => {
            return Array.isArray(error)
                ? error.map(err => !err)
                : !error
        })
    }

    const allCount = () => {
        return sum(...Object.values(state).map(value => {
            return Array.isArray(value)
                ? value.length
                : 1
        }))
    }

    const filledCount = () => {
        return sum(...Object.values(state).map(value => {
            return Array.isArray(value)
                ? sum(...value.map(val => +Boolean(val)))
                : +Boolean(value)
        }))
    }

    const counter = () => {
        return {
            filled: filledCount(),
            all: allCount(),
        }
    }

    return {
        state,
        errors,
        binding,
        appearance,
        getters: {
            isValid,
            allCount,
            filledCount,
            counter,
        },
        isValid,
        validate,
        setAppearance,
        setBinding,
        allCount,
        filledCount,
        counter,
    }
}