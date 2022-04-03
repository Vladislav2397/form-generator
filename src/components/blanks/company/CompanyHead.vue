<template lang="pug">
    .b-company-data
        grid-layout-component.__layout(
            v-if="fields"
            :spacing="['green', 12]"
            :layout="grid.layout"
        )
            template(
                v-for="(title, key) in grid.titles"
                v-slot:[`index-${key}`]="{elementClass}"
            )
                div(
                    data-space="blue"
                    :class="elementClass"
                )
                    p {{ title }}
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
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
import FormContainer from "../../../js/utils/formField/formContainer";
import {Maybe} from "../../../js/types/utils/other";
import {DeviceProviderValue} from "../../../js/providers/device";
import {companyFieldsBuilder} from "../../../js/services/CompanyService";

@Component
export default class CompanyHead extends Vue {
    @Prop() readonly value!: {
        bik: Maybe<string>,
        bankAccount: Maybe<string>,
        bankName: Maybe<string>,
        correspondentAccount: Maybe<string>
    }

    @Inject('$device') $device!: DeviceProviderValue

    fields: FormContainer | null = null

    grid = {
        layout: [
            ['auto', 'auto', 'auto'],
            ['auto', 'auto'],
            ['auto', 'auto'],
            ['auto', 'auto', 'auto'],
            ['auto'],
            ['auto', 'auto', '50%'],
            ['auto', 'auto', '50%'],
            ['auto'],
            ['auto'],
            ['auto']
        ],
        titles: {
            [this.$device.size.mobile ? 10 : 4]: 'Паспортные данные',
        }
    }

    mapComponentsByValueType = {
        input: [
            'firstName',
            'secondName',
            'thirdName',
            'inn',
            'snils',
            'post',
            'phone',
            'passportNumber',
            'passportBirthdayPlace',
            'passportCode',
            'passportIssuedBy',
            'addressRegistration',
            'addressActual',
        ],
        'input-datepicker': ['postDate','passportBirthday','passportDate'],
        radio: ['gender', 'residentRf', 'base'],
        'card-checkbox': ['checkActual'],
    }

    mapValueTypeOptions = {
        firstName: {
            label: 'Фамилия',
            placeholder: 'Введите фамилию',
        },
        secondName: {
            label: 'Имя',
            placeholder: 'Введите имя',
        },
        thirdName: {
            label: 'Отчество',
            placeholder: 'Введите отчество',
        },
        gender: {
            label: 'Пол',
            direction: this.$device.size.mobile ? 'column' : 'row',
        },
        residentRf: {
            label: 'Гражданство РФ',
            direction: this.$device.size.mobile ? 'column' : 'row',
        },
        inn: {
            label: 'ИНН',
            placeholder: 'Введите ИНН',
            mask: 'inn'
        },
        snils: {
            label: 'СНИЛС',
            placeholder: 'Введите номер',
            mask: 'snils'
        },
        post: {
            label: 'Должность',
            placeholder: 'Введите должность',
        },
        postDate: {
            label: 'Дата назначения',
            placeholder: 'дд.мм.гггг',
        },
        phone: {
            label: 'Рабочий телефон',
            placeholder: '+7 900 000-00-00',
            mask: 'phone'
        },
        base: {
            label: 'Действует на основании',
            direction: this.$device.size.mobile ? 'column' : 'row',
        },
        passportNumber: {
            label: 'Серия и номер',
            placeholder: '0000 000000',
            mask: 'passport'
        },
        passportBirthday: {
            label: 'Дата рождения',
            placeholder: 'дд.мм.гггг',
        },
        passportBirthdayPlace: {
            label: 'Место рождения',
            placeholder: 'Введите город',
        },
        passportDate: {
            label: 'Дата выдачи',
            placeholder: 'дд.мм.гггг',
        },
        passportCode: {
            label: 'Код подразделения',
            placeholder: 'Введите номер',
            mask: 'subdivision-code'
        },
        passportIssuedBy: {
            label: 'Кем выдан',
            placeholder: 'Введите город',
        },
        addressRegistration: {
            label: 'Адрес регистрации',
            placeholder: 'Введите адрес',
        },
        checkActual: {
            label: 'Фактический адрес совпадает с адресом регистрации',
        },
        addressActual: {
            label: 'Фактический адрес',
            placeholder: 'Введите адрес',
        }
    }

    lists = {
        gender: [
            {
                id: 1,
                text: 'Мужской'
            },
            {
                id: 0,
                text: 'Женский'
            }
        ],
        residentRf: [
            {
                id: 1,
                text: 'Резидент'
            },
            {
                id: 0,
                text: 'Не резидент'
            }
        ],
        base: [
            {
                id: 1,
                text: 'Устава'
            },
            {
                id: 2,
                text: 'Договора'
            },
            {
                id: 3,
                text: 'Акта суда'
            },
            {
                id: 4,
                text: 'В силу закона'
            }
        ]
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
        if(['addressRegistration', 'checkActual'].includes(fieldName)) {
            this.setHeadAddressActualValue()
        }
    }

    setHeadAddressActualValue(){
        this.$nextTick(() => {
            if(this.fields?.forms.checkActual.value){
                this.emitValue('addressActual', this.fields.forms.addressRegistration.value)
                this.fields.forms.addressActual.value = this.fields.forms.addressRegistration.value
            }
        })
    }

    isShowComponent(key: string){
        if(key === 'addressActual') {
            return !this.fields?.forms.checkActual.value
        }

        return true
    }

    created(){
        this.fields = companyFieldsBuilder({
            components: this.mapComponentsByValueType,
            value: this.value,
            lists: this.lists,
            mapValueTypeOptions: this.mapValueTypeOptions,
        })
    }
}

</script>
