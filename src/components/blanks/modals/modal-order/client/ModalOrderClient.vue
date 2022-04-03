<template lang="pug">
    modal-big-component.b-modal-order(
        :name="modals.ORDER"
        :showAppend.sync="showAppend"
    )
        order-information-client-component.__head(
            :number="baseInformation.number"
            :sum="baseInformation.sum"
            :date="baseInformation.date"
            :company="baseInformation.company"
            :actions="actions"
            :loading="isLoading"
            :progress="progress"
        )
        .__body
            transition(
                name="fade"
                mode="out-in"
            )
                signing-documents-component.__step(
                    v-if="isStepSignDocuments"
                    :documents="sign && sign.first && sign.first.list"
                    :link="sign && sign.first && sign.first.link"
                )
                bank-selection-component(
                    v-if="isStepBankSelection"
                    :list="bankSelection.list"
                    :checked="bankSelection.checked"
                    @choose="onChooseBank"
                )
        template(
            #append
        )
            card-banner-info-component.__append-item(
                v-if="isShowAppendSignCard"
                v-bind="cardSignLinkProps"
            )
            bank-actions-component.__append-item(
                v-if="isShowBankActions"
                v-bind="bankActionsProps"
            )

</template>

<script lang="ts">
import {Component, Inject, Mixins} from 'vue-property-decorator'
import { modals } from '../../../../../js/store/modules/modals/state'
import OrderInformationClient from "../../../OrderInformationClient.vue";
import SigningDocuments from "./SigningDocuments.vue";
import {Action, Getter} from "../../../../../js/decorators";
import {
    OrderClientBankGetter,
    OrderClientBaseInformationGetter, OrderSignGetter
} from "../../../../../js/store/modules/order-client/getters";
import {ContextMenuOption} from "../../../../../js/vue-utils/context-menu";
import {ModalsPayloadGetter} from "../../../../../js/store/modules/modals/getters";
import {
    OrderClientClearAction,
    OrderClientFetchBaseInformationAction
} from "../../../../../js/store/modules/order-client/actions";
import {orderStatuses} from "../../../../../js/services/OrderService";
import {DeviceProviderValue} from "../../../../../js/providers/device";
import CardBannerInfo, {ICardBannerInfoProps} from "../../../../ui/cards/CardBannerInfo.vue";
import {getIconSvg} from "../../../../../js/utils/service/getResources";
import {IProgressBarProps} from "../../../../../js/mixins/components/ui/progress-bar";
import copyToBuffer from '../../../../../js/mixins/utils/copyToBuffer'
import BankActions, {IBankActions} from "../../../BankActions.vue";
import BankSelection from "./BankSelection.vue";
import {IBankGroupListProps} from "../../../BankGroupList.vue";
import {ICardBankProps} from "../../../../ui/cards/CardBank.vue";



@Component({
    components: {
        'order-information-client-component': OrderInformationClient,
        'signing-documents-component': SigningDocuments,
        'card-banner-info-component': CardBannerInfo,
        'bank-actions-component': BankActions,
        'bank-selection-component': BankSelection,
    }
})
export default class ModalOrderClient extends Mixins(copyToBuffer) {
    @Getter('orderClient/baseInformation') baseInformation!: OrderClientBaseInformationGetter
    @Getter('orderClient/bank') bank!: OrderClientBankGetter
    @Getter('modals/payload') payload!: ModalsPayloadGetter
    @Getter('orderClient/sign') sign!: OrderSignGetter

    @Action('orderClient/fetchBaseInformation') fetchBaseInformation!: OrderClientFetchBaseInformationAction
    @Action('orderClient/clear') clear!: OrderClientClearAction

    @Inject('$device') $device!: DeviceProviderValue

    showAppend = this.$device.size.desktop

    actions: ContextMenuOption[] = [
        {
            name: 'Отозвать заявку',
            callback: () => {
                console.log('Отозвать заявку')
            }
        }
    ]

    cardSignLinkProps: ICardBannerInfoProps =  {
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
    }

    bankSelection: IBankGroupListProps = {
        checked: this.$device.size.desktop ? 1 : null,
        list: [
            {
                title: 'Проект готов',
                view: 'success',
                cards: [
                    {
                        id: 1,
                        title: 'Bank',
                        status: 'refusal',
                        information: 'information'
                    },
                    {
                        id: 2,
                        title: 'Bank',
                        price: {
                            sum: 1,
                            reward: 2
                        }
                    },
                ]
            },
            {
                title: 'Рассмотрение заявки',
                view: 'secondary',
                cards: [
                    {
                        id: 3,
                        title: 'Bank',
                        status: 'withdrawn'
                    },
                    {
                        id: 4,
                        title: 'Bank',
                        price: {
                            sum: 1,
                            reward: 2
                        }
                    }
                ]
            },
            {
                title: 'Отказ',
                view: 'secondary',
                cards: [
                    {
                        id: 5,
                        title: 'Bank',
                        status: 'wrong'
                    },
                ]
            }
        ],
    }

