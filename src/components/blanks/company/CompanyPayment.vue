<template lang="pug">
    .b-company-data
        grid-layout-component.__layout(
            v-if="fields"
            :spacing="['green', 12]"
            :layout="grid.layout"
        )
            component(
                v-for="(field, key) in fields.forms"
                v-model="field.value"
                v-bind="field.optionals"
                :is="`${field.optionals.type}-component`"
                :key="key"
                :error.sync="field.error"
                @input="onChangeField(key, $event)"
            )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import FormContainer from "../../../js/utils/formField/formContainer";
import {Maybe} from "../../../js/types/utils/other";
import {companyFieldsBuilder} from "../../../js/services/CompanyService";
import api from "../../../js/api";
import FormSingleField from "../../../js/utils/formField/formSingleField";
import regulars from "../../../js/utils/default/regulars";

@Component
export default class CompanyPayment extends Vue {

    @Prop() readonly value!: {
        bik: Maybe<string>,
        bankAccount: Maybe<string>,
        bankName: Maybe<string>,
        correspondentAccount: Maybe<string>
    }

    typingTimeout
    readonly typingDelay = 500

    fields: FormContainer | null = null

    grid = {
        layout: [
            ['auto', 'auto'],
            ['auto', 'auto']
        ]
    }

    mapComponentsByValueType = {
        input: [
            'bik',
            'bankAccount',
            'bankName',
            'correspondentAccount',
        ],
    }

    mapValueTypeOptions = {
        bik: {
            label: 'БИК',
            placeholder: 'Введите 9-ти значный номер',
            loading: false,
            mask: 'bik',
            errorText: 'Номер БИК должен содержать 9 символов'

        },
        bankAccount: {
            label: 'Номер счёта',
            placeholder: 'Введите 20-ти значный номер',
            mask: 'bankAccount'
        },
        bankName: {
            label: 'Наименование банка',
            placeholder: 'Введите наименование',
            disabled: false
        },
        correspondentAccount: {
            label: 'Номер корресподентского счёта',
            placeholder: 'Введите 20-ти значный номер',
            disabled: false,
            mask: 'bankAccount'
        },
    }

    onChangeField(field, value){
        this.emitValue(field, value)

        this.actionOnChange(field)
    }

    emitValue(field, value){
        const payload = {
            ...this.value,
            [field]: value
        }

        this.$emit('input', payload)
    }

    emitFullPaymentData(){
        this.$emit('input', {
            bik: this.fields?.forms.bik.value,
            bankAccount: this.fields?.forms.bankAccount.value,
            bankName: this.fields?.forms.bankName.value,
            correspondentAccount: this.fields?.forms.correspondentAccount.value,
        })
    }


    actionOnChange(fieldName: string){
        if(fieldName === 'bik'){
            this.getBankInformationByBik()
        }
    }

    getBankInformationByBik(){
        clearTimeout(this.typingTimeout)

        this.typingTimeout = setTimeout(()=>{
            const bik = this.fields?.forms.bik as FormSingleField
            const correspondentAccount = this.fields?.forms.correspondentAccount as FormSingleField
            const bankName = this.fields?.forms.bankName as FormSingleField

            bik.validate()

            if(bik.isValid()){
                this.setLoading(true)

                api.getBankInformationByBik(bik.value!).then(response => {
                    if(response.status === 'ok'){
                        correspondentAccount.value = response.correspondentAccount
                        bankName.value = response.bankName

                        this.emitFullPaymentData()
                    }

                    if(response.status === 'error'){
                        this.$toast({
                            text: 'Банк с таким БИК не найден',
                        })
                    }
                }).finally(() => {
                    this.setLoading(false)
                }).catch(() => {
                    this.$toast({
                        title: 'Ошибка',
                        text: 'Что то пошло не так',
                        view: 'critical'
                    })
                })
            }
        }, this.typingDelay)
    }

    setLoading(state: boolean){
        this.fields!.forms.bik.optionals.loading = state
        this.fields!.forms.correspondentAccount.optionals.disabled = state
        this.fields!.forms.bankName.optionals.disabled = state
    }

    created(){
        this.fields = companyFieldsBuilder({
            components: this.mapComponentsByValueType,
            value: this.value,
            mapValueTypeOptions: this.mapValueTypeOptions,
            regExps: {
                bik: regulars.bik
            }
        })
    }
}
</script>
