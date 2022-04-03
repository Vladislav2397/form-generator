<template lang="pug">
    .b-input-multi
        .__text.--label(
            v-if="label"
        ) {{ label }}
        .__content
            input-component.__value.--left(
                v-bind="defaultOptions(0)"
                @input="onInput($event, 0)"
            )
            input-component.__value.--right(
                v-bind="defaultOptions(1)"
                @input="onInput($event,1)"
            )
        .__text.--description(
            v-if="description"
        ) {{ description }}

</template>

<script lang="ts">
import {Component, Mixins } from 'vue-property-decorator'
import inputMulti from '../../js/mixins/components/ui/input-multi.vue'

@Component
export default class InputMulti extends Mixins(inputMulti) {

}

</script>
