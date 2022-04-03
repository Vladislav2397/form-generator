<template lang="pug">
    .b-response
        .__slot(
            v-if="$slots.default"
        )
            slot
        transition(
            name="fade"
            mode="out-in"
        )
            title-component.__title(
                :key="title"
                :size="titleSize"
            ) {{ title }}
        .__description(
            v-if="description"
        ) {{ description }}
        .__buttons(
            v-if="buttons && buttons.length"
        )
            button-component.__button(
                v-for="(button, index) in buttons"
                :key="index"
                :aria-label="button.text"
                :size="size"
                :view="button.view"
                :class="{'response__button--line': buttons.length > 1}"
                @click="button.callback"
            ) {{ button.text }}

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {ButtonItem} from "../../js/types/utils/other";
import {ResponseSize} from "../../js/types/components/blanks/response";
import {TitleSize} from "../../js/types/components/ui/title";

export interface IResponseProps {
    title: string
    description?: string
    buttons?: ButtonItem[]
    size?: ResponseSize
}

@Component
export default class Response extends Vue {
    @Prop({required: true}) readonly title!: IResponseProps['title']
    @Prop({default: 'm'}) readonly size!: IResponseProps['size']
    @Prop() readonly description!: IResponseProps['description']
    @Prop() readonly buttons!: IResponseProps['buttons']



    get titleSize(){
        const mapSizes = {
            m: 'xs',
            l: 's'
        } as Record<ResponseSize, TitleSize>

        return mapSizes[this.size!] || 'xs'
    }

}

</script>
