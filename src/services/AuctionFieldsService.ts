import Vue from "vue"

export default class AuctionFieldsService {
    static key = Symbol()

    values = {
        number: '',
        financeProductId: null,
        date: [ '', '' ],
        sum: '',
        proposedPrice: '',
    }

    errors = {
        number: false,
        financeProductId: false,
        date: [ false, false ],
        sum: false,
        proposedPrice: false,
    }

    fieldAppearance = {
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

    constructor(fields: AuctionFieldsService['values']) {
        this.values = Vue.observable({ ...fields })
    }

    validate(): void {
        console.log('auction fields service validate')

        Object.entries(this.values).forEach(([name, value]) => {
            const appearance = this.fieldAppearance[name]

            if (Array.isArray(this.errors[name])) {
                this.errors[name] = value.map(
                    val => !appearance.validRegex.test(val ?? '')
                )
            } else {
                this.errors[name] = !appearance.validRegex.test(value ?? '')
            }
        })
    }

    computed = {
        isValid: () => Object.entries(this.values).every(([name, value]) => {
            return this.fieldAppearance[name].validRegex.test(value ?? '')
        })
    }
}