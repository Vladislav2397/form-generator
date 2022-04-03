<template lang="pug">
    .b-bank-group-list
        .__item(
            v-for="group in list"
        )
            title-component.__title(
                v-if="group.title"
                :view="group.view"
                size="xs"
            ) {{ group.title }}
            bank-list-component.__cards(
                :cards="group.cards"
                :checked="checked"
                @click="$emit('choose', $event)"
            )

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import BanksList, {IBankListProps} from "./BankList.vue";
import {ITitleProps} from "../ui/Title.vue";


export interface IBankGroupListProps {
    list: {
        title: string
        view?: ITitleProps['view']
        cards: IBankListProps['cards']
    }[]
    checked: IBankListProps['checked']
}

@Component({
    components: {
        'bank-list-component': BanksList,
    }
})
export default class BankGroupList extends Vue {
    @Prop() readonly list!: IBankGroupListProps['list']
    @Prop() readonly checked!: IBankGroupListProps['checked']
}

</script>
