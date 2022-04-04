import { Component, Vue } from "vue-property-decorator"

const auctionStepState = Vue.observable({
    number: '',
    financeProductId: null,
    date: ['', ''],
    sum: '',
    proposedPrice: '',
})

const auctionStepErrors = Vue.observable({
    number: false,
    financeProductId: false,
    date: [false, false],
    sum: false,
    proposedPrice: false,
})

interface Field {
    component: string
    validRegex?: RegExp
    binding: Record<string, unknown>
}

@Component
export default class AuctionStepMixin extends Vue {
    auctionStep = {
        state: auctionStepState,
        errors: auctionStepErrors,
    }

    // Getter for override
    get fieldsAppearanceAppend(): Partial<
        Record<keyof typeof auctionStepState, Partial<Field>>
    > | null {
        return null
    }

    get fieldsAppearance(): Record<keyof typeof auctionStepState, Field> {
        return Object.assign({}, {
            number: {
                component: 'input',
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
                validRegex: /.+/,
                binding: {
                    label: 'Срок предоставления',
                    placeholders: ['дд.мм.гггг', 'дд.мм.гггг'],
                    size: 'l',
                }
            },
            sum: {
                component: 'input',
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
                validRegex: /.+/,
                binding: {
                    label: 'Итоговая цена контракта, ₽',
                    placeholder: 'Введите цену',
                    mask: 'decimal',
                    size: 'l',
                }
            },
        }, this.fieldsAppearanceAppend)
    }

    validate() {
        const keys =
            Object.keys(auctionStepState) as unknown as (keyof typeof auctionStepState)[]
        const values =
            Object.values(auctionStepState)

        keys.forEach(name => {
            const value = auctionStepState[name]
            const validRegex = this.fieldsAppearance[name].validRegex

            if (validRegex) {
                this.auctionStep.errors[name] = Array.isArray(value)
                    ? value.map(val => !val)
                    : !validRegex.test(value ?? '')
            }
        })
    }
}