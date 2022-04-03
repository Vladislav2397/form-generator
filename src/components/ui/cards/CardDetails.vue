<template lang="pug">
    card-component.b-card-details(
        @click="$emit('click')"
    )
        title-component.__title(
            size="xxs"
        ) {{ title }}
        button-component.__icon(
            v-if="icon"
            :icon="icon"
            view="flat"
            size="s"
            aria-label="Кнопка"
        )
        .__list(
            v-if="list && list.length"
        )
            .__item(
                v-for="detail in list"
            )
                span(
                    v-if="detail.label"
                ) {{ detail.label }}
                p(
                    v-if="detail.text"
                ) {{ detail.text }}
                hint-component(
                    v-if="detail.hint"
                    @click.stop="onClickHint(detail)"
                )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IconName} from "../../../js/types/components/ui/icon";
import Hint from "../Hint.vue"

type Detail = {
    label: string
    text: string
    hint?: string
}

export interface ICardDetailsProps {
    title: string
    icon?: IconName
    list: Detail[]
}

@Component({
    components: {
        'hint-component': Hint
    }
})
export default class CardDetails extends Vue {
    @Prop() readonly title!: ICardDetailsProps['title']
    @Prop() readonly icon!: ICardDetailsProps['icon']
    @Prop() readonly list!: ICardDetailsProps['list']

    onClickHint(detail: Detail){
        console.log(detail)
    }
}

</script>
