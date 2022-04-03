<template lang="pug">
    modal-big-component.b-modal-add-comoany(
        :name="modals.ADD_COMPANY"
        :head="head"
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
                    company-general-component.__step(
                        v-if="activeStepName === steps.GENERAL"
                        v-model="state.fields.general"
                    )
                    company-payment-component.__step(
                        v-if="activeStepName === steps.PAYMENTS"
                        v-model="state.fields.payment"
                    )
                    company-head-component.__step(
                        v-if="activeStepName === steps.HEAD"
                        v-model="state.fields.head"
                    )
        template(#bottom)
            information-modal-component(
                v-bind="informationModalProps"
            )

</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator'
import { modals } from '../../../js/store/modules/modals/state'
import HeadModal, {IHeadModalProps} from "../HeadModal.vue";
import InformationModal, {IInformationModalProps} from "../InformationModal.vue";
import InputDatepicker from "../../ui/InputDatepicker.vue";
import Radio from "../../ui/Radio.vue";
import CardCheckbox from "../../ui/cards/CardCheckbox.vue";
import {ModalsRemoveActiveAction} from "../../../js/store/modules/modals/actions";
import {DeviceProviderValue} from "../../../js/providers/device";
import {ModalsPayloadGetter} from "../../../js/store/modules/modals/getters";
import {Maybe} from "../../../js/types/utils/other";
import CompanyGeneral from "../company/CompanyGeneral.vue";
import CompanyPayment from "../company/CompanyPayment.vue";
import CompanyHead from "../company/CompanyHead.vue";
import {CompanyAPI} from "../../../js/api/company";
import {Action, Getter} from "../../../js/decorators";

type State = {
    id: Maybe<number>
    fields: {
        general: Record<string, string | boolean | number>,
        payment: Record<string, string | boolean | number>,
        head: Record<string, string | boolean | number>,
    }
}

const steps: Record<string, 'general' | 'payment' | 'founders' | 'head'> = Object.freeze({
    GENERAL: 'general',
    PAYMENTS: 'payment',
    FOUNDERS: 'founders' ,
    HEAD: 'head',
})

type Step = typeof steps[keyof typeof steps]

@Component({
    components: {
        'head-modal-component': HeadModal,
        'information-modal-component': InformationModal,
        'input-datepicker-component': InputDatepicker,
        'radio-component': Radio,
        'card-checkbox-component': CardCheckbox,
        'company-general-component': CompanyGeneral,
        'company-payment-component': CompanyPayment,
        'company-head-component': CompanyHead,
    }
})
export default class ModalAddCompany extends Vue {
    @Inject('$device') $device!: DeviceProviderValue
    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction
    @Getter('modals/payload') modalPayload!: ModalsPayloadGetter

    state: State = {
        id: null,
        fields: {
            general: {
                inn: '',
                ogrn: '',
                kpp: '',
                registrationDate:'',
                name: '',
                registrationAddress: '',
                registrationPlace: '',
                taxId: 1,
                addressLegal: '',
                checkPost: true,
                addressPost: '',
                checkFact: true,
                addressFact: '',
            },
            payment: {
                bik: '',
                bankAccount: '',
                bankName: '',
                correspondentAccount: ''
            },
            head: {
                firstName: '',
                secondName: '',
                thirdName: '',
                gender: 1,
                residentRf: 1,
                inn: '',
                snils:'',
                post:'',
                postDate: '',
                phone: '',
                base: 1,
                passportNumber:'',
                passportBirthday: '',
                passportBirthdayPlace: '',
                passportDate: '',
                passportCode: '',
                passportIssuedBy: '',
                addressRegistration: '',
                checkActual: true,
                addressActual: '',
            },
            // founders: {
            //     legal: [
            //         {
            //             type: '',
            //             lastname: '',
            //             firstname: '',
            //             thirdName: '',
            //             gender: '',
            //             citizenship: '',
            //             inn: '',
            //             part: '',
            //         }
            //     ],
            //     individual: [
            //         {
            //             type: '',
            //             lastname: '',
            //             firstname: '',
            //             thirdName: '',
            //             gender: '',
            //             citizenship: '',
            //             inn: '',
            //             part: '',
            //         }
            //     ]
            // }
        },
    }

    head = {
        title: 'Добавление компании'
    }

    steps = steps
    step = 0


    changeStep(direction: 'back' | 'next'){
        if(direction === 'back'){
            if(this.step === 0){
                this.closeModal()

            } else {
                this.step -= 1
            }
        }

        if(direction === 'next'){
            if(!this.isLastStep){
                this.step += 1
            }
        }
    }

    get isLastStep(){
        return this.step === this.stepsIndexes.length - 1
    }

    get progressBarValue(){
        return Array(4).fill(0).map((item, index) => {
            const defaultValue = 0.2
            const otherStepValue = index > this.step ? 0 : 1
            const startValue = index === this.step ? 0.2 : 0
            const fieldsValue = index === this.step ? (1 - defaultValue) * (this.activeStepFieldsCount.fill/this.activeStepFieldsCount.all) : otherStepValue

            return startValue + fieldsValue
        })
    }

    get progressBar():IHeadModalProps['progressBar']{
        return {
            value: this.progressBarValue,
            stepsNames: [
                'Заполните общие данные о компании',
                'Заполните реквизиты компании',
                'Заполните данные учредителей',
                'Заполните данные руководителя',
            ],
            view: this.isComplete ? 'success': 'brand'
        }
    }

    get buttonBack(): IHeadModalProps['button']{
        return {
            text: this.activeStepName === steps.GENERAL ? 'Вернуться к списку компаний' : 'Вернуться на предыдущий шаг',
        }
    }

    get stepsIndexes(): Step[]{
        return [steps.GENERAL, steps.PAYMENTS, steps.FOUNDERS, steps.HEAD]
    }

    get activeStepName(){
        return this.stepsIndexes[this.step]
    }

    get informationModalProps(): IInformationModalProps{
        return {
            title: {
                text: this.activeStepFieldsCount.fill === this.activeStepFieldsCount.all ? 'Все данные заполнены' : `Заполнено ${this.activeStepFieldsCount.fill} из ${this.activeStepFieldsCount.all}`,
                view: this.activeStepFieldsCount.fill === this.activeStepFieldsCount.all ? 'success' :'base'
            },
            button: {
                text: this.isLastStep ? 'Добавить компанию' : 'Перейти далее',
                callback: () => this.changeStep('next')
            }
        }
    }

    get activeStepFieldsCount(): {all: number, fill: number}{
        const mapCounts = {
            general: this.generalFieldsCount,
            payment: this.paymentFieldsCount,
            head: this.headFieldsCount
        }

        return mapCounts[this.activeStepName] || {all: 1, fill: 1}
    }
    get headFieldsCount(){
        return this.getCounts('head')
    }

    get paymentFieldsCount(){
        return this.getCounts('payment')
    }

    get generalFieldsCount(){
        return this.getCounts('general')
    }

    get isComplete(){
        return this.isLastStep && this.activeStepFieldsCount.all === this.activeStepFieldsCount.fill
    }


    getCounts(stepName: keyof State['fields']){
        const fields = this.state.fields[stepName]
        const fieldsNames =  Object.keys(fields).filter(field => !~field.indexOf('check'))
        const fill = fieldsNames.reduce((total, field) => total + Number(!!fields[field]), 0)
        return {
            all: fieldsNames.length,
            fill
        }
    }

    setPayloadData(){
        if(this.modalPayload ){
            const payloadData = this.modalPayload.companyData as CompanyAPI.GET.Get.Response['data']
            this.state.id = payloadData.company.id

            this.state.fields.payment = {
                bik: payloadData.payment.bik,
                bankAccount: payloadData.payment.bank_account,
                bankName: payloadData.payment.bank_name,
                correspondentAccount: payloadData.payment.correspondent_account
            }

            this.state.fields.general.inn = payloadData.company.inn ?? ''
            this.state.fields.general.kpp = payloadData.company.kpp ?? ''
            this.state.fields.general.ogrn = payloadData.company.ogrn ?? ''
            this.state.fields.general.name = payloadData.company.name ?? ''
            this.state.fields.general.taxId = payloadData.company.company_tax_id
            this.state.fields.general.registrationAddress = payloadData.company.federal_tax_registration_place
            this.state.fields.general.registrationDate = payloadData.company.registration_date ?? ''
            this.state.fields.general.registrationPlace = payloadData.company.registration_place ?? ''
        }
    }

    created(){
        this.setPayloadData()
    }

    modals = Object.freeze(modals)
}

</script>
