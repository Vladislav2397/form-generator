<template lang="pug">
    .b-bank-selection
        //button-component.__button(
        //    size="l"
        //    view="secondary-brand"
        //    icon="plus"
        //    @click="$emit('add')"
        //) Добавить банк
        bank-group-list-component.__list(
            :list="list"
            :checked="checked"
            @choose="$emit('choose', $event)"
        )


</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import BankGroupList, {IBankGroupListProps} from "../../../BankGroupList.vue";

@Component({
    components: {
        'bank-group-list-component': BankGroupList
    }
})
export default class BankSelection extends Vue {
    @Prop() readonly list!: IBankGroupListProps['list']
    @Prop() readonly checked!: IBankGroupListProps['checked']
}

</script>
