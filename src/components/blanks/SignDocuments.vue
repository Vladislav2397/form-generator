<template lang="pug">
    .b-sign-documents
        .__label(
            v-if="label"
        ) {{ label }}
        card-text-component.__card.--information(
            v-if="information"
            v-bind="information"
        )
        card-banner-info-component.__card.--link(
            v-if="!isHideLink"
            v-bind="cardLinkProps"

        )
        .__actions(
            v-if="$device.type.desktop"
        )
            select-component.__select(
                v-model="sign.active"
                :placeholder="sign.placeholder"
                :options="sign.list"
                :disabled="isDisabled"
                size="l"
            )
            button-component.__button(
                :disabled="isDisabled"
                size="l"
                aria-label="Подписать документы"
                @click="signDocuments"
            ) Подписать документы
        .__documents
            card-attachment-component.__document(
                v-for="(document,index) in documents"
                :key="index"
                :name="document.title"
                :value="document.value"
                :context="document.context"
                :actions="['download']"
            )
</template>

<script lang="ts">
import {Component, Inject, Prop, Mixins} from 'vue-property-decorator'
import CardAttachment from "../ui/cards/CardAttachment.vue";
import {SelectProps} from "../ui/Select.vue";
import {Document} from "../../js/types/utils/form";
import {DeviceProviderValue} from "../../js/providers/device";
import CardBannerInfo, {ICardBannerInfoProps} from "../ui/cards/CardBannerInfo.vue";
import {getIconSvg} from "../../js/utils/service/getResources";
import copyToBuffer from "../../js/mixins/utils/copyToBuffer";
import CardText, {ICardTextProps} from "../ui/cards/CardText.vue";



export interface ISignDocumentsProps {
    documents: Document[]
    link: string
    hideLink?: boolean | string
    label?: string
    information?: ICardTextProps
}

@Component({
    components: {
        'card-banner-info-component': CardBannerInfo,
        'card-attachment-component' : CardAttachment,
        'card-text-component' : CardText,
    }

})
export default class SignDocuments extends Mixins(copyToBuffer) {
    @Prop({ required: true }) readonly documents!: ISignDocumentsProps['documents']
    @Prop({ required: true }) readonly link!: ISignDocumentsProps['link']
    @Prop() readonly hideLink!: ISignDocumentsProps['hideLink']
    @Prop() readonly label!: ISignDocumentsProps['label']
    @Prop() readonly information!: ISignDocumentsProps['information']

    @Inject('$device') $device!: DeviceProviderValue

    sign = {
        active: null,
        list: [] as SelectProps['options'],
        placeholder: 'Выберите электронную подпись'
    }

    get cardLinkProps(): ICardBannerInfoProps  {
        return {
            title: 'Скопируйте внешнюю ссылку с документами на подписание',
            icon: getIconSvg('copy', {
                view: 'secondary'
            }),
            buttons: [
                {
                    text: 'Скопировать ссылку',
                    callback: () => this.copyLinkToSignDocuments(),
                }
            ],
            direction: this.$device.size.mobile ? 'column' : 'row'
        }
    }

    copyLinkToSignDocuments(){
        this.copyToBuffer(this.link)
    }

    signDocuments(){
        console.log(1)
    }

    get isHideLink(){
        return typeof this.hideLink !== 'undefined' && this.hideLink !== false
    }


    get isDisabled(){
        return !this.sign.list.length
    }
}

</script>
