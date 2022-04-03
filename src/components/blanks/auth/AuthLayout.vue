<template lang="pug">
    .b-auth-layout
        .__wrapper.container
            .__content
                logo-component.__logo
                .__description Сервис автоматизированной подачи и&nbsp;обработки заявок на&nbsp;выдачу финансовых продуктов для&nbsp;участников гос.&nbsp;заказа и&nbsp;бизнеса
            .__form
                .__form-wrapper
                    slot
            .__footer
                link-component.__link(
                    tag="a"
                    href="/privacy"
                    view="secondary"
                    size="s"
                ) Политика ОПД
                link-component.__link(
                    tag="a"
                    href="/term"
                    view="secondary"
                    size="s"
                ) Пользовательское соглашение

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AuthLayout extends Vue {}
</script>
