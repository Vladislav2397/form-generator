<template lang="pug" >

.b-modal-content-layout
    .__section(
        v-if="auctions"
    )
        grid-form-component(
            :fieldMap="auctions"
            :layout="layouts.auction.grid"
            :spacing="layouts.auction.spacing"

            @input="setAuction"
            @update:error="setAuctionError"
        )

    transition-group(
        name="fade"
        mode="out-in"
    )
        template(
            v-if="isAuctionParsed"
        )
            .__section(
                v-if="contracts"
                key="contract"
            )
                collapsible-counter-form-component(
                    title="Данные по контракту"
                    :countFilled="formFilledCount(contracts, contractExcludes)"
                    :countAll="formFieldCount(contracts, contractExcludes)"
                    :error="contractsError"
                )
                    grid-form-component(
                        :fieldMap="contracts"
                        :layout="layouts.contract.grid"
                        :spacing="layouts.contract.spacing"

                        @input="setContracts"
                        @update:error="setContractsError"
                    )
                        template(
                            v-for="( content, slotIndex ) in layouts.contract.titles"
                            v-slot:[`index-${slotIndex}`]="{ elementClass }"
                        )
                            div(
                                :class="elementClass"
                            ) {{ content }}

            .__section(
                v-if="beneficiaries"
                key="beneficiary"
            )
                collapsible-counter-form-component(
                    title="Данные заказчика"
                    :countFilled="formFilledCount(beneficiaries)"
                    :countAll="formFieldCount(beneficiaries)"
                    :error.sync="beneficiariesError"
                )
                    grid-form-component(
                        :fieldMap="beneficiaries"
                        :layout="layouts.beneficiary.grid"
                        :spacing="layouts.beneficiary.spacing"

                        @input="setBeneficiaries"
                        @update:error="setBeneficiariesError"
                    )

</template>

<script lang="ts">
import { Component, Inject, Mixins, PropSync, Watch } from 'vue-property-decorator'

import regulars from '../../../../js/utils/default/regulars'
import { stepsOrderCreate } from '../../../../js/store/modules/order-create/state'
import api from '../../../../js/api'
import { Orders } from '../../../../js/api/orders'
import { Getter } from '../../../../js/decorators'
import {
    OrderCreateActiveStepGetter,
    OrderCreateProductGetter,
} from '../../../../js/store/modules/order-create/getters'
import { products } from '../../../../js/store/modules/products/state'
import { DeviceProviderValue } from '../../../../js/providers/device'
import CollapsibleCounterForm from '../../CollapsibleCounterForm.vue'
import InputHOC from '../../InputHOC.vue'
import { errorToaster } from '../../../../js/vue-utils/toast'
import { AppError } from '../../../../js/utils/errorHandler/error'
import DataByContract from '../modal-add-company/DataByContract'
import GridForm from '../modal-add-company/GridForm.vue'
import FounderForm from '../modal-add-company/FounderForm.vue'
import { fieldByNameWithKey } from '../../../../js/utils/field/genInputData'
import GridLayout from '../../../layouts/GridLayout.vue'
import Validation from '../../../../js/mixins/utils/validation'
import ModalOrderCreateStep from '../../../../js/mixins/components/blanks/ModalOrderCreateStep'

const sum = (...args): number => args.reduce((total, num) => total + +num, 0)

type InputField = {
    component: string
    value: string
    error: false
    validRegex: RegExp
    binding: Record<string, any>
}

type Optionals<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

@Component({
    components: {
        'founder-form-component': FounderForm,
        'grid-form-component': GridForm,
        'data-by-contract-component': DataByContract,
        'collapsible-counter-form-component': CollapsibleCounterForm,
        'input-hoc-component': InputHOC,
    },
})
export default class StepPurchase extends Mixins(Validation, ModalOrderCreateStep) {
    // FIXME: Fix types field and forms
    @PropSync('auction') auctionSync!: Record<string, string>
    @PropSync('contract') contractSync!: Record<string, string>
    @PropSync('beneficiary') beneficiarySync!: Record<string, string>
    @PropSync('filledData') filledDataSync!: { count: number, all: number }

