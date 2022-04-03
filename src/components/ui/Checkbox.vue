<template lang="pug">
    label.b-checkbox(
        :class="classes"
    )
        input.__value(
            v-model="valueModel"
            :name="name"
            :disabled="isDisabled || !this.$listeners.input"
            type="checkbox"
        )
        .__content
            icon-base-component.__icon(
                :name="iconName"
            )
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator'
import { CheckboxSize } from "../../js/types/components/ui/checkbox"

export interface ICheckboxProps {
    value: boolean
    name?: string
    intermediate?: boolean | string
    size?: CheckboxSize
    disabled?: boolean |  string
}

@Component
export default class Checkbox extends Vue {
    @Prop() readonly value!: ICheckboxProps['value']
    @Prop() readonly name!: ICheckboxProps['name']
    @Prop() readonly intermediate!: ICheckboxProps['intermediate']
    @Prop({ default: 'm' }) readonly size!: ICheckboxProps['size']
    @Prop() readonly disabled!: ICheckboxProps['disabled']
    @VModel() valueModel!: ICheckboxProps['value']


    get isDisabled() {
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    get isIntermediate() {
        return typeof this.intermediate !== 'undefined' && this.intermediate !== false
    }

    get classes() {
        const classes: string[] = [`checkbox--size-${this.size}`]

        if(this.isIntermediate){
            classes.push('is-intermediate')
        }

        if(this.isDisabled){
            classes.push('is-disabled')
        }

        return classes
    }

    get iconName(){
        return this.isIntermediate ? 'minus' : 'check'
    }
}

</script>
