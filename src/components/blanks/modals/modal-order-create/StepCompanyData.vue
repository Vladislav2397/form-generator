<template lang="pug">

.b-step-company-data
    .__section
        collapsible-counter-form-component(
            title="Общие данные"
            :countAll="counters.general.all"
            :countFilled="counters.general.count"
            :isOpen="activeCollapse === 'Общие данные'"
            @update:isOpen="setActiveCollapse('Общие данные')"
        )
            grid-form-component(
                :fieldMap="fields.general"
                :layout="layouts.general.grid"
                :spacing="['green', 12]"
                :conditionalFields="conditional.general"

                @input="setField('general', $event)"
            )
    .__section
        collapsible-counter-form-component(
            title="Реквизиты компании"
            :countAll="counters.detail.all"
            :countFilled="counters.detail.count"
            :isOpen="activeCollapse === 'Реквизиты компании'"
            @update:isOpen="setActiveCollapse('Реквизиты компании')"
        )
            grid-form-component(
                :fieldMap="fields.detail"
                :layout="layouts.detail.grid"
                :spacing="['green', 12]"

                @input="setField('detail', $event)"
            )
    .__section
        collapsible-counter-form-component(
            title="Учредители"
            countAll="2"
            countFilled="1"
            :isOpen="activeCollapse === 'Учредители'"
            @update:isOpen="setActiveCollapse('Учредители')"
        )
            grid-layout-component(
                :layout="layouts.founder.grid"
                :spacing="['green', 12]"
            )
                card-info-component.__item(
                    v-for="founderItem in founderSync"
                    :title="founderItem.name"
                    :label="$device.size.mobile ? undefined : 'Редактировать'"
                    :status="founderItemStatus(founderItem)"
                )
                button-component.__item(
                    view="secondary-brand"
                    ariaLabel="Добавить учредителя"
                ) Добавить учредителя
    .__section
        collapsible-counter-form-component(
            title="Руководитель"
            :countAll="counters.head.all"
            :countFilled="counters.head.count"
            :isOpen="activeCollapse === 'Руководитель'"
            @update:isOpen="setActiveCollapse('Руководитель')"
        )
            grid-form-component(
                :fieldMap="fields.head"
                :layout="layouts.head.grid"
                :spacing="['green', 12]"
                :conditionalFields="conditional.head"

                @input="setField('head', $event)"
            )
    .__section
        collapsible-counter-form-component(
            title="Анкетные вопросы"
            :isOpen="activeCollapse === 'Анкетные вопросы'"
            @update:isOpen="setActiveCollapse('Анкетные вопросы')"
        )
            grid-form-component(
                :fieldMap="fields.questionnaire"
                :layout="layouts.questionnaire.grid"
                :spacing="['green', 12]"
                :key="questionnaireDocuments.length"

                @input="setField('questionnaire', $event)"
            )
                template(
                    #append
                    v-if="fields.questionnaire.isLicenses && fields.questionnaire.isLicenses.value"
                )
                    card-attachment-component(
                        v-for="document in questionnaireDocuments"
                        v-model="document.value"
                        :name="document.binding.name"

                        @upload="onUpload"
                    )

</template>

<script lang="ts">
import { Component, Inject, Mixins, PropSync, Watch } from 'vue-property-decorator'

import CollapsibleCounterForm from '../../CollapsibleCounterForm.vue'
import GridForm from '../modal-add-company/GridForm.vue'

import CardAttachment from '../../../ui/cards/CardAttachment.vue'
import Validation from '../../../../js/mixins/utils/validation'
import Countable from '../../../../js/mixins/utils/countable'

import { fieldByNameWithKey, FormFields } from '../../../../js/utils/field/genInputData'
import { DeviceProviderValue } from '../../../../js/providers/device'
import CardInfo from '../../../ui/cards/CardInfo.vue'
import GridLayout from '../../../layouts/GridLayout.vue'
import { BadgeView } from '../../../../js/types/components/ui/badge'
import { sum } from '../../../../js/utils/formField/helpers'

