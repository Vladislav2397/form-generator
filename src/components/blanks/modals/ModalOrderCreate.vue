<template lang="pug">
    modal-big-component.b-modal-order-create(
        :name="modals.ORDER_CREATE"
        :head="head"
        :showAppend="showAppend"
    )
        .b-modal-big-layout
            head-modal-component.__head(
                :progressBar="progressBar"
                :button="buttonBack"
                @back="changeStep('back')"
            )
            .__steps
                transition(
                    name="fade"
                    mode="out-in"
                )
                    step-products-component.__step(
                        v-if="isActiveStep(steps.PRODUCT)"

                        ref="step"
                        @choose="onChooseProduct"
                    )
                    step-purchase-component.__step(
                        v-if="isActiveStep(steps.PURCHASE)"

                        ref="step"
                        :auction.sync="allFields.purchase.auction"
                        :contract.sync="allFields.purchase.contract"
                        :beneficiary.sync="allFields.purchase.beneficiary"
                        :filledData.sync="purchaseFields"
                    )
                    step-companies-component.__step(
                        v-if="isActiveStep(steps.COMPANY)"

                        ref="step"
                        @updateCompanyData="onUpdateCompanyData"
                        @sendCompanyId="onSendCompanyId"
                        :callbackOnAdd="() => changeStep('next')"
                    )
                    step-company-data-component(
                        v-if="isActiveStep(steps.COMPANY_DATA)"

                        ref="step"
                        :general.sync="allFields.companyData.general"
                        :detail.sync="allFields.companyData.detail"
                        :founder.sync="allFields.companyData.founder"
                        :head.sync="allFields.companyData.head"
                        :questionnaire.sync="allFields.companyData.questionnaire"
                        :filledData.sync="purchaseFields"
                    )
                    step-documents-component.__step(
                        v-if="isActiveStep(steps.DOCUMENTS)"

                        ref="step"
                        :orderId="order_id"
                    )
                    step-banks-component.__step(
                        v-if="isActiveStep(steps.BANKS)"

                        ref="step"
                        :orderId="order_id"
                    )

        template(
            #bottom
            v-if="isShowInformationModal"
        )
            transition(
                name="fade"
                mode="out-in"
                appear
            )
                information-modal-component(
                    v-bind="informationModalProps"
                )

</template>

<script lang="ts">
import { Component, ProvideReactive, Ref, Vue } from 'vue-property-decorator'
import { Action, Getter } from '../../../js/decorators'

import HeadModal, { IHeadModalProps } from '../HeadModal.vue'
import DocumentList from '../DocumentList.vue'
import InformationModal, { IInformationModalProps } from '../InformationModal.vue'
import CompanyList from '../CompanyList.vue'
import StepProducts from './modal-order-create/StepProducts.vue'
import StepPurchase from './modal-order-create/StepPurchase.vue'
import StepCompanies, { LocalPayload } from './modal-order-create/StepCompanies.vue'
import StepDocuments from './modal-order-create/StepDocuments.vue'
import { UserCompaniesGetter } from '../../../js/store/modules/user/getters'
import { stepsOrderCreate } from '../../../js/store/modules/order-create/state'
import StepBanks from './modal-order-create/StepBanks.vue'
import FounderStep from './modal-add-company/FounderStep.vue'
import StepCompanyData from './modal-order-create/StepCompanyData.vue'

import { ModalsRemoveActiveAction } from '../../../js/store/modules/modals/actions'
import { ProductsListGetter } from '../../../js/store/modules/products/getters'
import {
    OrderCreateFetchDocumentAction, OrderCreateSaveOrderAction, OrderCreateSendTemplateAction,
    OrderCreateSetActiveStepAction,
    OrderCreateSetProductAction, OrderCreateUpdateCompanyAction,
} from '../../../js/store/modules/order-create/actions'
import { OrderCreateActiveStepGetter, OrderCreateProductGetter } from '../../../js/store/modules/order-create/getters'