    copyLinkToSignDocuments(){
        this.copyToBuffer(this.sign?.first?.link)
    }

    onChooseBank(id: ICardBankProps['id']){
        this.setCheckedBank(id)
        this.setShowAppend(true)
    }

    setCheckedBank(id){
        this.bankSelection.checked = id
    }

    setShowAppend(value){
        this.showAppend = value
    }

    get orderStatus() {
        return this.baseInformation.status
    }

    get isLoading(){
        return this.baseInformation.id === null
    }

    get isStepSignDocuments(){
        return Boolean(this.orderStatus && [orderStatuses.MODERATION,orderStatuses.FIRST_SIGN].includes(this.orderStatus))
    }

    get isStepBankSelection(){
        return Boolean(this.orderStatus && [orderStatuses.REVIEW].includes(this.orderStatus)) || true
    }

    get progress(): IProgressBarProps{
        return {
            stepsNames: this.progressStepsNames,
            value: this.progressValue,
            ...this.isProgressComplete && {
                view: 'success'
            }
        }
    }

    get progressStepsNames(){
        return ['Подписание документов', 'Выбор предложения', 'Подготовка документов от банка', 'Оплата гарантии', 'Выдача гарантии']
    }

    get progressValue(){
        return [1,0,0,0,0]
    }

    get isProgressComplete(){
        return this.progressValue[this.progressValue.length - 1] === 1
    }

    get isShowAppend(){
        return this.$device.size.desktop || this.showAppend
    }

    get isShowAppendSignCard(){
        return this.orderStatus === orderStatuses.FIRST_SIGN
    }


    get isShowBankActions(){
        return [orderStatuses.REVIEW].includes(this.orderStatus!) || true
    }

    get bankActionsProps(): IBankActions{
        return {
            bankId: 1,
            status: {
                title: 'Банк рассматривает заявку',
                view: 'system',
                icon: 'time',
            },
            completeRequests: [
                {
                    title: 'Запрос на превышение комиссии успешно одобрен',
                    view: 'warning',
                    buttons: [
                        {
                            view: 'flat',
                            size: 'l',
                            icon: 'close',
                            callback: () => {
                                console.log('completeRequests')
                            }
                        }
                    ]
                },
                {
                    title: 'Запрос на превышение комиссии отклонён',
                    view: 'critical',
                    buttons: [
                        {
                            view: 'flat',
                            size: 'l',
                            icon: 'close',
                            callback: () => {
                                console.log('completeRequests')
                            }
                        }
                    ]
                }
            ],
            requests: [
                {
                    title: 'Запрос документов',
                    promo: 'Требуются дополнительные документы'
                },
                {
                    title: 'Запрос документов',
                    promo: 'Требуются дополнительные документы'
                }
            ],
            updateActions: [
                {
                    text: 'Оповестить текстом',
                    view: 'warning',
                    callback: () => {
                        console.log('Оповестить текстом')
                    }
                },
                {
                    text: 'Обновить заявку',
                    view: 'warning',
                    callback: () => {
                        console.log('Обновить заявку')
                    }
                }
            ],
            documents: [
                {
                    title: 'Проект гарантии',
                    value: 1,
                    group: 'company'
                },
                {
                    title: 'Счёт на оплату',
                    value: 2,
                    group: 'company'
                }
            ],
            orderActions: [
                {
                    text: 'Редактировать заявку',
                    view: 'outline-brand',
                    callback: () => {
                        console.log('Редактировать заявку')
                    }
                },
                {
                    text: 'Изменить комиссию',
                    view: 'outline-brand',
                    callback: () => {
                        console.log('Изменить комиссию')
                    }
                },
                {
                    text: 'Внести правки в проект',
                    view: 'outline-brand',
                    callback: () => {
                        console.log('Внести правки в проект')
                    }
                },
                {
                    text: 'Согласовано',
                    callback: () => {
                        console.log('Согласовано')
                    }
                },
            ],
            mainActions: [
                {
                    text: 'Создать запрос',
                    view: 'outline-brand',
                    callback: () => {
                        console.log('Создать запрос')
                    }
                },
                {
                    text: 'Отказать',
                    view: 'critical',
                    callback: () => {
                        console.log('Отказать')
                    }
                },
                {
                    text: 'Отозвать заявку',
                    view: 'flat',
                    callback: () => {
                        console.log('Отозвать заявку')
                    }
                },
            ]
        }
    }


    created(){
        if(this.payload){
            this.fetchBaseInformation(this.payload.id)
        }
    }

    beforeDestroy(){
        console.log('beforeDestroy')
        this.clear()
    }

    modals = Object.freeze(modals)
    orderStatuses = Object.freeze(orderStatuses)
}

</script>
