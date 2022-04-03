<template lang="pug">

.b-founder-step
    radio-component(
        v-model="founderType.value"
        v-bind="founderType.binding"
    )
    founder-form-component(
        v-model="currentFounder.fields"
        :layout="currentFounder.layout"
        :slotName="currentSlot"
    )
        template(
            #[currentSlot]
        )
            p {{ currentFounder.slot.text }}

</template>

<script lang="ts">
import { Vue, Component, VModel } from 'vue-property-decorator'

import FounderForm from './FounderForm.vue'
import GridForm from './GridForm.vue'
import { fieldByName } from '../../../../js/utils/field/genInputData'

@Component({
    components: {
        'grid-form-component': GridForm,
        'founder-form-component': FounderForm
    },
})
export default class FounderStep extends Vue {
    @VModel() valueModel!: []

    founderType = fieldByName('founderType')

    gridForms = {
        individual: {
            fields: {
                firstname: '',
                lastname: '',
                thirdName: '',
                gender: null,
                citizenship: null,
                inn: '',
                part: '',
                passportNumber: '',
                passportBirthday: '',
                passportPlace: '',
                passportDate: '',
                passportCode: '',
                passportCity: '',
                passportAddress: '',
                isAddressEquals: '',
                addressFact: '',
                isPublic: '',
            },
            layout: [
                // ['auto'],
                ['auto', 'auto', 'auto'],
                ['auto'],
                ['auto'],
                ['auto'],
                ['auto'],
                ['25%', '25%', '50%'],
                ['25%', '25%', '50%'],
                ['auto'],
                ['auto'],
                ['auto'],
                ['auto'],
            ],
            slot: {
                name: 'index-4',
                text: 'Паспортные данные'
            }
        },
        legal: {
            fields: {
                inn: '',
                kpp: '',
                ogrn: '',
                name: '',
                registrationDate: '',
                registrationPlace: '',
                part: '',
                firstname: '',
                lastname: '',
                thirdName: '',
                registrationAddress: '',
                isAddressEquals: '',
                addressFact: '',
            },
            layout: [
                // ['auto'],
                ['auto', 'auto', 'auto'],
                ['auto'],
                ['32%', 'auto'],
                ['auto'],
                ['auto', 'auto', 'auto'],
                ['auto'],
                ['auto'],
            ],
            slot: {
                name: 'index-3',
                text: 'Данные руководителя'
            }
        },
    }

    get currentSlot() {
        return this.currentFounder.slot.name
    }

    get currentFounder() {
        return this.founderType.value === 2
            ? this.gridForms.legal
            : this.gridForms.individual
    }

    public getField() {
        return this.currentFounder.fields
    }
}
</script>