import { modals } from '../../../js/store/modules/modals/state'
import { Maybe } from '../../../js/types/utils/other'

const sum = (...args) => args.reduce((total, num) => total + +num, 0)

const convertToDate = (dateStringArr: string[]) => {
    const re = /(\d{2})\.(\d{2})\.(\d{4})/
    return dateStringArr.map(
        dateString => {
            const date = new Date(dateString.replace(re, '$3-$2-$1'))

            return date.getTime()
        }
    )
}

const getSubtractionDays = (dates: string[]) => {
    const dateArray = convertToDate(dates)

    return ((dateArray[1] - dateArray[0]) / 1000 / 60 / 60 / 24).toFixed(0)
}

@Component({
    components: {
        'step-company-data-component': StepCompanyData,
        'founder-step-component': FounderStep,
        'information-modal-component':InformationModal,
        'company-list-component': CompanyList,
        'head-modal-component': HeadModal,
        'document-list-component': DocumentList,
        'step-products-component': StepProducts,
        'step-purchase-component': StepPurchase,
        'step-companies-component': StepCompanies,
        'step-documents-component': StepDocuments,
        'step-banks-component': StepBanks,
    }
})
export default class ModalOrderCreate extends Vue {
    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction
    @Action('orderCreate/setProduct') setProduct!: OrderCreateSetProductAction
    @Action('orderCreate/setActiveStep') setActiveStep!: OrderCreateSetActiveStepAction
    @Action('orderCreate/fetchDocuments') fetchDocuments!: OrderCreateFetchDocumentAction
    @Action('orderCreate/sendTemplate') sendTemplate!: OrderCreateSendTemplateAction
    @Action('orderCreate/updateCompany') updateCompany!: OrderCreateUpdateCompanyAction
    @Action('orderCreate/saveOrder') saveOrder!: OrderCreateSaveOrderAction

    @Getter('orderCreate/activeStep') activeStep!: OrderCreateActiveStepGetter
    @Getter('products/list') products!: ProductsListGetter
    @Getter('orderCreate/product') product!: OrderCreateProductGetter
    @Getter('user/companies') companies!: UserCompaniesGetter

    @ProvideReactive('sendFilled')
    sendFilled({ count, all }: { count: number, all: number }) {
        this.purchaseFields = { count, all }
    }

    @Ref('step') stepRef!: Vue & { validate(): void, isValid(): boolean }

    step = 0

    validateAction = false
    stepIsValid = true

    showAppend = true
    order_id = 2
    companyId: Maybe<number> = null

    purchaseFields = {
        all: 0,
        count: 0,
    }

    head = {
        title: 'Подача заявки'
    }

    allFields = {
        purchase: {
            auction: {
                auctionNumber: '',
                financeProductId: '',
                auctionDate: ['', ''],
                auctionSum: '',
                proposedPrice: '',
            },
            contract: {
                nmck: '',
                lotCount: '',
                publishDate: '',
                iku: '',
                ikz: '',
                cooperative: false,
                closedTender: false,
                okpd2: '',
                link: '',
                region: '',
                subjectContract: '',
                protocolName: '',
                protocolNumber: '',
                protocolDate: '',
            },
            beneficiary: {
                inn: '',
                ogrn: '',
                kpp: '',
                name: '',
                registerDate: '',
                oktmo: '',
                okopf: '',
                regionCode: '',
                address: '',
            },
        },
        companyData: {
            general: {
                inn: '',
                ogrn: '',
                kpp: '',
                registrationDate: '',
                shortName: '',
                registerSubjectName: '',
                registerSubjectAddress: '',
                taxationSystem: null,
                legalAddress: '',
                isPostAddressEqualLegal: false,
                addressPost: '',
                isFactAddressEqualPost: false,
                addressFact: '',
            },
            detail: {
                bik: '',
                bankName: '',
                accountNumber: '',
                correspondentAccountNumber: '',
            },
            founder: [
                {
                    name: 'Кусков Егор Демьянович',
                },
                {
                    name: 'Кузнецов Анатолий Алексеевич',
                    filledCount: 11,
                    fieldCount: 13,
                }
            ],
            head: {
                id: '' as string | number,
                lastname: '',
                firstname: '',
                thirdName: '',
                gender: '',
                citizenship: '',
                inn: '',
                snils: '',
                workPosition: '',
                appointmentDate: '',
                workPhone: '',
                basisDocument: null,
                passportNumber: '',
                passportBirthday: '',
                passportPlace: '',
                passportDate: '',
                passportCode: '',
                passportAddress: '',
                registrationAddress: '',
                isAddressEquals: false,
                addressFact: '',
            },
            questionnaire: {
                isWriteOff: false,
                isBigDeal: false,
                isLicenses: false,
            },
        },
    }

