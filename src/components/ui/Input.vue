<template lang="pug">
    form-item-component.b-input(
        v-bind="formItemExtendedProps"
        v-on="formItemExtendedListeners"
        tag="label"
    )
        template(
            v-slot:default="{ elementClass }"
        )
            cleave(
                v-if="activeMask"
                ref="input"
                v-bind="defaultOptions"
                :key="updateKey"
                :value="valueModel"
                :options="activeMask"
                :raw="false"
                :class="getElementClasses(elementClass)"
                @input="onInputCleave"
                @blur="onBlurMask"
                @focus.native="$emit('focus')"
            )
            input(
                v-else
                ref="input"
                v-bind="defaultOptions"
                v-model.trim="valueModel"
                :class="getElementClasses(elementClass)"
                v-on:input="onInput"
                v-on:blur="$emit('blur')"
                v-on:focus="$emit('focus')"
            )


</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import input from '@/mixins/components/ui/input.vue'
import FormItem from "@/components/ui/FormItem.vue"

@Component({
    components: {
        'form-item-component': FormItem,
    }
})
export default class Input extends Mixins(input) {}

</script>