@Component({
    components: {
        'grid-layout-component': GridLayout,
        'card-info-component': CardInfo,
        'card-attachment-component': CardAttachment,
        'grid-form-component': GridForm,
        'collapsible-counter-form-component': CollapsibleCounterForm
    },
})
export default class StepCompanyData extends Mixins(Validation, Countable) {
    @PropSync('general') generalSync!: any
    @PropSync('detail') detailSync!: any
    @PropSync('founder') founderSync!: { filledCount?: number, fieldCount?: number, name: string }[]
    @PropSync('head') headSync!: any
    @PropSync('questionnaire') questionnaireSync!: FormFields

    @PropSync('filledData') filledDataSync!: any

    @Inject('$device') $device!: DeviceProviderValue

    activeCollapse = ''

    isUpdateData = false

    fields = {
        general: {},
        detail: {},
        founder: {},
        head: {},
        questionnaire: {},
        documents: [] as { component: string, value: number, binding: { name: string }}[],
    }

    get excludes() {
        const general = [
            'isPostAddressEqualLegal',
            'isFactAddressEqualPost',
        ]
        // FIXME: dynamic added for re-render component
        if ( !this.generalSync?.isPostAddressEqualLegal) {
            general.push('addressPost')
        }
        if ( !this.generalSync?.isFactAddressEqualPost) {
            general.push('addressFact')
        }

        const head = [
            'isAddressEquals'
        ]

        if ( !this.headSync?.isAddressEquals) {
            head.push('addressFact')
        }

        return {
            general,
            head,
        }
    }

    get conditional() {
        return {
            general: {
                addressPost: !this.generalSync?.isPostAddressEqualLegal ?? false,
                addressFact: !this.generalSync?.isFactAddressEqualPost ?? false,
            },
            head: {
                addressFact: !this.headSync?.isAddressEquals ?? false,
            }
        }
    }

    mounted() {
        this.createFields()
    }