    getValidate(isValid: boolean){
        this.stepIsValid =  isValid
        this.validateAction = false
    }

    onSendCompanyId(id) {
        this.companyId = id
    }

    async changeStep(direction: 'back' | 'next'){
        console.log('change step')

        this.stepIsValid = true

        if (direction === 'back'){
            if(this.step !== 0) {
                this.step -= 1
            } else {
                await this.closeModal()
            }

            switch(this.activeStep) {
                case stepsOrderCreate.PRODUCT:
                    await this.setProduct(null)
                    break;
                default:
                    break;
            }

        } else if(direction === 'next'){
            if (this.step !== this.progressBarValue.length) {
                if (this.stepRef.validate) {
                    this.stepRef.validate()

                    if(this.stepRef.isValid && this.stepRef.isValid()){
                        try {
                            await this.onNextStep()

                            this.step += 1
                        } catch (error) {
                            console.log('sendTemplateError')
                            console.error(error)
                        }
                    }
                } else {
                    this.step += 1
                }
            }
        }

        await this.setActiveStep(this.stepsIndexes[this.step])
    }

    onChooseProduct(){
        this.changeStep('next')
    }

    async onNextStep() {
        console.log('onNextStep')

        if (this.isActiveStep(this.steps.PURCHASE)) {
            this.sendTemplate({
                order: {
                    sum: +(this.allFields.purchase.auction.auctionSum.replace(',', '.').replace(/\s/g, '')),
                    date_start: this.allFields.purchase.auction.auctionDate[0],
                    date_end: this.allFields.purchase.auction.auctionDate[1],
                    finance_product_id: `${this.allFields.purchase.auction.financeProductId}`,
                    proposed_price: this.allFields.purchase.auction.proposedPrice,
                    days: `${getSubtractionDays(this.allFields.purchase.auction.auctionDate)}`,
                },
                purchase: {
                    contract: {
                        number: this.allFields.purchase.auction.auctionNumber,
                        nmck: `${this.allFields.purchase.contract.nmck}`,
                        lot_count: this.allFields.purchase.contract.lotCount,
                        publish_date: this.allFields.purchase.contract.publishDate,
                        ikz: this.allFields.purchase.contract.ikz,
                        iku: this.allFields.purchase.contract.iku,
                        cooperative: this.allFields.purchase.contract.cooperative,
                        closed_tender: this.allFields.purchase.contract.closedTender,
                        okpd2: this.allFields.purchase.contract.okpd2,
                        link: this.allFields.purchase.contract.link,
                        region: this.allFields.purchase.contract.region,
                        subject: this.allFields.purchase.contract.subjectContract,
                        protocol: {
                            name: this.allFields.purchase.contract.protocolName,
                            number: this.allFields.purchase.contract.protocolNumber,
                            date: this.allFields.purchase.contract.protocolDate,
                        },
                    },
                    customer: {
                        inn: this.allFields.purchase.beneficiary.inn,
                        ogrn: this.allFields.purchase.beneficiary.ogrn,
                        kpp: this.allFields.purchase.beneficiary.kpp,
                        name: this.allFields.purchase.beneficiary.name,
                        register_date: this.allFields.purchase.beneficiary.registerDate,
                        oktmo: this.allFields.purchase.beneficiary.oktmo,
                        okopf: this.allFields.purchase.beneficiary.okopf,
                        region_code: this.allFields.purchase.beneficiary.regionCode,
                        address: {
                            full: this.allFields.purchase.beneficiary.address
                        },
                    }
                }
            }).then(response => {
                this.order_id = response.order.id
            })
        } else if (this.isActiveStep(this.steps.COMPANY_DATA)) {
            const [ passportSeries, passportNumber ] =
                this.allFields.companyData.head.passportNumber.split(' ')

            await this.updateCompany({
                companyId: this.companyId ?? 0,
                data: {
                    company: {
                        id: this.companyId ?? 0,
                        inn: this.allFields.companyData.general.inn,
                        ogrn: this.allFields.companyData.general.ogrn,
                        kpp: this.allFields.companyData.general.kpp,
                        registration_date: this.allFields.companyData.general.registrationDate,
                        name: this.allFields.companyData.general.shortName,
                        registration_place: this.allFields.companyData.general.registerSubjectName,
                        registration_address: this.allFields.companyData.general.registerSubjectAddress,
                        full_name: this.allFields.companyData.general.shortName,
                        tax_id: `${this.allFields.companyData.general.taxationSystem}` ?? '0',
                        okpo: this.allFields.companyData.general.okpo,
                        okato: this.allFields.companyData.general.okato,
                        oktmo: this.allFields.companyData.general.oktmo,
                        okopf: this.allFields.companyData.general.okopf,
                        okved: this.allFields.companyData.general.okved,
                        addresses: {
                            legal: this.allFields.companyData.general.legalAddress,
                            post: !this.allFields.companyData.general.isPostAddressEqualLegal
                                ? this.allFields.companyData.general.addressPost
                                : this.allFields.companyData.general.legalAddress,
                            fact: !this.allFields.companyData.general.isFactAddressEqualPost
                                ? this.allFields.companyData.general.addressFact
                                : this.allFields.companyData.general.legalAddress,
                        }
                    },
                    payment: {
                        bik: this.allFields.companyData.detail.bik,
                        bank_name: this.allFields.companyData.detail.bankName,
                        bank_account: this.allFields.companyData.detail.accountNumber,
                        correspondent_account: this.allFields.companyData.detail.correspondentAccountNumber,
                    },
                    head: {
                        id: +this.allFields.companyData.head.id,
                        second_name: this.allFields.companyData.head.lastname,
                        first_name: this.allFields.companyData.head.firstname,
                        third_name: this.allFields.companyData.head.thirdName,
                        gender: +this.allFields.companyData.head.gender,
                        resident_rf: +this.allFields.companyData.head.citizenship,
                        inn: this.allFields.companyData.head.inn,
                        snils: this.allFields.companyData.head.snils,
                        post: this.allFields.companyData.head.workPosition,
                        post_date: this.allFields.companyData.head.appointmentDate,
                        phone: this.allFields.companyData.head.workPhone?.replace(/\s|-/g, ''),
                        base: `${this.allFields.companyData.head.basisDocument}`,
                        passport: {
                            series: passportSeries,
                            number: passportNumber,
                            birthday: this.allFields.companyData.head.passportBirthday,
                            birthday_place: this.allFields.companyData.head.passportPlace,
                            code: this.allFields.companyData.head.passportCode,
                            date: this.allFields.companyData.head.passportDate,
                            issued_by: this.allFields.companyData.head.registrationAddress,
                        },
                        addresses: {
                            legal: this.allFields.companyData.head.passportAddress,
                            fact: this.allFields.companyData.head.addressFact,
                        }
                    },
                }
            })
            await this.saveOrder({
                order: {
                    id: `${this.order_id}`,
                    company_id: `${this.companyId}`
                },
                form: {
                    big: this.allFields.companyData.questionnaire.isBigDeal,
                    requirement_no_dispute: this.allFields.companyData.questionnaire.isWriteOff
                }
            })
        }
    }

