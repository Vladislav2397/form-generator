<template lang="pug">
    form-item-component.b-input(
        v-bind="formItemProps"
        v-on="$listeners"
        tag="label"
        iconRight="calendar"
        v-click-outside="hideDatepicker"
        @click="showDatepicker"
    )
        template(
            v-slot:default="{ elementClass }"
        )
            cleave(
                v-model="valueModel"
                ref="input"
                v-bind="defaultOptions"
                :raw="false"
                :options="maskOptions.date"
                :class="elementClass"
                v-on:input="onInput"
            )
            transition(
                name="fade-down"
            )
                date-picker.__datepicker(
                    ref="datepicker"
                    v-if="datepickerActive"
                    :value="valueModel"
                    :format="'DD.MM.YYYY'"
                    :class="datepickerClasses"
                    valueType="format"
                    inline
                    @input="onChangeDate"
                    @click.native.prevent.stop
                )

</template>

<script lang="ts">
import {Component, Mixins, Prop } from 'vue-property-decorator'

import input from '@/mixins/components/ui/input.vue'
import datepicker from '@/mixins/components/ui/datepicker.vue'
import {InputMask} from "@/types/components/ui/input";
import FormItem from "@/components/ui/FormItem.vue";

@Component({
    components: {
        'form-item-component': FormItem,
    }
})
export default class InputDatepicker extends Mixins(input, datepicker) {
    @Prop({default: 'date'}) readonly mask!: InputMask

    onChangeDate(e: string) {
        console.log('changeDate')
        this.valueModel = e
        this.hideDatepicker()
    }
}

</script>