    @Inject('$device') $device!: DeviceProviderValue

    @Getter('orderCreate/activeStep') activeStep!: OrderCreateActiveStepGetter
    @Getter('orderCreate/product') product!: OrderCreateProductGetter

    isAuctionParsed = false

    auctions: Record<string, Optionals<InputField, 'error' | 'component' | 'validRegex'>> = {}
    contracts: Record<string, any> = {}
    contractsError = false
    contractExcludes = [
        'closedTender',
        'cooperative',
        'protocolName',
        'protocolNumber',
        'protocolDate',
    ]

    beneficiaries: Record<string, Optionals<InputField, 'error' | 'component' | 'validRegex'>> = {}
    beneficiariesError = false

    typing = false
    typingTimeout

    readonly typingDelay = 500

    setAuctionParsed(value) {
        this.isAuctionParsed = value
    }

    setAuctionLoading(value: boolean) {
        if (this.auctions.auctionNumber) {
            this.auctions.auctionNumber.binding.loading = value
            this.auctions.auctionNumber.binding.disabled = value
        }
    }

    setContracts({fieldName, value}) {
        this.contractSync[fieldName] = value

        this.contracts[fieldName].value = value

        this.contractsError = false
    }

    setContractsError({ fieldName, value }) {
        this.contracts[fieldName].error = value

        this.contractsError = value
    }

    setAuction({fieldName, value}) {
        this.auctionSync[fieldName] = value

        this.auctions[fieldName].value = value

        this.onChangeField(fieldName, value)
    }

    setAuctionError({ fieldName, value }) {
        this.auctions[fieldName].error = value
    }

    setBeneficiaries({fieldName, value}) {
        this.beneficiarySync[fieldName] = value

        this.beneficiaries[fieldName].value = value

        this.beneficiariesError = false
    }
    setBeneficiariesError({ fieldName, value }) {
        this.beneficiaries[fieldName].error = value
        this.beneficiariesError = value
    }

