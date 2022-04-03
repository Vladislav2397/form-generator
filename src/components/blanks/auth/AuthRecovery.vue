<template lang="pug">
    .b-auth-recovery
        transition(
            name="fade"
            mode="out-in"
        )
            .__container(
                v-if="!isResponse"
                key="1"
            )
                title-component.__title(
                    tag="h2"
                    size="l"
                ) Восстановление пароля
                link-component.__breadcrumb(
                    tag="button"
                    aria-label="Вернуться ко входу"
                    icon="left"
                    underline="none"
                    view="secondary"
                    size="s"
                    @click="back"
                ) Вернуться ко входу
                p.__description Введите электронный адрес и мы отправим вам письмо для восстановления доступа к аккаунту
                //form(
                //    :action="formAction"
                //    method="POST"
                //)
                input-component.__input(
                    v-model="form.email.value"
                    :error.sync="form.email.error"
                    :errorText="form.email.errorText"
                    :placeholder="form.email.optionals.placeholder"
                    size="l"
                )
                button-component.__button(
                    aria-label="Восстановить пароль"
                    size="l"
                    @click="submit"
                ) Восстановить пароль
            .__container(
                v-else
                key="2"
            )
                title-component.__title(
                    tag="h2"
                    size="l"
                ) Ваша заявка принята!
                p.__description Запрос на изменение пароля отправлен вам на почту. Письмо обычно приходит в течении 5 минут.
                button-component.__button(
                    aria-label="Вернуться ко входу"
                    size="l"
                    @click="back"
                ) Вернуться ко входу

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import api from "../../../js/api"

import { onKeydown } from "../../../js/utils/default/keydown"
import { FormEmailField } from "../../../js/utils/formField/formGenerator"
import {errorToaster} from "../../../js/vue-utils/toast";
import {AppError} from "../../../js/utils/errorHandler/error";


@Component
export default class AuthRecovery extends Vue {
    formAction = '/'

    isResponse = false

    form = {
        email: FormEmailField()
    }

    back(){
        this.$emit('back')
    }

    async submit (): Promise<void> {
        this.form.email.validate()

        if ( !this.form.email.error) {
            try {
                const response = await api.checkEmail(this.form.email.value)

                this.form.email.error = !response.exists
                this.isResponse = response.exists
            } catch (e) {
                errorToaster(e as AppError)
            }
        }

        // window.location.replace('/password/reset/47f7bb2cf18fc651b30536fd3f203e792e415bc1f5c9fbce7c7bdbaf0abb18c1')
    }

    onKeydownCallback(e: KeyboardEvent) {
        onKeydown(e, [
            {
                key: 'enter',
                callback: this.submit
            },
            {
                key: 'esc',
                callback: this.back
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
