<template lang="pug">

.b-founder-list
    grid-form-component(
        :fieldMap="allFields"
        :conditionalFields="conditionalFields"
        :layout="layout"
        :slotName="slotName"

        @input="changeValue"
    )
        template(
            #[slotName]="{ elementClass }"
        )
            div(
                :class="elementClass"
            )
                slot(
                    :name="slotName"
                    :elementClass="elementClass"
                )
        slot

</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'vue-property-decorator'

import GridForm from './GridForm.vue'

import {
    fieldByName,
    FieldNames,
} from '../../../../js/utils/field/genInputData'

@Component({
    components: {
        'grid-form-component': GridForm
    },
})
export default class FounderForm extends Vue {
    @VModel() valueModel!: Record<FieldNames, unknown>

    @Prop() readonly layout!: any
    @Prop() readonly slotName!: string

    get allFields() {
        const fields = {}

        Object.entries(this.valueModel).forEach(([name, value]) => {
            fields[name] = fieldByName(name as FieldNames, { value })
        })

        return fields as Record<FieldNames, { value: never }>
    }

    get conditionalFields() {
        return {
            'addressFact': Boolean(this.allFields?.isAddressEquals.value)
        }
    }

    changeValue([
        fieldName,
        value
    ]: [
        fieldName: FieldNames,
        value: never
    ]) {
        this.valueModel = {
            ...this.valueModel,
            [fieldName]: value
        }
    }
}
</script>