    setFields() {
        this.auctions = {
            ...fieldByNameWithKey(
                'auctionNumber',
                {
                    value: this.auctionSync.auctionNumber,
                    error: false,
                    validRegex: this.product?.id === products.GUARANTEE_615_PP
                        ? regulars.auctionNumber615
                        : regulars.auctionNumber,
                }
            ),
            ...fieldByNameWithKey(
                'financeProductId',
                {
                    value: this.auctionSync.financeProductId,
                    validRegex: regulars.notEmptyField,
                    error: false,
                    binding: {
                        options: this.product ? this.product.children : [],
                    }
                }
            ),
            ...fieldByNameWithKey(
                'auctionDate',
                {
                    value: this.auctionSync.auctionDate,
                    error: [false, false],
                    validRegex: regulars.date,
                }
            ),
            ...fieldByNameWithKey(
                'auctionSum',
                {
                    error: false,
                    value: this.auctionSync.auctionSum,
                    validRegex: /.+/,
                }
            ),
            ...fieldByNameWithKey(
                'proposedPrice',
                {
                    error: false,
                    value: this.auctionSync.proposedPrice,
                    validRegex: /.+/,
                }
            ),
        }

        this.contracts = {
            nmck: {
                component: 'input',
                value: this.contractSync.nmck,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'НМЦК, ₽',
                    placeholder: 'Введите цену',
                    mask: 'decimal',
                    size: 'l',
                },
            },
            lotCount: {
                component: 'input',
                value: this.contractSync.lotCount,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Количество лотов',
                    placeholder: 'Введите количество',
                    mask: 'number',
                    size: 'l',
                },
            },
            publishDate: {
                component: 'input-datepicker',
                value: this.contractSync.publishDate as string,
                error: false,
                validRegex: regulars.date,
                binding: {
                    label: this.$device.size.mobile
                        ? 'Публикация аукциона'
                        : 'Дата публикации аукциона',
                    placeholder: 'дд.мм.гггг',
                    size: 'l',
                },
            },
            ...this.product?.id === products.GUARANTEE_223_FZ ? {
                iku: {
                    component: 'input',
                    value: this.contractSync.iku,
                    error: false,
                    validRegex: regulars.iku,
                    binding: {
                        label: 'ИКУ',
                        placeholder: 'Введите 36-значный код',
                        mask: 'iku',
                        size: 'l',
                    },
                },
            } : {
                ikz: {
                    component: 'input',
                    value: this.contractSync.ikz,
                    error: false,
                    validRegex: regulars.ikz,
                    binding: {
                        label: 'ИКЗ',
                        placeholder: 'Введите 36-значный код',
                        mask: 'ikz',
                        size: 'l',
                    },
                },
            },
            cooperative: {
                component: 'card-checkbox',
                value: this.contractSync.cooperative,
                binding: {
                    label: 'Совместная закупка',
                    size: 'l',
                },
            },
            closedTender: {
                component: 'card-checkbox',
                value: this.contractSync.closedTender,
                binding: {
                    label: 'Закрытый тендер',
                    size: 'l',
                },
            },
            okpd2: {
                component: 'input',
                value: this.contractSync.okpd2,
                error: false,
                validRegex: regulars.okpd2,
                binding: {
                    label: 'ОКПД2',
                    placeholder: 'Укажите классификацию',
                    mask: 'okpd2',
                    size: 'l',
                },
            },
            link: {
                component: 'input',
                value: this.contractSync.link,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Ссылка на конкурсную процедуру',
                    placeholder: 'Введите ссылку',
                    size: 'l',
                },
            },
            region: {
                component: 'input',
                value: this.contractSync.region,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Регион оказания услуг',
                    placeholder: 'Введите регион',
                    size: 'l',
                },
            },
            subjectContract: {
                component: 'input',
                value: this.contractSync.subjectContract,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Предмет контракта',
                    placeholder: 'Введите предмет контракта',
                    size: 'l',
                },
            },
            protocolName: {
                component: 'input',
                value: this.contractSync.protocolName,
                binding: {
                    label: 'Наименование протокола',
                    placeholder: 'Введите наименование',
                    size: 'l',
                },
            },
            protocolNumber: {
                component: 'input',
                value: this.contractSync.protocolNumber,
                binding: {
                    label: 'Номер протокола',
                    placeholder: 'Введите номер',
                    mask: 'number',
                    size: 'l',
                },
            },
            protocolDate: {
                component: 'input-datepicker',
                value: this.contractSync.protocolDate,
                binding: {
                    label: 'Дата протокола итогов',
                    placeholder: 'дд.мм.гггг',
                    mask: 'date',
                    size: 'l',
                },
            },
        }

        this.beneficiaries = {
            ...fieldByNameWithKey('inn', {
                value: this.beneficiarySync.inn,
                error: false,
                validRegex: regulars.inn,
                binding: {
                    size: 'l',
                }
            }),
            ...fieldByNameWithKey('ogrn', {
                value: this.beneficiarySync.ogrn,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    size: 'l',
                }
            }),
            ...fieldByNameWithKey('kpp', {
                value: this.beneficiarySync.kpp,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    size: 'l',
                },
            }),
            name: {
                component: 'input',
                value: this.beneficiarySync.name,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Наименование',
                    placeholder: 'Введите наименование',
                    size: 'l',
                },
            },
            registerDate: {
                component: 'input-datepicker',
                value: this.beneficiarySync.registerDate,
                error: false,
                validRegex: regulars.date,
                binding: {
                    label: 'Дата учёта',
                    placeholder: 'дд.мм.гггг',
                    size: 'l',
                },
            },
            oktmo: {
                component: 'input',
                value: this.beneficiarySync.oktmo,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'ОКТМО',
                    placeholder: 'Введите номер',
                    mask: 'number',
                    size: 'l',
                },
            },
            okopf: {
                component: 'input',
                value: this.beneficiarySync.okopf,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'ОКОПФ',
                    placeholder: 'Введите номер',
                    mask: 'number',
                    size: 'l',
                },
            },
            regionCode: {
                component: 'input',
                value: this.beneficiarySync.okopf,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Код субъекта РФ',
                    placeholder: 'Введите номер',
                    mask: 'number',
                    size: 'l',
                },
            },
            address: {
                component: 'input',
                value: this.beneficiarySync.address,
                error: false,
                validRegex: regulars.notEmptyField,
                binding: {
                    label: 'Юридический адрес',
                    placeholder: 'Введите адрес',
                    size: 'l',
                },
            },
        }
    }

    collapse = {
        contract: false,
        beneficiary: false,
    }

    onChangeField(fieldName: string, value: string) {
        this.actionsOnChangeField(fieldName, value)
    }

    actionsOnChangeField(fieldName: string, value: string) {
        switch (fieldName) {
            case 'auctionNumber':
                this.getDataByAuctionNumber(value)
                break
            default:
                break
        }
    }

    formFilledCount(form, excludes: string[] = []) {
        return Object
            .entries(form)
            .filter(
                ([fieldName]) => !excludes.includes(fieldName),
            )
            .reduce((total, [, field]) => total + +(this.isFieldFilled(field)), 0)
    }

    formFieldCount(form, excludes: string[] = []) {
        return Object.keys(form).length - excludes.length
    }

    getDataByAuctionNumber(number: string) {
        clearTimeout(this.typingTimeout)

        if (this.auctions) {
            this.typing = true
            this.typingTimeout = setTimeout(() => {
                this.typing = false
                const field = this.auctions!.auctionNumber

                if (this.isFieldFilled(field)) {
                    this.validateField(field)

                    if (this.isFieldValid(field)) {

                        this.setAuctionLoading(true)

                        api.getAuctionData(number).then(response => {
                            this.setDataByResponse(response)

                            if (!response.founded) {
                                this.$toast({
                                    title: 'Ошибка',
                                    text: 'Данных по этому аукциону не найдено',
                                    view: 'critical',
                                })
                            }
                        }).catch(e => {
                            console.log(e)
                            errorToaster(e as AppError)
                        }).finally(() => {
                            this.setAuctionLoading(false)
                            this.setAuctionParsed(true)
                        })

                    } else {
                        this.$toast({
                            title: 'Ошибка',
                            text: this.product?.id === products.GUARANTEE_615_PP ? 'Номер аукциона должен содержать 18 символов' : 'Номер аукциона должен содержать 11 или 19 символов',
                            view: 'critical',
                        })
                    }
                }

            }, this.typingDelay)
        }
    }

    convertToStepPurchaseData(
        data: Orders.POST.AuctionData.Response
    ) {
        return {
            contract: {
                nmck: data.purchase.nmc,
                publishDate: data.purchase.dateStart,
                okpd2: data.purchase.okpd2,
                link: data.purchase.link,
                region: data.purchase.region,
                subjectContract: data.purchase.subjectContract,
                protocolName: data.protocol.name,
                protocolNumber: data.protocol.number,
                protocolDate: data.protocol.date,
                ...this.contracts?.ikz && {
                    ikz: data.beneficiary.icz,
                },
                ...this.contracts?.iku && {
                    iku: data.beneficiary.icu,
                },
            },
            beneficiary: {
                inn: data.beneficiary.inn,
                ogrn: data.beneficiary.ogrn,
                kpp: data.beneficiary.kpp,
                name: data.beneficiary.name,
                registerDate: data.beneficiary.date,
                oktmo: data.beneficiary.oktmo,
                okopf: data.beneficiary.okopf,
                regionCode: data.beneficiary.region_code,
                address: data.beneficiary.address,
            },
        }
    }

    setDataByResponse(data: Orders.POST.AuctionData.Response) {
        const correctData = this.convertToStepPurchaseData(data)

        if (this.contracts) {
            Object.entries(correctData.contract).forEach(([fieldName, value]) => {
                this.setContracts({fieldName, value})
            })
        }

        if (this.beneficiaries) {
            Object.entries(correctData.beneficiary).forEach(([fieldName, value]) => {
                this.setBeneficiaries({fieldName, value})
            })
        }
    }

    public validate() {
        Object.values(this.auctions).forEach(field => {
            this.validateField(field)
        })

        if (this.isAuctionParsed) {
            this.contractsError = !this.isContractFilled
            this.beneficiariesError = !this.isBeneficiaryFilled

            Object.values(this.contracts).forEach(field => {
                this.validateField(field)
            })
            Object.values(this.beneficiaries).forEach(field => {
                this.validateField(field)
            })
        }
    }

    public isValid() {
        let isSuccess = true

        // eslint-disable-next-line no-restricted-syntax
        for (const item of [this.auctions, this.contracts, this.beneficiaries]) {
            isSuccess = Object.values(item).every(field => {
                console.log('field', field)

                if (Array.isArray(field.value)) {
                    return field.error.every(value => !value)
                }
                return !field.error
            })

            if (!isSuccess) break
        }

        return isSuccess
    }

    mounted() {
        this.sendFilled()

        this.setFields()
        this.setAuctionParsed(
            Boolean(this.auctions.auctionNumber.value)
        )
    }

    get layouts() {
        return {
            auction: {
                grid: this.$device.size.mobile ?
                    [['auto']] :
                    [['auto', 'auto'], ['auto', 'auto'], ['auto', 'auto']],
                spacing: ['pink', 12] as GridLayout['spacing'],
            },
            contract: {
                grid: this.$device.size.mobile ?
                    [['auto'], ['auto', 'auto']] :
                    [['auto', 'auto', 'auto'], ['auto'], ['auto', 'auto'], ['auto'], ['auto'], ['auto'], ['auto'], ['auto'], ['auto', 'auto']],
                spacing: ['green', 12] as GridLayout['spacing'],
                titles: {
                    [this.$device.size.mobile ? 8 : 6]: 'Данные о протоколе',
                },
            },
            beneficiary: {
                grid: this.$device.size.mobile ?
                    [['auto'], ['auto'], ['auto'], ['auto'], ['auto', 'auto'], ['auto', 'auto'], ['auto']] :
                    [['auto', 'auto', 'auto'], ['auto'], ['auto', 'auto', 'auto', 'auto'], ['auto']],
                spacing: ['green', 12] as GridLayout['spacing'],
            },
        }
    }

    get isAuctionFilledCount() {
        const checkFields = [
            this.auctionSync.auctionNumber,
            this.auctionSync.financeProductId,
            (this.auctionSync.auctionDate[0] && this.auctionSync.auctionDate[1]) ? '1' : '',
            this.auctionSync.auctionSum,
            this.auctionSync.proposedPrice,
        ]

        return sum(
            ...checkFields.map(item => !!item)
        )
    }

    get isBeneficiaryFilled() {
        const checkFields = [
            this.beneficiarySync.inn,
            this.beneficiarySync.ogrn,
            this.beneficiarySync.kpp,
            this.beneficiarySync.name,
            this.beneficiarySync.registerDate,
            this.beneficiarySync.oktmo,
            this.beneficiarySync.okopf,
            this.beneficiarySync.regionCode,
            this.beneficiarySync.address,
        ]

        return sum(
            ...checkFields.map(item => !!item)
        ) === checkFields.length
    }

    get isContractFilled() {
        const checkFields = [
            this.contractSync.nmck,
            this.contractSync.lotCount,
            this.contractSync.publishDate,
            this.contractSync.ikz,
            this.contractSync.okpd2,
            this.contractSync.link,
            this.contractSync.region,
            this.contractSync.subjectContract,
        ]

        return sum(
            ...checkFields.map(item => !!item)
        ) === checkFields.length
    }

    get fieldsFilledCount() {
        const all = this.isAuctionParsed ? 7 : 5
        const count = sum(
            this.isAuctionFilledCount,
            this.isContractFilled,
            this.isBeneficiaryFilled
        )

        return {
            count,
            all,
        }
    }

    sendFilled(): void {
        this.filledDataSync = {
            ...this.fieldsFilledCount
        }
    }

    @Watch('fieldsFilledCount')
    onChangeFilledFields(newValue, oldValue) {
        if (newValue.count !== oldValue.count || newValue.all !== oldValue.all) {
            this.filledDataSync = {
                ...newValue
            }
        }
    }

    steps = stepsOrderCreate
    products = products
}

</script>
