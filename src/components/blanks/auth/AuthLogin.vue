<template lang="pug">
    .b-auth-login
        title-component.__title(
            size="l"
            tag="h2"
        ) Вход в личный кабинет
        .__register
            span(
                v-if="$device.size.tabletLate || $device.size.desktop"
            ) У вас нет аккаунта?
            button-component.__button.--register(
                aria-label="Зарегистрироваться"
                tag="button"
                size="s"
                view="secondary-brand"
                v-on:click="$emit('openRegistration')"
            ) Зарегистрироваться
        form.__form(
            ref="form"
            method="POST"
            :action="formAction"
        )
            input(type="hidden" name="_token" :value="$csrfToken")
            input-component.__input(
                v-model="form.email.value"
                :error.sync="initErrorFlag || form.email.error"
                :errorText="initErrorText || form.email.errorText"
                :placeholder="form.email.optionals.placeholder"
                name="email"
                :label="form.email.optionals.label"
                size="l"
                @input="onInput"
            )
            input-password-component.__input(
                v-model="form.password.value"
                :error.sync="initErrorFlag || form.password.error"
                :errorText="initErrorText || form.password.errorText"
                :placeholder="form.password.placeholder"
                :label="form.password.optionals.label"
                name="password"
                size="l"
                @input="onInput"
            )
                template(
                    v-slot:append
                )
                    link-component(
                        tag="button"
                        size="s"
                        view="interactive"
                        underline="none"
                        v-on:click="$emit('openRecovery')"
                    ) Забыли пароль?
            button-component.__button.--enter(
                aria-label="Войти"
                size="l"
                @click="submit"
            ) Войти
            .__divider-wrapper
                divider-component.__divider.--left
                p Или
                divider-component.__divider.--right
            .__media
                button-component.__link(
                    v-for="social in socials"
                    :key="social.label"
                    :href="authLink(social.href)"
                    :disabled="!social.href"
                    :media="true"
                    :tag="social.href ? 'a' : 'button'"
                    :aria-label="`Регистраиця через ${social.label}`"
                    size="l"
                    view="outline"
                )
                    img.lazyload(
                        :data-src="social.imagePath"
                    )
                    span {{ social.label }}

</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Inject } from 'vue-property-decorator'
import { getIconSvg } from '../../../js/utils/service/getResources'
import { DeviceProviderValue } from '../../../js/providers/device'
import { CsrfTokenProviderValue } from '../../../js/providers/csrfToken'

import { urls } from '../../../js/api/auth'
import { onKeydown } from '../../../js/utils/default/keydown'

import { FormEmailField, FormPasswordField } from "../../../js/utils/formField/formGenerator"
import api from "../../../js/api"

@Component
export default class AuthLogin extends Vue {
    @Inject('$device') $device!: DeviceProviderValue
    @Inject('$csrfToken') $csrfToken!: CsrfTokenProviderValue

    @Prop() readonly error!: boolean
    @Prop() readonly errorText!: string

    @Ref('form') formRef!: HTMLFormElement

    formAction = urls.login
    initErrorFlag = false
    initErrorText = ''

    form = {
        email: FormEmailField(),
        password: FormPasswordField(),
    }

    socials = [
        {
            imagePath: getIconSvg('mail'),
            label: 'Mail.ru',
            href: 'mailru',
        },
        {
            imagePath: getIconSvg('gmail'),
            label: 'Gmail',
            href: 'google',
        },
        {
            imagePath: getIconSvg('yandex'),
            label: 'Yandex',
            href: 'yandex',
        },
        {
            imagePath: getIconSvg('ecp'),
            label: 'ЭЦП',
            href: '',
        },
    ]

    authLink(href: string): string | undefined {
        return href ? `https://${window.location.hostname}/social_login/${href}` : undefined
    }

    onInput(): void {
        if (this.initErrorFlag) {
            this.initErrorFlag = false
            this.initErrorText = ''
        }
    }

    formValidate() {
        Object.entries(this.form).forEach(([,formField]) => formField.validate())
    }

    isValidForm() {
        return Object.entries(this.form).every(([,formField]) => !formField.error)
    }

    async submit(): Promise<void> {
        this.formValidate()

        if (this.isValidForm()) {
            this.isEmailExists().then(isExists => {
                if (isExists) {
                    this.formRef.submit()
                } else {
                    this.form.email.error = true
                }
            })
        }
    }

    setInitialError() {
        // TODO??: Refactor logic

        if (this.errorsFromMeta) {
            if (this.errorsFromMeta.email) {
                this.initErrorText = 'Пользователя с такой почтой не существует'
                this.form.email.error = true
            } else if (this.errorsFromMeta.password) {
                this.initErrorText = 'Неверный пароль. Повторите попытку или нажмите на ссылку «Забыли пароль», чтобы сбросить его'
                this.form.password.error = true
            } else {
                this.initErrorText = 'Неизвестная ошибка'
                this.initErrorFlag = true
            }
        }
    }

    onKeydown(e: KeyboardEvent) {
        onKeydown(e, [
            {
                key: 'enter',
                callback: this.submit,
            },
        ])
    }

    addEvents() {
        document.addEventListener('keydown', this.onKeydown, { passive: true })
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeydown)
    }

    async isEmailExists(): Promise<boolean> {
        const response = await api.checkEmail(this.form.email.value)
        return response?.exists ?? false
    }

    get errorsFromMeta(): Record<'email' | 'password', string> | null {
        const content = JSON.parse(
            document.querySelector<HTMLMetaElement>(
                'meta[name="errors"]'
            )?.content ?? '[]'
        )

        if (Object.keys(content).length) {
            return content
        }

        return null
    }

    mounted(): void {
        this.setInitialError()
        this.addEvents()
    }

    beforeDestroy() {
        this.removeEvents()
    }
}
</script>
