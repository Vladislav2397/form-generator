<template lang="pug">
    .b-bank-actions
        .__logo
            bank-logo-component(
                :id="bankId"
            )
        divider-component.__divider.--top
        response-component.__update(
            v-bind="responseComponentProps"
            size="l"
        )
            icon-status-component(
                v-bind="iconStatusComponentProps"
            )
        transition(
            name="fade"
            mode="out-in"
        )
            .__buttons.--update(
                v-if="updateActions && updateActions.length"
            )
                button-component.__button(
                    v-for="(action, index) in updateActions"
                    :aria-label="action.text"
                    :view="action.view"
                    :key="index"
                    size="l"
                    @click="action.callback"
                ) {{ action.text }}
        transition(
            name="fade"
            mode="out-in"
        )
            .__complete-requests(
                v-if="completeRequests && completeRequests.length"
            )
                card-banner-info-component.__complete-request(
                    v-for="(completeRequest,index) in completeRequests"
                    v-bind="completeRequest"
                    :key="index"
                    direction="row"
                )
        transition(
            name="fade"
            mode="out-in"
        )
            .__documents(
                v-if="documents && documents.length"
            )
                card-attachment-component.__document(
                    v-for="(document,index) in documents"
                    :value="document.value"
                    :name="document.title"
                    :actions="['download']"
                    :key="index"
                    @download="downloadDocument(document)"
                )
        transition(
            name="fade"
            mode="out-in"
        )
            .__buttons.--order(
                v-if="orderActions && orderActions.length"
            )
                button-component.__button(
                    v-for="(action,index) in orderActions"
                    :aria-label="action.text"
                    :view="action.view"
                    size="l"
                    :key="index"
                    @click="action.callback"
                ) {{ action.text }}
        transition(
            name="fade"
            mode="out-in"
        )
            .__requests(
                v-if="requests && requests.length"
            )
                card-info-component.__request(
                    v-for="(request,index) in requests"
                    v-bind="request"
                    :key="index"
                    promo-view="warning"
                )
        template(
            v-if="mainActions && mainActions.length"
        )
            divider-component.__divider.--bottom
            .__buttons.--main
                button-component.__button(
                    v-for="(action,index) in mainActions"
                    :aria-label="action.text"
                    :view="action.view"
                    :key="index"
                    size="l"
                    @click="action.callback"
                ) {{ action.text }}
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IResponseProps} from "./Response.vue";
import {IIconStatusProps} from "../ui/icons/IconStatus.vue";
import CardBannerInfo, {ICardBannerInfoProps} from "../ui/cards/CardBannerInfo.vue";
import {Document} from "../../js/types/utils/form";
import {ButtonItem} from "../../js/types/utils/other";
import { getBankLogo } from '../../js/utils/service/getResources';
import CardAttachment from "../ui/cards/CardAttachment.vue";
import {downloadFileByLink} from "../../js/utils/default/downloadFileByLink";
import CardInfo, {ICardInfoProps} from '../ui/cards/CardInfo.vue'

export interface IBankActions {
    bankId: number
    status: IIconStatusProps & IResponseProps
    completeRequests?: ICardBannerInfoProps[],
    documents?: Document[],
    requests?: ICardInfoProps[],
    mainActions?: ButtonItem[],
    updateActions?: ButtonItem[],
    orderActions?: ButtonItem[],
}

@Component({
    components: {
        'card-banner-info-component': CardBannerInfo,
        'card-attachment-component': CardAttachment,
        'card-info-component': CardInfo,
    }
})
export default class BankActions extends Vue {
    @Prop() readonly bankId!:IBankActions['bankId']
    @Prop() readonly status!:IBankActions['status']
    @Prop() readonly completeRequests!:IBankActions['completeRequests']
    @Prop() readonly documents!:IBankActions['documents']
    @Prop() readonly requests!:IBankActions['requests']
    @Prop() readonly mainActions!:IBankActions['mainActions']
    @Prop() readonly updateActions!:IBankActions['updateActions']
    @Prop() readonly orderActions!:IBankActions['orderActions']

    downloadDocument(document: Document){
        downloadFileByLink({
            name: document.title,
            link: ''
        })
    }


    get responseComponentProps(): IResponseProps {
        return {
            title: this.status.title,
            description: this.status.description,
            buttons: this.status.buttons
        }
    }

    get iconStatusComponentProps(): IIconStatusProps {
        return {
            view: this.status.view,
            icon: this.status.icon
        }
    }

    getBankLogo = getBankLogo
}

</script>