    createFields() {
        this.fields.general = {
            ...fieldByNameWithKey('inn', {
                value: this.generalSync.inn,
            }),
            ...fieldByNameWithKey('ogrn', {
                value: this.generalSync.ogrn,
            }),
            ...fieldByNameWithKey('kpp', {
                value: this.generalSync.kpp,
            }),
            ...fieldByNameWithKey('registrationDate', {
                value: this.generalSync.registrationDate,
            }),
            shortName: {
                component: 'input',
                value: this.generalSync.shortName,
                binding: {
                    label: 'Сокращённое наименование',
                    placeholder: 'Введите сокращённое наименование',
                },
            },
            registerSubjectName: {
                component: 'input',
                value: this.generalSync.registerSubjectName,
                binding: {
                    label: 'Наименование регистрирующего органа',
                    placeholder: 'Введите наименование',
                },
            },
            registerSubjectAddress: {
                component: 'input',
                value: this.generalSync.registerSubjectAddress,
                binding: {
                    label: 'Адрес регистрирующего органа',
                    placeholder: 'Введите адрес',
                },
            },
            taxationSystem: {
                component: 'radio',
                value: this.generalSync.taxationSystem ?? 1,
                binding: {
                    label: 'Действует на основании',
                    options: [
                        { id: 1, text: 'УСН' },
                        { id: 2, text: 'ОСН' },
                        { id: 3, text: 'Патент' },
                    ],
                    direction: 'row',
                    name: 'taxationSystem'
                }
            },
            legalAddress: {
                component: 'input',
                value: this.generalSync.legalAddress,
                binding: {
                    label: 'Юридический адрес',
                    placeholder: 'Введите адрес',
                },
            },
            isPostAddressEqualLegal: {
                component: 'card-checkbox',
                value: this.generalSync.isPostAddressEqualLegal,
                binding: {
                    label: 'Почтовый адрес совпадает с юридическим'
                },
            },
            ...fieldByNameWithKey('addressPost', {
                value: this.generalSync.addressPost,
            }),
            isFactAddressEqualPost: {
                component: 'card-checkbox',
                value: this.generalSync.isFactAddressEqualPost,
                binding: {
                    label: 'Фактический адрес совпадает с почтовым',
                },
            },
            ...fieldByNameWithKey('addressFact', {
                value: this.generalSync.addressFact,
            })
        }

        this.fields.detail = {
            bik: {
                component: 'input',
                value: this.detailSync.bik,
                binding: {
                    label: 'БИК',
                    placeholder: 'Введите номер',
                },
            },
            bankName: {
                component: 'input',
                value: this.detailSync.bankName,
                binding: {
                    label: 'Наименование банка',
                    placeholder: 'Введите наименование',
                },
            },
            accountNumber: {
                component: 'input',
                value: this.detailSync.accountNumber,
                binding: {
                    label: 'Номер счёта',
                    placeholder: 'Введите 20-ти значный номер',
                },
            },
            correspondentAccountNumber: {
                component: 'input',
                value: this.detailSync.correspondentAccountNumber,
                binding: {
                    label: 'Номер корресподентского счёта',
                    placeholder: 'Введите 20-ти значный номер',
                },
            },
        }

        this.fields.head = {
            ...fieldByNameWithKey('lastname', {
                value: this.headSync.lastname,
            }),
            ...fieldByNameWithKey('firstname', {
                value: this.headSync.firstname,
            }),
            ...fieldByNameWithKey('thirdName', {
                value: this.headSync.thirdName,
            }),
            ...fieldByNameWithKey('gender', {
                value: this.headSync.gender,
            }),
            ...fieldByNameWithKey('citizenship', {
                value: this.headSync.citizenship,
            }),
            ...fieldByNameWithKey('inn', {
                value: this.headSync.inn,
            }),
            snils: {
                component: 'input',
                value: this.headSync.snils,
                binding: {
                    label: 'СНИЛС',
                    placeholder: 'Введите номер',
                },
            },
            workPosition: {
                component: 'input',
                value: this.headSync.workPosition,
                binding: {
                    label: 'Должность',
                    placeholder: 'Введите должность',
                },
            },
            appointmentDate: {
                component: 'input-datepicker',
                value: this.headSync.appointmentDate,
                binding: {
                    label: 'Дата назначения',
                    placeholder: 'дд.мм.гг',
                },
            },
            workPhone: {
                component: 'input',
                value: this.headSync.workPhone,
                binding: {
                    label: 'Рабочий телефон',
                    placeholder: '+7 900 000-00-00',
                    mask: 'phone',
                },
            },
            basisDocument: {
                component: 'radio',
                value: this.headSync.basisDocument ?? 1,
                binding: {
                    label: 'Действует на основании',
                    options: [
                        { id: 1, text: 'Устава' },
                        { id: 2, text: 'Договора' },
                        { id: 3, text: 'Акта суда' },
                        { id: 4, text: 'В силу закона' },
                    ],
                    name: 'basisDocument',
                    direction: this.$device.size.mobile ? 'column' : 'row'
                },
            },
            ...fieldByNameWithKey('passportNumber', {
                value: this.headSync.passportNumber,
            }),
            ...fieldByNameWithKey('passportBirthday', {
                value: this.headSync.passportBirthday,
            }),
            ...fieldByNameWithKey('passportPlace', {
                value: this.headSync.passportPlace,
            }),
            ...fieldByNameWithKey('passportDate', {
                value: this.headSync.passportDate,
            }),
            ...fieldByNameWithKey('passportCode', {
                value: this.headSync.passportCode,
            }),
            ...fieldByNameWithKey('passportAddress', {
                value: this.headSync.passportAddress,
            }),
            ...fieldByNameWithKey('registrationAddress', {
                value: this.headSync.registrationAddress,
            }),
            ...fieldByNameWithKey('isAddressEquals', {
                value: this.headSync.isAddressEquals,
            }),
            ...fieldByNameWithKey('addressFact', {
                value: this.headSync.addressFact,
            }),
        }

        this.fields.questionnaire = {
            isWriteOff: {
                component: 'card-checkbox',
                value: this.questionnaireSync.isWriteOff,
                binding: {
                    label: 'Требование о бесспорном списании',
                }
            },
            isBigDeal: {
                component: 'card-checkbox',
                value: this.questionnaireSync.isBigDeal,
                binding: {
                    label: 'Крупная сделка',
                }
            },
            isLicenses: {
                component: 'card-checkbox',
                value: this.questionnaireSync.isLicenses,
                binding: {
                    label: 'Наличие лицензий на право осуществления деятельности, подлежащей лицензированию',
                }
            },
        }
    }

