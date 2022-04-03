<template lang="pug">

    .b-auth-registration-header
        title-component.__title(
            size="l"
            tag="h2"
        ) Регистрация
        progress-bar-component.__bar(
            :value="progressBarOptions.value"
            :steps-names="progressBarOptions.stepsNames"
        )
        link-component.__button(
            tag="button"
            aria-label="Вернуться ко входу"
            icon="left"
            underline="none"
            view="secondary"
            size="s"
            @click="$emit('back')"
        ) Вернуться назад
</template>

<script lang="ts">
import { Component,  Prop, Vue } from 'vue-property-decorator'
import ProgressBar, {ProgressBarProps} from "../../ui/ProgressBar.vue";

export type AuthRegistrationHeaderProps = {
    ProgressBarOptions: Pick<ProgressBarProps, 'value' | 'stepsNames'>
}


@Component({
    components: {
        'progress-bar-component': ProgressBar
    }
})
export default class AuthRegistrationHeader extends Vue {
    @Prop() readonly progressBarOptions!: AuthRegistrationHeaderProps['ProgressBarOptions']
}
</script>


