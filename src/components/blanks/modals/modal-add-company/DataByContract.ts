import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

import CollapsibleCounterForm from '../../CollapsibleCounterForm.vue'
import GridForm from './GridForm.vue'

@Component
export default class DataByContract extends Vue {
    fields = {
        nmck: {
            component: 'input',
            value: '',
            binding: {
                label: 'НМЦК, ₽',
                placeholder: 'Введите цену',
                mask: 'decimal',
            }
        },
        lotCount: {
            component: 'input',
            value: '',
            binding: {
                label: 'Количество лотов',
                placeholder: 'Введите количество',
                mask: 'number',
            }
        },
        auctionPublicationDate: {
            component: 'input-datepicker',
            value: '',
            binding: {
                label: 'Дата публикации аукциона',
                placeholder: 'дд.мм.гггг',
            }
        },
        iku: {
            component: 'input',
            value: '',
            binding: {
                label: 'ИКУ',
                placeholder: 'Введите 36-значный код',
                mask: 'iku',
            },
        },
        ikz: {
            component: 'input',
            value: '',
            binding: {
                label: 'ИКЗ',
                placeholder: 'Введите 36-значный код',
                mask: 'ikz',
            }
        },
        isCommonPayed: {
            component: 'card-checkbox',
            value: false,
            binding: {
                label: 'Закупка',
            }
        },
        isLockTender: {
            component: 'card-checkbox',
            value: false,
            binding: {
                label: 'Закрытый',
            }
        },
        okpd2: {
            component: 'input',
            value: '',
            binding: {
                label: 'ОКПД2',
                placeholder: 'Укажите классификацию',
                type: 'input',
                mask: 'okpd2',
            }
        },
        linkToProcedures: {
            component: 'input',
            value: '',
            binding: {
                label: 'Ссылка на конкурсную процедуру',
                placeholder: 'Введите ссылку',
            }
        },
        region: {
            component: 'input',
            value: '',
            binding: {
                label: 'Регион оказания услуг',
                placeholder: 'Введите регион',
                mask: 'number',
            }
        },
        subjectContract: {
            component: 'input',
            value: '',
            binding: {
                label: 'Предмет контракта',
                placeholder: 'Введите предмет контракта',
            }
        },
        protocolName: {
            component: 'input',
            value: '',
            binding: {
                label: 'Наименование протокола',
                placeholder: 'Введите наименование',
            }
        },
        protocolNumber: {
            component: 'input',
            value: '',
            binding: {
                label: 'Номер протокола',
                placeholder: 'Введите номер',
                mask: 'number'
            }
        },
        protocolDate: {
            component: 'input-datepicker',
            value: '',
            binding: {
                label: 'Дата протокола итогов',
                placeholder: 'дд.мм.гггг',
                mask: 'date'
            }
        },
    }

    conditionalFields = {
        'ikz': true,
        'iku': false,
    }

    layout = [
        ['auto', 'auto', 'auto'],
        ['auto'],
        ['auto', 'auto'],
        ['auto'],
        ['auto'],
        ['auto'],
        ['auto'],
        ['auto'],
        ['auto', 'auto'],
    ]

    contractExcludes = [
        'isCommonPayed',
        'isLockTender',
        'protocolDate',
        'protocolName',
        'protocolNumber',
    ]

    fieldCount(fields, excludes: string[] = []) {
        return Object.keys(fields).length - (excludes.length ?? 0)
    }

    filled(fields, excludes: string[] = []) {
        return Object.entries(fields)
            .filter(([fieldName]) => !excludes.includes(fieldName))
            .reduce(
                (total, [fieldName, field]) => total + +(!!field.value)
                , 0)
    }

    changeContract([field, value]) {
        this.fields[field].value = value
    }

    public validate() {
        console.log('validate')
    }

    public getFields() {
        const fieldEntries = Object.entries(this.fields).map(([fieldName, field]) => ([
            fieldName, field.value
        ]))

        return Object.fromEntries(fieldEntries)
    }

    render(h: CreateElement) {
        return h(CollapsibleCounterForm, {
            props: {
                'title': 'Данные по контракту',
                countFilled: this.filled(this.fields, this.contractExcludes),
                countAll: this.fieldCount(this.fields, this.contractExcludes),
                // @ts-ignore
                error: this.error ?? false,
            }
        }, [
            h(GridForm, {
                props: {
                    fieldMap: this.fields,
                    layout: this.layout,
                    conditionalFields: this.conditionalFields
                },
                on: {
                    input: this.changeContract
                }
            })
        ])
    }
}
