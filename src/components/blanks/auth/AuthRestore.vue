<template lang="pug">
    .b-auth-restore
        title-component.__title(
            tag="h2"
            size="l"
        ) Восстановление пароля
        form.__form(
            ref="restore-form"
            method="POST"
            action="/password/reset"
        )
            input(
                type="hidden"
                name="_token"
                :value="token"
            )
            input-password-component.__line(
                v-model="form.password.value"
                :error.sync="form.password.error"
                :errorText="form.password.errorText"
                :label="form.password.optionals.label"
                size="l"
            )
            input-password-component.__line(
                v-model="form.replyPassword.value"
                :error.sync="form.replyPassword.error"
                :errorText="form.replyPassword.errorText"
                :label="form.replyPassword.label"
                size="l"
                name="password_confirmation"
            )
        button-component.__button(
            aria-label="Сохранить пароль"
            size="l"
            @click="submit"
        ) Сохранить пароль

</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import {onKeydown} from "../../../js/utils/default/keydown"
import {FormPasswordField} from "../../../js/utils/formField/formGenerator"

@Component
export default class AuthRestore extends Vue {
    @Prop() readonly token!: string

    @Ref('restore-form') restoreForm!: HTMLFormElement

    form = {
        password: FormPasswordField(),
        replyPassword: {
            value: '',
            error: false,
            errorText: 'Пароли не совпадают. Повторите попытку',
            label: 'Повторите новый пароль',
        }
    }

    get isEqualPassword (): boolean {
        return this.form.password.value === this.form.replyPassword.value
    }

    isValidPassword() {
        return !this.form.password.error && !this.form.replyPassword.error
    }

    validatePassword() {
        this.form.password.validate()

        if (this.form.replyPassword.value !== this.form.password.value) {
            this.form.replyPassword.error = true
        }
    }

    submit (): void {
        this.validatePassword()

        if (this.isValidPassword()) {
            this.restoreForm.submit()
        }
    }

    onKeydownCallback(e: KeyboardEvent) {
        onKeydown(e, [
            {
                key: 'enter',
                callback: this.submit
            }
        ])
    }

    addEvents(){
        document.addEventListener('keydown', this.onKeydownCallback, {passive: true})
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeydownCallback)
    }

    mounted (): void {
        this.addEvents()
    }

    beforeDestroy() {
        this.removeEvents()
    }
}
</script>
