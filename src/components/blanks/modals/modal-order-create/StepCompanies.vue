<template lang="pug">
    .b-modal-content-layout
        company-list-component.__item(
            :list="companies"
            :callbackOnAdd="callbackOnAdd"
            :loading="loading"
            @choose="onChooseCompany"
            @sendCompanyId="sendCompanyIdEmit"
        )
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import {UserCompaniesGetter} from "../../../../js/store/modules/user/getters"
import {Action, Getter} from "../../../../js/decorators"
import CompanyList, {ICompanyListProps} from "../../CompanyList.vue"
import {UserFetchCompaniesAction} from "../../../../js/store/modules/user/actions"
import { CompanyAPI } from '../../../../js/api/company'

export type LocalPayload = {
    general: {
        inn: string
        ogrn: string
        kpp: string
        registrationDate: string
        shortName: string
        registerSubjectName: string
        registerSubjectAddress: string
        taxationSystem: null | number | string
        legalAddress: string
        isPostAddressEqualLegal: boolean
        addressPost: string
        isFactAddressEqualPost: boolean
        addressFact: string
        okpo: string
        okato: string
        okopf: string
        oktmo: string
        okved: string
    },
    detail: {
        bik: string,
        bankName: string,
        accountNumber: string,
        correspondentAccountNumber: string,
    },
    founder: [
        {
            name: string,
        },
        {
            name: string,
            filledCount: number,
            fieldCount: number,
        }
    ],
    head: {
        lastname: string,
        firstname: string,
        thirdName: string,
        gender: string,
        citizenship: string,
        inn: string,
        snils: string,
        workPosition: string,
        appointmentDate: string,
        workPhone: string,
        basisDocument: null | string,
        passportNumber: string,
        passportBirthday: string,
        passportPlace: string,
        passportDate: string,
        passportCode: string,
        passportAddress: string,
        registrationAddress: string,
        isAddressEquals: boolean,
        addressFact: string,
    },
    questionnaire: {
        isWriteOff: boolean,
        isBigDeal: boolean,
        isLicenses: boolean,
    },
}


@Component({
    components: {
        'company-list-component': CompanyList
    }
})
export default class StepCompanies extends Vue {
    @Prop() readonly callbackOnAdd!: ICompanyListProps['callbackOnAdd']

    @Getter('user/companies') companies!: UserCompaniesGetter
    @Action('user/fetchCompanies') fetchCompanies!: UserFetchCompaniesAction

    @Emit('updateCompanyData') updateCompanyDataEmit(data) {/**/}
    @Emit('sendCompanyId') sendCompanyIdEmit(id) {/**/}

    loading = false

    setLoading(value){
        this.loading = value
    }

    onFetchCompanies(){
        this.setLoading(true)
        this.fetchCompanies().finally(() => this.setLoading(false))
    }

    onChooseCompany(payload: CompanyAPI.PUT.Update.Params){
        console.log('data company data', payload)
        this.updateCompanyDataEmit(this.convert(payload))
    }

    convert(
        data: CompanyAPI.PUT.Update.Params
    ): LocalPayload {
        return {
            general: {
                inn: data.company.inn,
                ogrn: data.company.ogrn,
                kpp: data.company.kpp,
                registrationDate: data.company.registration_date,
                shortName: data.company.name,
                registerSubjectName: data.company.registration_place,
                registerSubjectAddress: data.company.registration_address,
                taxationSystem: data.company.company_tax_id,
                legalAddress: data.addresses.legal?.full,
                isPostAddressEqualLegal: data.addresses.inbox?.full === data.addresses.legal?.full,
                addressPost: data.addresses.inbox?.full,
                isFactAddressEqualPost: data.addresses.fact?.full === data.addresses.legal?.full,
                addressFact: data.addresses.fact?.full,
                okpo: data.company.okpo,
                okato: data.company.okato,
                okopf: data.company.okopf,
                oktmo: data.company.oktmo,
                okved: data.company.okved,
            },
            detail: {
                bik: data.payment.bik,
                bankName: data.payment.bank_name,
                accountNumber: data.payment.bank_account,
                correspondentAccountNumber: data.payment.correspondent_account,
            },
            head: {
                id: data.head[0].id,
                lastname: data.head[0].second_name,
                firstname: data.head[0].first_name,
                thirdName: data.head[0].third_name,
                gender: `${data.head[0].gender}`,
                citizenship: `${data.head[0].resident_rf}`,
                inn: data.head[0].inn,
                snils: data.head[0].snils,
                workPosition: data.head[0].post,
                appointmentDate: data.head[0].post_date,
                workPhone: data.head[0].phone,
                basisDocument: data.head[0].type_id,
                passportNumber: `${data.head[0].passport_series} ${data.head[0].passport_number}`,
                passportBirthday: data.head[0].birthday,
                passportPlace: data.head[0].birthday_place,
                passportDate: data.head[0].passport_date,
                passportCode: data.head[0].passport_code,
                passportAddress: data.head[0].address_registration,
                registrationAddress: data.head[0].passport_issued_by,
                isAddressEquals: data.head[0].address_actual === data.head[0].address_registration,
                addressFact: data.head[0].address_actual,
            },
        }
    }

    created(){
        if ( !this.companies) {
            this.onFetchCompanies()
        }
    }
}

</script>
