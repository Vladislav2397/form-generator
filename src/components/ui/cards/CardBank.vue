<template lang="pug">

    card-component.b-card-bank(
        :class="classes"
        :view="cardView"
        :interactive="isInteractive"
        :disabled="status === 'wrong'"
        v-on:click="onCardClick"
    )
        transition(
            name="fade"
            mode="out-in"
        )
            .__wrapper(
                v-if="!loading"
                key="1"
            )
                .__left
                    bank-logo-component.__logo(
                        :id="id"
                        :name="title"
                        small
                    )
                    .__title {{ title }}
                    .__information(
                        v-if="information"
                    ) {{ information }}
                .__right
                    .__value.--align-right.--single(
                        v-if="message"
                    )
                        p
                            strong.is-bold {{message}}
                    .__value(
                        v-else-if="isShowPrice"
                        :class="{'card-bank__value--single': !isShowReward}"
                    )
                        p Стоимость
                            strong.is-bold {{ price.sum | filterNumberDecimal }}&nbsp;&#8381;
                        p(
                            v-if="isShowReward"
                        ) Заработаете
                            strong.is-bold {{ price.reward | filterNumberDecimal }}&nbsp;₽
                    .__wrong(
                        v-else
                    )
                        p Не соответствует условиям банка
                .__action(
                    v-if="isShowAction"
                )
                    transition(
                        name="fade"
                        mode="out-in"
                    )
                        radio-toggle-component.__toggle(
                            v-if="type === 'radio'"
                            :checked="active"
                        )
                        icon-base-component.__icon(
                            v-else-if="isShowIcon"
                            :key="active"
                            :name="correctIcon"
                        )
            .__wrapper.skeleton-animation(
                v-else
                key="2"
            )
                .__left
                    skeleton-round-component.__logo(
                        v-if="loading"
                    )
                    skeleton-text-component.__title(
                        v-if="loading"
                        size="s"
                        :widthRange="[0.2, 0.5]"
                    )
                .__right
                    .__value
                        p Стоимость
                            skeleton-text-component(
                                v-if="loading"
                                tag="strong"
                                size="s"
                                :widthRange="$device.size.mobile ? undefined : [0.2, 0.5]"
                            )
                        p Заработаете
                            skeleton-text-component(
                                v-if="loading"
                                tag="strong"
                                view="success"
                                :size="$device.size.mobile ? 's' : 'xs'"
                                :widthRange="$device.size.mobile ? undefined : [0.2, 0.5]"
                            )

</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Inject } from 'vue-property-decorator'
import { getIconSvg } from '../../../js/utils/service/getResources'
import { DeviceProviderValue } from '../../../js/providers/device'
import {Maybe} from "../../../js/types/utils/other";
import {IconName} from "../../../js/types/components/ui/icon";
import RadioToggle from "../RadioToggle.vue";
import SkeletonRound from '../skeletons/SkeletonRound.vue'

export interface ICardBankProps {
    id: number
    title: string
    price?: {sum: string | number, reward?: string | number}
    status?: 'base' | 'wrong' | 'refusal' | 'withdrawn'
    information?: string
    loading?: boolean
    active?: boolean
    type?: 'checkbox' | 'radio'
}

@Component({
    components: {
        'radio-toggle-component': RadioToggle,
        'skeleton-round-component': SkeletonRound,
    }
})
export default class CardBank extends Vue {
    @Inject('$device') $device!: DeviceProviderValue
    @Prop() readonly id!: ICardBankProps['id']
    @Prop() readonly title!: ICardBankProps['title']
    @Prop() readonly price!: ICardBankProps['price']
    @Prop() readonly status?: ICardBankProps['status']
    @Prop({default: false}) readonly active?: ICardBankProps['active']
    @Prop({default: 'checkbox'}) readonly type?: ICardBankProps['type']
    // ! Status refusal not used
    @Prop() readonly information?: ICardBankProps['information']
    @Prop() readonly loading?: ICardBankProps['loading']

    @Emit('click') clickEmit() {/**/}

    get correctIcon(): Maybe<IconName> {
        if(this.status === 'wrong'){
            return 'close'
        }

        if(this.type === 'checkbox'){
            return 'check'
        }

        return null
    }

    onCardClick() {
        if (this.isInteractive) {
            this.clickEmit()
        }
    }

    get isShowPrice(){
        return this.status !== 'wrong' && this.price
    }

    get message(){

        if(this.status === 'refusal'){
            return 'Отказ'
        }

        if(this.status === 'withdrawn'){
            return 'Отозвано'
        }

        return null
    }

    get cardView() {
        return this.active ? 'primary' : 'base'
    }

    get isShowIcon(){
        return this.status === 'wrong' || this.active
    }

    get isShowReward(){
        return this.price && (this.price.reward || this.price.reward === 0)
    }

    get isShowAction(){
        return this.status !== 'wrong'
    }

    get classes() {
        const classes: string[] = []

        if (this.status) classes.push(`card-bank--status-${this.status}`)
        if (this.active) classes.push(`is-active`)

        return classes
    }

    get isInteractive() {
        return this.status !== 'wrong' && !this.loading
    }

    getIconSvg = getIconSvg
}
</script>
