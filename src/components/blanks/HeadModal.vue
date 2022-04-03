<template lang="pug">
    .b-head-modal
        progress-bar-component.__progress(
            v-if="progressBar"
            v-bind="progressBar"
        )
        p {{ progressBar.value }}
        transition(
            name="fade"
            mode="out-in"
        )
            link-component.__button(
                v-if="button"
                :aria-label="button.text"
                :key="button.text"
                tag="button"
                icon="left"
                underline="none"
                view="secondary"
                size="s"
                @click="$emit('back')"
            ) {{ button.text }}
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import ProgressBar, {IProgressBarProps} from "../ui/ProgressBar.vue"

export interface IHeadModalProps {
    progressBar: IProgressBarProps
    button: {
        text: string
    }
}

@Component({
    components: {
        'progress-bar-component': ProgressBar
    }
})
export default class HeadModal extends Vue {
    @Prop() readonly progressBar!: IHeadModalProps['progressBar']
    @Prop() readonly button!: IHeadModalProps['button']

}

</script>
