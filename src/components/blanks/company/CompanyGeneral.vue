<template lang="pug">
    .b-company-data
        grid-layout-component.__layout(
            v-if="fields"
            :spacing="['green', 12]"
            :layout="grid.layout"
        )
            component(
                v-for="(field, key) in fields.forms"
                v-if="isShowComponent(key)"
                v-model="field.value"
                v-bind="field.optionals"
                :is="`${field.optionals.type}-component`"
                :key="key"
                @input="onChangeField(key, $event)"
            )

</template>

<script lang="ts">
import {Component, Prop, Inject, Vue} from 'vue-property-decorator'
import {Maybe} from "../../../js/types/utils/other";
import FormContainer from "../../../js/utils/formField/formContainer";
import {DeviceProviderValue} from "../../../js/providers/device";
import {companyFieldsBuilder} from "../../../js/services/CompanyService";

@Component
export default class CompanyGeneral extends Vue {

    @Prop() readonly value!: {
        inn: Maybe<string>
        ogrn: Maybe<string>
        kpp: Maybe<string>
        registrationDate: Maybe<string>
        taxId: number
        name: Maybe<string>
        registrationAddress: Maybe<string>
        registrationPlace: Maybe<string>
        checkPost: boolean
        addressPost: Maybe<string>
        checkFact: boolean
        addressFact: Maybe<string>
    }

    @Inject('$device') $device!: DeviceProviderValue

    fields: FormContainer | null = null

    grid = {
        layout: [['auto', 'auto', 'auto','auto']]
    }

    lists =  {
        taxId: [
            {
                id: 1,
                text: 'ОСН',
            },
            {
                id: 2,
                text: 'УСН',
            },
            {
                id: 3,
                text: 'Патент',
            },
        ]
    }

    mapValueTypeOptions = {
        inn: {
            label: 'ИНН',
            placeholder: 'Введите ИНН',
            mask: 'inn'
        },
        ogrn: {
            label: 'ОГРН',
            placeholder: 'Введите номер',
            mask: 'number'
        },
        kpp: {
            label: 'КПП',
            placeholder: 'Введите номер',
            mask: 'number'
        },
        registrationDate: {
            label: 'Дата регистрации',
            placeholder: 'дд.мм.гггг',
            position: 'right'
        },
        name: {
            label: 'Сокращённое наименование',
            placeholder: 'Введите сокращённое наименование',
        },
        taxId: {
            label: 'Система налогообложения',
            direction: this.$device.size.mobile ? 'column' : 'row',
        },
        registrationAddress: {
            label: 'Адрес регистрирующего органа',
            placeholder: 'Введите адрес',
        },
        registrationPlace: {
            label: 'Наименование регистрирующего органа',
            placeholder: 'Введите наименование',
        },
        addressLegal: {
            label: 'Юридический адрес',
            placeholder: 'Введите адрес',
        },
        checkPost: {
            label: 'Почтовый адрес совпадает с юридическим'
        },
        addressPost: {
            label: 'Почтовый адрес',
            placeholder: 'Введите адрес',
        },
        checkFact: {
            label: 'Фактический адрес совпадает с почтовым'
        },
        addressFact: {
            label: 'Фактический адрес',
            placeholder: 'Введите адрес',
        },
    }

    mapComponentsByValueType = {
        input: [
            'inn',
            'ogrn',
            'kpp',
            'name',
            'registrationAddress',
            'registrationPlace',
            'addressLegal',
            'addressPost',
            'addressFact',
        ],
        'input-datepicker': ['registrationDate'],
        'card-checkbox': [
            'checkPost',
            'checkFact'
        ],
        radio: ['taxId'],
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


    actionOnChange(fieldName: string){
        if(['addressLegal', 'checkPost', 'checkFact'].includes(fieldName)) {
            this.setGeneralAddressesValue()
        }
    }


    setGeneralAddressesValue(){
        this.$nextTick(() => {
            if(this.fields?.forms.checkPost.value){
                this.emitValue('addressPost', this.fields.forms.addressLegal.value)
                this.fields.forms.addressPost.value = this.fields.forms.addressLegal.value
            }

            this.$nextTick(() => {
                if(this.fields?.forms.checkFact.value){
                    this.emitValue('addressFact', this.fields.forms.addressLegal.value)
                    this.fields.forms.addressFact.value = this.fields.forms.addressLegal.value
                }
            })
        })
    }


    isShowComponent(key: string){

        if(key === 'addressPost') {
            return !this.fields?.forms.checkPost.value
        }

        if(key === 'addressFact') {
            return !this.fields?.forms.checkFact.value
        }

        return true
    }

    created(){
        this.fields = companyFieldsBuilder({
            components: this.mapComponentsByValueType,
            value: this.value,
            lists: this.lists,
            mapValueTypeOptions: this.mapValueTypeOptions
        })
    }
}

</script>
