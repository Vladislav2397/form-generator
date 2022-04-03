<template lang="pug">
    .b-information-modal
        .__text
            .__wrapper.--title(
                v-if="title && title.text"
            )
                title-component.__title(
                    :view="title.view"
                    size="xs"
                ) {{ title.text }}
                transition(
                    name="fade"
                    mode="out-in"
                )
                    icon-image-component.__icon.--check(
                        v-if="title.view === 'success'"
                        name="Иконка check"
                        :src="getIconSvg('check', { view: 'other'})"
                    )
            .__wrapper.--description(
                v-if="description && description.text"
            )
                .__description {{ description.text }}
                hint-component.__hint(
                    v-if="description.tooltip"
                    @click="onClickHint"
                )
        .__button(
            v-if="button"
        )
            button-component(
                :view="button.view"
                :aria-label="button.text"
                :key="button.text"
                :disabled="button.disabled"
                :loading="button.loading"
                size="l"
                @click="button.callback"
            ) {{ button.text }}
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import { getIconSvg } from '../../js/utils/service/getResources';
import {ITitleProps} from "../ui/Title.vue";
import {ButtonItem} from "../../js/types/utils/other";

import Hint from '../ui/Hint.vue'

export interface IInformationModalProps {
    title?: {
        text: string,
        view?: ITitleProps['view']
    }
    description?: {
        text: string
        tooltip?: {
            title?: string
            text: string
        }
    }
    button?: ButtonItem
}

@Component({
    components: {
        'hint-component': Hint
    }
})
export default class InformationModal extends Vue {
    @Prop() readonly title!: IInformationModalProps['title']
    @Prop() readonly description!: IInformationModalProps['description']
    @Prop() readonly button!: IInformationModalProps['button']

    onClickHint(){
        console.log('onClickHint')
    }

    getIconSvg = getIconSvg
}

</script>
