<template lang="pug">
    card-component.b-card-info(
        v-bind="attrs"
        :interactive="!disabled && !loading"
        @click="$emit('click', $event)"
    )
        .__content
            transition(
                name="fade"
                mode="out-in"
            )
                spinner-component.__loader(
                    v-if="loading"
                    size="s"
                )
                icon-base-component.__icon.--arrow(
                    v-else
                    name="chevron-right"
                )
            .__top
                .__section.--left
                    .__title-wrapper
                        .__title {{ title }}
                        badge-component.__status(
                            v-if="isShowStatus"
                            :view="status.view"
                            :showIndicator="false"
                        ) {{ status.text }}
                .__section.--right
                    .__text.--label.--secondary(
                        v-if="label"
                    ) {{ label }}
            .__bottom(
                v-if="isShowBottom"
            )
                .__text.--bottom.--promo.--success(
                    v-if="promo"
                    :class="`card-info__text--${promoView}`"
                )
                    icon-base-component.__icon.--bottom.--promo(
                        v-if="iconPromo"
                        :name="iconPromo"
                    )
                    | {{ promo }}
                .__text.--bottom.--description.--secondary(
                    v-if="description"
                )
                    icon-base-component.__icon.--bottom.--description(
                        v-if="iconDescription"
                        :name="iconDescription"
                    )
                    | {{ description }}



</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import card from '../../../js/mixins/components/ui/card.vue'
import {BadgeView} from "../../../js/types/components/ui/badge";
import {IconName} from "../../../js/types/components/ui/icon";
import {ViewPropsType} from "../../../js/types/utils/helpers";


export interface ICardInfoProps {
    title?:  number | string
    label?:  number | string
    promo?:  number | string
    promoView?:  Extract<ViewPropsType, 'success' | 'system' | 'warning'>
    iconPromo?:  IconName
    description?:  number | string
    iconDescription?:  IconName
    status?: {
        view: BadgeView,
        text: string | number
    }
    loading?: boolean
    disabled?: boolean
}

@Component
export default class CardInfo extends Mixins(card) {
    @Prop({required: true}) readonly title!: ICardInfoProps['title']
    @Prop() readonly label!: ICardInfoProps['label']
    @Prop() readonly promo!: ICardInfoProps['promo']
    @Prop({ default: 'success' }) readonly promoView!: ICardInfoProps['promoView']
    @Prop() readonly iconPromo!: ICardInfoProps['iconPromo']
    @Prop() readonly description!: ICardInfoProps['description']
    @Prop() readonly iconDescription!: ICardInfoProps['iconDescription']
    @Prop() readonly status!: ICardInfoProps['status']
    @Prop() readonly loading!: ICardInfoProps['loading']

    get isShowStatus() {
        return this.status && this.status.text
    }

    get isShowBottom() {
        return this.description || this.promo
    }
}

</script>
