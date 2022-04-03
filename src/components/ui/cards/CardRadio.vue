<template lang="pug">
    card-component.b-card-radio(
        :interactive="interactive"
        :disabled="disabled"
        tag="label"
        size="m"
    )
        input.__value(
            type="radio"
            :name="name"
            :value="value"
            :disabled="disabled"
            @input="$emit('input', parseInt($event.target.value,  10))"
        )
        .__text
            slot
        radio-toggle-component.__toggle(
            :checked="checked"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import RadioToggle from "../RadioToggle.vue";

export type CardRadioProps = {
    value: number | string
    name: string
    checked: boolean
    disabled: boolean
    interactive: boolean
}

@Component({
    components: {
        'radio-toggle-component': RadioToggle
    }
})
export default class CardRadio extends Vue {
    @Prop({required: true}) readonly value!: CardRadioProps['value']
    @Prop({required: true}) readonly name!: CardRadioProps['name']
    @Prop({default: false}) readonly checked!: CardRadioProps['checked']
    @Prop() readonly disabled!: CardRadioProps['disabled']
    @Prop() readonly interactive!: CardRadioProps['interactive']
}

</script>
