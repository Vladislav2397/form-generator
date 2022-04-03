<template lang="pug">
    .b-radio(
        :class="classes"
    )
        .__text.--label(
            v-if="label"
        ) {{ label }}
        .__options
            card-radio-component.__option(
                v-for="(option, index) in options"
                :value="option.id"
                :key="index"
                :name="name"
                :checked="+(value) === option.id"
                :disabled="option.disabled"
                :interactive="direction === 'column'"
                @input="onInput"
            ) {{ option.text }}

        .__text.--description(
            v-if="description"
        ) {{ description }}

</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from 'vue-property-decorator'

import CardRadio from "./cards/CardRadio.vue";
import {RadioDirection, RadioOption} from "../../js/types/components/ui/radio";


export interface IRadioProps {
    label?: string
    description?: string
    value: number
    options: RadioOption[]
    name: string
    direction: RadioDirection
}

@Component({
    components: {
        'card-radio-component': CardRadio
    }
})
export default class Radio extends Vue {
    @Prop() readonly label!: IRadioProps['label']
    @Prop() readonly description!: IRadioProps['description']
    @Prop({required: true}) readonly value!: IRadioProps['value']
    @Prop({required: true}) readonly options!: IRadioProps['options']
    @Prop({required: true}) readonly name!: IRadioProps['name']
    @Prop({default: 'column'}) readonly direction!: IRadioProps['direction']

    onInput(value) {
        this.valueModel = value
    }

    @VModel() valueModel!: IRadioProps['value']


    get classes() {
        return [`radio--direction-${this.direction}`]
    }
}

</script>