    onUpdateCompanyData(data: LocalPayload) {
        this.allFields.companyData.general = { ...this.allFields.companyData.general, ...data.general }
        this.allFields.companyData.detail = { ...this.allFields.companyData.detail, ...data.detail }
        this.allFields.companyData.head = { ...this.allFields.companyData.head, ...data.head }
    }

    isActiveStep(step: stepsOrderCreate | stepsOrderCreate[]){
        if (Array.isArray(step)) {
            return step.includes(this.activeStep)
        }

        return this.activeStep === step
    }

    get progressBarValue(){
        const startProgressValue = 0.2;

        const isFillFirstStep = this.product !== null
        const step1Progress = startProgressValue + (isFillFirstStep ? 0.8 : 0)

        const step2Progress = ( (this.step >= 2 && 1) || +(+this.purchaseFields.count / +this.purchaseFields.all).toFixed(1)) || 0.2

        const step3Progress = (step2Progress && this.step >= 3) ? 1 : 0.2
        const step4Progress = (step3Progress && this.step >= 4) ? 1 : 0.2
        const step5Progress = (step4Progress && this.step >= 5) ? 1 : 0.2
        const step6Progress = (step5Progress && this.step >= 6) ? 1 : 0.2

        return [
            step1Progress,
            step2Progress,
            step3Progress,
            step4Progress,
            step5Progress,
            step6Progress,
        ]
    }

