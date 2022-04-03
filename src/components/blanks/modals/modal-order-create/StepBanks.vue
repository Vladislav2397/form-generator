<template lang="pug" >

.b-modal-content-layout
    sorting-component.__sorting(
        v-model="value"
        :options="options"
    )

    bank-list-component.__item(
        :cards="cards"
        :checked="checked"

        @click="onClick"
    )

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import BankList from '../../BankList.vue'
import { Action, Getter } from '../../../../js/decorators'
import { OrderCreateFetchBanksAction } from '../../../../js/store/modules/order-create/actions'
import { OrderCreateBanksGetter } from '../../../../js/store/modules/order-create/getters'
import { Maybe } from '../../../../js/types/utils/other'
import Sorting from '../../../ui/Sorting.vue'

@Component({
    components: {
        'bank-list-component': BankList
    },
})
export default class StepBanks extends Vue {
    @Prop() readonly orderId!: number

    @Action('orderCreate/fetchBanks') fetchBanks!: OrderCreateFetchBanksAction

    @Getter('orderCreate/banks') banks!: OrderCreateBanksGetter

    cards: Maybe<BankList['cards']> = null
    checked: BankList['checked'] = []

    value = {
        id: 1,
        reverse: false
    }
    options: Sorting['options'] = [
        {
            id: 1,
            name: 'По рейтингу'
        },
        {
            id: 2,
            name: 'По стоимости'
        },
        {
            id: 3,
            name: 'По скорости'
        },
        {
            id: 4,
            name: 'По вознаграждению'
        },
    ]

    created() {
        this.fetchBanks(this.orderId).then(() => {
            this.cards = this.formatBanks()
        })
    }

    formatBanks(): BankList['cards'] {
        return this.banks?.map(bank => ({
            id: bank.id,
            title: bank.name,
            information: bank.additionalFlags.finalize.text,
            price: {
                sum: bank.proposedTerms.sum,
                reward: bank.proposedTerms.reward
            }
        })) ?? []
    }

    onClick(id) {
        if(Array.isArray(this.checked)) {
            if (this.checked.includes(id)) {
                this.checked = this.checked.filter(item => !(item === id))
            } else {
                this.checked.push(id)
            }
        }
    }
}
</script>