    validate() {
        //
    }

    isValid() {
        return true
    }

    onUpload(file: File) {
        console.log(file)

        this.fields.documents.push({
            component: 'card-attachment',
            value: 30,
            binding: {
                name: file.name,
            }
        })
    }

    founderItemStatus(item?: { filledCount: number, fieldCount: number }): {
        view: BadgeView
        text: string
    } | null {
        const filled = item?.filledCount ? `${item.filledCount}` : null
        const fields = item?.fieldCount ? `${item.fieldCount}` : null

        if (filled && fields) {
            return {
                view: filled === fields ? 'success' : 'system',
                text: `${filled} из ${fields}`
            }
        }
        return null
    }

    setActiveCollapse(name) {
        if (name === this.activeCollapse) {
            this.activeCollapse = ''
        } else {
            this.activeCollapse = name
        }
    }

    setField(thisName, {fieldName, value}) {
        console.log('setField', thisName, fieldName, value)

        if ( !this.isUpdateData) {
            this.isUpdateData = true
        }

        console.log('field', thisName, fieldName, value)

        this[`${thisName}Sync`][fieldName] = value
        this.fields[thisName][fieldName].value = value
    }

    get questionnaireDocuments() {
        return [
            {
                component: 'card-attachment',
                value: null,
                binding: {
                    name: 'Документы, подтверждающие наличие лицензий',
                }
            },
            ...this.fields.documents,
        ]
    }

    get counters() {
        return {
            general: {
                count: this.formFilledCount(this.fields.general, this.excludes.general),
                all: this.formFieldCount(this.fields.general, this.excludes.general)
            },
            detail: {
                count: this.formFilledCount(this.fields.detail),
                all: this.formFieldCount(this.fields.detail)
            },
            head: {
                count: this.formFilledCount(this.fields.head, this.excludes.head),
                all: this.formFieldCount(this.fields.head, this.excludes.head)
            },
        }
    }

    get layouts(): Record<string, { grid: GridLayout['layout'] }> {
        return {
            general: {
                grid: this.$device.size.mobile
                    ? [['auto', 'auto'], ['auto', 'auto']]
                    : [['auto', 'auto', 'auto', 'auto']],
            },
            detail: {
                grid: this.$device.size.mobile
                    ? [['auto'], ['auto'], ['auto'], ['auto']]
                    : [['auto', 'auto'], ['auto', 'auto']]
            },
            founder: {
                grid: [
                    ...this.founderSync.map(() => ['auto']) as GridLayout['layout'],
                    ['auto']
                ]
            },
            head: {
                grid: this.$device.size.mobile
                    ? [
                        ['auto'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                        ['auto', 'auto'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                        ['auto', 'auto'],
                        ['auto'],
                        ['auto', 'auto'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                    ]
                    : [
                        ['auto', 'auto', 'auto'],
                        ['auto', 'auto'],
                        ['auto', 'auto'],
                        ['auto', 'auto', 'auto'],
                        ['auto'],
                        ['25%', '25%', '50%'],
                        ['25%', '25%', '50%'],
                        ['auto'],
                        ['auto'],
                        ['auto'],
                    ]
            },
            questionnaire: {
                grid: [
                    ['auto'], ['auto'], ['auto'],
                    ...(
                        (this.questionnaireDocuments ?? [])
                            .map(() => ['auto']) as GridLayout['layout']
                    )
                ]
            }
        }
    }

    @Watch('counters')
    onChangeFilledFields(newValue, oldValue) {
        const general = newValue.general.count !== oldValue.general.count || newValue.general.all !== oldValue.general.all
        const detail = newValue.detail.count !== oldValue.detail.count || newValue.detail.all !== oldValue.detail.all
        const head = newValue.head.count !== oldValue.head.count || newValue.head.all !== oldValue.head.all

        if (general || detail || head) {
            this.filledDataSync = {
                count: sum(
                    newValue.general.count === newValue.general.all,
                    newValue.detail.count === newValue.detail.all,
                    newValue.head.count === newValue.head.all
                ),
                all: 3,
            }
        }
    }
}

</script>
