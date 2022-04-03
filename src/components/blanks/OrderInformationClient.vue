<template lang="pug">
    .b-order-information-client
        transition(
            name="fade"
            mode="out-in"
        )
            .__wrapper(
                v-if="!loading"
                key="1"
            )
                .__base
                    .__main
                        .__number {{ number }}
                        button-component.__button(
                            v-if="actions && actions.length"
                            size="m"
                            view="flat"
                            icon="menu"
                            aria-label="Кнопка меню опции заявки"
                            @click="onClickButtonMenu"
                        )
                    .__list
                        template(
                            v-if="isMobileTemplate"
                        )
                            card-details-component.__card(
                                v-for="(card, index) in cards"
                                :key="index"
                                :title="card.title"
                                :list="card.list"
                            )
                        template(
                            v-else
                        )
                            .__item(
                                v-for="item in list"
                            )
                                span {{ item.title }}
                                p {{ item.text }}
                                hint-component.__hint(
                                    v-if="item.hint"
                                    @click="onClickHint(item)"
                                )
                progress-bar-component.__progress(
                    v-bind="progress"
                )
                .__bank(
                    v-if="bank"
                )
                    .__logo
                        img.lazyload(
                            :data-src="getBankLogo(1, { small: true })"
                            alt="Логотип банка"
                        )
                        p {{ bank.name }}
                    .__values
                        .__value.--commission Стоимость
                            strong.is-bold {{bank.commission | filterNumberDecimal}} ₽
                        .__value.--reward(
                            v-if="bank.reward"
                        ) Заработаете
                            strong.is-bold {{bank.reward | filterNumberDecimal}} ₽
            .__wrapper(
                v-else
                key="2"
            )
                .__base.skeleton-animation
                    .__main
                        .__number.--skeleton(
                            size="xxl"
                        )
                            skeleton-text-component(
                                size="xxl"
                            )
                    .__list
                        template(
                            v-if="isMobileTemplate"
                        )
                            .__card(
                                v-for="_ in 2"
                            )
                                skeleton-card-details-component
                        template(
                            v-else
                        )
                            .__item.--skeleton(
                                v-for="_ in 3"
                            )
                                skeleton-text-component(
                                    :widthRange="[0.7, 0.9]"
                                    view="secondary"
                                    size="xs"
                                )
                                skeleton-text-component(
                                    :widthRange="[0.7, 0.9]"
                                    size="xs"
                                )
                skeleton-progress-bar-component.__progress(
                    :sections="progress.value.length"
                )
</template>

<script lang="ts">
import {Component, Vue, Prop, Inject} from 'vue-property-decorator'
import { getBankLogo } from '../../js/utils/service/getResources';
import {ContextMenuOption} from "../../js/vue-utils/context-menu";
import Hint from "../ui/Hint.vue"
import {DeviceProviderValue} from "../../js/providers/device";
import {toNumberDecimal} from "../../js/utils/default/regulars";
import {CompanyItem} from "../../js/types/data/order";
import CardDetails, {ICardDetailsProps} from "../ui/cards/CardDetails.vue";
import SkeletonCardDetails from "../ui/skeletons/SkeletonCardDetails.vue";
import ProgressBar, {IProgressBarProps} from "../ui/ProgressBar.vue";
import SkeletonProgressBar from "../ui/skeletons/SkeletonProgressBar.vue";

export type OrderInformationItem = {
    title: string
    text: string
    hint?: string
}

export interface IOrderInformationClientProps {
    number: string
    sum: number
    date: string
    company: CompanyItem
    loading?: boolean
    bank?: {
        id: number
        name: string
        commission: number
        reward?: number
    } | null
    actions?: ContextMenuOption[]
    progress: IProgressBarProps
}
@Component({
    components: {
        'hint-component': Hint,
        'card-details-component': CardDetails,
        'skeleton-card-details-component': SkeletonCardDetails,
        'progress-bar-component': ProgressBar,
        'skeleton-progress-bar-component': SkeletonProgressBar,
    }
})
export default class OrderInformationClient extends Vue {
    @Prop() readonly number!: IOrderInformationClientProps['number']
    @Prop() readonly sum!: IOrderInformationClientProps['sum']
    @Prop() readonly date!: IOrderInformationClientProps['date']
    @Prop() readonly company!: IOrderInformationClientProps['company']
    @Prop() readonly bank!: IOrderInformationClientProps['bank']
    @Prop() readonly actions!: IOrderInformationClientProps['actions']
    @Prop() readonly loading!: IOrderInformationClientProps['loading']
    @Prop() readonly progress!: IOrderInformationClientProps['progress']

    @Inject('$device') $device!: DeviceProviderValue

    onClickHint(item:OrderInformationItem){
        console.log(item.hint)
    }

    onClickButtonMenu(event: Event){
        if(event.target && this.actions) {
            this.$contextMenu(event.target as Element, this.actions)
        }
    }


    get list(): OrderInformationItem[]{
        return [
            {
                title: 'Сумма гарантии',
                text: `${toNumberDecimal(this.sum)} ₽`
            },
            {
                title: 'Срок гарантии',
                text: this.date,
            },
            {
                title: 'ИНН компании',
                text: this.company.inn,
                hint: this.company.name
            },
        ]
    }

    get cards(): ICardDetailsProps[]{
        return [
            {
                title: 'БГ 44-ФЗ на исполнение контракта',
                list: [
                    {
                        label: 'Сумма гарантии',
                        text: `${toNumberDecimal(this.sum)} ₽`,
                    },
                    {
                        label: 'Срок гарантии',
                        text: this.date,
                    }
                ]
            },
            {
                title: this.company.name,
                list: [
                    {
                        label: 'ИНН',
                        text: this.company.inn,
                    },
                    {
                        label: 'ОГРН',
                        text: this.company.ogrn ? this.company.ogrn : '',
                    }
                ]
            }
        ]
    }

    get isMobileTemplate(){
        return !(this.$device.size.tabletLate || this.$device.size.desktop)
    }

    getBankLogo = getBankLogo
}

</script>