    get progressBarStepsNames() {
        return [
            'Выберите банковский продукт',
            'Заполните данные заявки',
            this.companies && this.companies.length ? 'Выберите компанию' : 'Добавьте компанию',
            'Проверьте данные компании',
            'Загрузите документы',
            'Выберите до 5 предложений от банков',
        ]
    }

    get bottomTextByStep() {
        switch (this.step) {
            case this.steps.PURCHASE: {
                return this.purchaseFields.count === this.purchaseFields.all
                    ? 'Все данные заполнены'
                    : `Заполнено ${this.purchaseFields.count} из ${this.purchaseFields.all}`
            }
            case this.steps.COMPANY_DATA: {
                console.log('change step bottom')
                return this.purchaseFields.count === this.purchaseFields.all
                    ? 'Все данные заполнены'
                    : `Заполнено ${this.purchaseFields.count} из ${this.purchaseFields.all}`
            }
            default: return ''
        }
    }

    get isProgressBarComplete(){
        return false
    }

    get progressBar():IHeadModalProps['progressBar']{
        return {
            value: this.progressBarValue,
            stepsNames: this.progressBarStepsNames,
            view: this.isProgressBarComplete ? 'success' : 'brand'
        }
    }

    get buttonBack(): IHeadModalProps['button']{
        return {
            text: this.step === 0 ? 'Назад к заявкам' : 'Вернуться на предыдущий шаг',
        }
    }

    get stepsIndexes(): stepsOrderCreate[]{
        return [
            stepsOrderCreate.PRODUCT,
            stepsOrderCreate.PURCHASE,
            stepsOrderCreate.COMPANY,
            stepsOrderCreate.COMPANY_DATA,
            stepsOrderCreate.DOCUMENTS,
            stepsOrderCreate.BANKS
        ]
    }

    get informationModalProps(): IInformationModalProps{
        return {
            title: {
                text: this.bottomTextByStep,
                view: 'base',
            },
            button: {
                text: 'Перейти далее',
                callback: () => this.changeStep('next')
            }
        }
    }

    get isShowInformationModal(){
        return this.isActiveStep([
            stepsOrderCreate.PURCHASE,
            stepsOrderCreate.COMPANY_DATA,
            stepsOrderCreate.DOCUMENTS,
            stepsOrderCreate.BANKS,
        ])
    }

    modals = Object.freeze(modals)
    steps = Object.freeze(stepsOrderCreate)
}

</script>
