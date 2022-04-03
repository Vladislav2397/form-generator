<template lang="pug">
    card-component.b-card-checkbox(
        view="base"
        size="m"
        :disabled="isDisabled"
        @click="onCardClick"
    )
        .__text
            slot {{ label }}
        checkbox-component.__value(
            :value="valueModel"
            :disabled="isDisabled"
        )

</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from 'vue-property-decorator'
import {
    DisabledPropsType,
    SizePropsType
} from '../../../js/types/utils/helpers'

@Component
export default class CardCheckbox extends Vue {
    @VModel() valueModel!: boolean

    @Prop({ default: 'm' }) size!: Extract<SizePropsType, 's' | 'm'>
    @Prop() disabled!: DisabledPropsType
    @Prop() label!: string

    get isDisabled() {
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    onCardClick() {
        this.valueModel = !this.valueModel
    }
}
</script>
