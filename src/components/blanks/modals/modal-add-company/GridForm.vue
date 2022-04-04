<template lang="pug">

.b-founder-form
    grid-layout-component(
        :layout="layout"
        :spacing="spacing"
    )
        template(
            v-for="(field, name, index) in fieldMap"
        )
            component(
                :key="`${name}${index}`"
                :is="`${field.component}-component`"
                v-model="valuesSync[name]"
                :error.sync="errorsSync[name]"
                :errors.sync="errorsSync[name]"
                v-bind="field.binding"
            )
        template(
            v-for="(func, slotName) in $scopedSlots"
            v-slot:[slotName]="{ elementClass }"
        )
            slot(
                :name="slotName"
                :elementClass="elementClass"
            )
        slot(
            name="append"
        )
    slot

</template>

<script lang="ts">
/* eslint-disable */
import {Vue, Component, Prop, PropSync} from 'vue-property-decorator'

import GridLayout from '@/components/layouts/GridLayout.vue'
import Input from "@/components/ui/Input.vue"
import Select from "@/components/ui/Select.vue"
import InputMultiDatepicker from "@/components/ui/InputMultiDatepicker.vue"
import InputDatepicker from "@/components/ui/InputDatepicker.vue"

@Component({
    components: {
        'input-component': Input,
        'select-component': Select,
        'input-datepicker-component': InputDatepicker,
        'input-multi-datepicker-component': InputMultiDatepicker,
        'grid-layout-component': GridLayout
    },
})
export default class GridForm extends Vue {
    @Prop() readonly fieldMap!: Record<string, {
        component: string,
        validRegex?: RegExp
        binding: Record<string, any>
    }>
    @Prop() readonly layout!: any
    @Prop() readonly spacing!: GridLayout['spacing']
    @Prop({ default: () => ({}) }) readonly conditionalFields!: Record<
        keyof GridForm['fieldMap'], boolean
    >

    @PropSync('values') valuesSync!: Record<string, unknown>
    @PropSync('errors') errorsSync!: Record<string, unknown>
}
</script>
