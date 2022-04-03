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
                v-if="isShowField(name)"
                :key="`${name}${index}`"
                :is="`${field.component}-component`"
                v-model="valuesSync[name]"
                v-bind="fieldBinding(name, field)"
                @update:error="updateErrorEmit(name, $event)"
                @update:errors="updateErrorEmit(name, $event)"
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
import {Vue, Component, Prop, Emit, PropSync} from 'vue-property-decorator'

import GridLayout from '@/components/layouts/GridLayout.vue'
import Input from "@/components/ui/Input.vue";
import Select from "@/components/ui/Select.vue";
import InputMultiDatepicker from "@/components/ui/InputMultiDatepicker.vue";
import InputDatepicker from "@/components/ui/InputDatepicker.vue";

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
    @Prop() readonly fieldMap!: Record<string, any>
    @Prop() readonly layout!: any
    @Prop() readonly spacing!: GridLayout['spacing']
    @Prop({ default: () => ({}) }) readonly conditionalFields!: Record<keyof GridForm['fieldMap'], boolean>

    @PropSync('values') valuesSync!: any
    @PropSync('errors') errorsSync!: any

    @Emit('input')
    inputEmit(fieldName: string, value: any) {
        return {fieldName, value}
    }

    @Emit('update:errors')
    // @ts-ignore
    updateErrorEmit(fieldName, value) {
        console.log('update error emit', fieldName, value)

        return {
            ...this.errorsSync,
            [fieldName]: value
        }
    }

    // @ts-ignore
    isMultiDatepicker(field) {
        return field.component === 'input-multi-datepicker'
    }

    // @ts-ignore
    fieldBinding(name, field) {
        return {
            ...field.binding,
            ...this.isMultiDatepicker(field) ? {
                errors: this.errorsSync[name],
            } : {
                error: this.errorsSync[name],
            }
        }
    }

    // @ts-ignore
    isShowField(field) {
        return typeof this.conditionalFields[field] !== 'undefined'
            ? this.conditionalFields[field]
            : true
    }
}
</script>
