<template lang="pug">
    form-item-component.b-input(
        v-bind="formItemProps"
        v-on="$listeners"
        :iconRight="icon"
        tag="label"
        @clickIcon="toggleShowPassword"
    )
        template(
            v-slot:default="{ elementClass }"
        )
            input(
                ref="input"
                v-model="valueModel"
                v-bind="defaultOptions"
                :type="inputType"
                :name="name"
                :class="elementClass"
                autocomplete="new-password"
                v-on:input="onInput"
            )
        template(
            v-slot:append="{ elementClass }"
        )
            div(
                :class="elementClass"
            )
                slot(
                    name="append"
                )
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import { IconName } from '../../js/types/components/ui/icon';
import {InputType} from "../../js/types/components/ui/input";
import input from '../../js/mixins/components/ui/input.vue'


@Component
export default class InputPassword extends Mixins(input) {
    @Prop({default: 'Введите пароль'}) readonly placeholder!: string
    @Prop({default: 'password'}) readonly name!: string

    showPassword = false;

    toggleShowPassword(): void {
        this.showPassword = !this.showPassword
    }

    get icon(): IconName {
        return this.showPassword ? 'eye-close' : 'eye'
    }

    get inputType(): InputType {
        return this.showPassword ? 'text' : 'password'
    }

}

</script>
