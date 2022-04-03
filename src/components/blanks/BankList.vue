<template lang="pug">
    .b-bank-list
        card-bank-component.__card(
            v-for="card in cards"

            :id="card.id"
            :title="card.title"
            :price="card.price"
            :information="card.information"
            :status="card.status"
            :key="card.id"
            :active="isActive(card.id)"
            :type="Array.isArray(checked) ? 'checkbox' : 'radio'"
            @click="onClick(card.id)"
        )

</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import Sorting from '../ui/Sorting.vue'
import CardBank, { ICardBankProps } from '../ui/cards/CardBank.vue'
import {Maybe} from "../../js/types/utils/other";


export interface IBankListProps {
    cards: ICardBankProps[]
    checked: ICardBankProps['id'][] | Maybe<ICardBankProps['id']>
}


@Component({
    components: {
        'card-bank-component': CardBank,
        'sorting-component': Sorting,
    }
})
export default class BanksList extends Vue {
    @Prop() readonly cards!: IBankListProps['cards']
    @Prop() readonly checked!: IBankListProps['checked']

    @Emit('click') clickEmit(id: ICardBankProps['id']) {/**/}

    isActive(id: ICardBankProps['id']){
        return Array.isArray(this.checked) ? this.checked.includes(id) : id === this.checked
    }


    onClick(id) {
        this.clickEmit(id)
    }
}
</script >
