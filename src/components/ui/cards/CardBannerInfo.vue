<template lang="pug">
    card-component.b-card-banner-info(
        v-bind="attrs"
        :interactive="false"
        :class="`card-banner-info--direction-${direction}`"
    )
        .__content
            .__decoration(
                v-if="isShowDecoration"
            )
                transition(
                    name="fade"
                    mode="out-in"
                )
                    spinner-component.__loader(
                        v-if="loading && isShowIconComponent"
                        size="l"
                    )
                    icon-status-component.__icon(
                        v-else-if="status"
                        :view="status"
                        :size="iconStatusSize"
                    )
                    icon-component.__icon(
                        v-else-if="icon"
                        :src="icon"
                        size="l"
                        name="Иконка"
                    )
            transition(
                name="fade"
            )
                spinner-component.__loader.--position-absolute(
                    v-if="loading && !isShowIconComponent"
                    :class="loaderPositionClass"
                    size="l"
                )
            .__text(
                v-if="isShowText"
            )
                title-component.__title(
                    v-if="title"
                    size="xxs"
                ) {{ title }}
                .__description(
                    v-if="description"
                ) {{ description }}
            .__buttons(
                v-if="isShowButtons"
            )
                button-component.__button(
                    v-for="(button, index) in buttons"
                    size="l"
                    :view="button.view || 'secondary-brand'"
                    :key="index"
                    :icon="button.icon"
                    :aria-label="`Кнопка ${button.text ? button.text : ''}`"
                    @click="button.callback"
                ) {{ button.text }}

</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import card, {ICardProps} from '../../../js/mixins/components/ui/card.vue'
import {CardBannerInfoDirection} from "../../../js/types/components/blanks/cards/card-banner-info";
import {ButtonItem} from "../../../js/types/utils/other";
import {IIconStatusProps} from "../icons/IconStatus.vue";
import {IIconProps} from "../icons/Icon.vue";


export interface ICardBannerInfoProps extends ICardProps {
    title?: string
    description?: string
    direction?: CardBannerInfoDirection
    loading?: boolean
    buttons?: ButtonItem[]
    status?: IIconStatusProps['view']
    icon?: IIconProps['src']
}

@Component
export default class CardBannerInfo extends Mixins(card) {
    @Prop() readonly title!: ICardBannerInfoProps['title']
    @Prop() readonly description!: ICardBannerInfoProps['description']
    @Prop() readonly status!: ICardBannerInfoProps['status']
    @Prop() readonly icon!: ICardBannerInfoProps['icon']
    @Prop() readonly buttons!: ICardBannerInfoProps['buttons']
    @Prop() readonly loading!: ICardBannerInfoProps['loading']
    @Prop({ default: 'column' }) readonly direction!: ICardBannerInfoProps['direction']

    get isShowIconComponent(){
        return this.status || this.icon
    }

    get isShowDecoration(){
        return this.isShowIconComponent || this.loading && this.isShowIconComponent
    }

    get isShowText(){
        return this.title || this.description
    }

    get isShowButtons(){
        return this.buttons && this.buttons.length
    }

    get iconStatusSize(){
        return this.direction === 'column' ? 'm' : 's'
    }

    get loaderPositionClass(){
        return `card-banner-info__loader--position-${ this.isShowIconComponent ? 'static' : 'absolute' }`
    }
}

</script>
