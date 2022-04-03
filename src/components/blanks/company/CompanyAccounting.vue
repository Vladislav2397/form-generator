<template lang="pug">
    .b-company-data
        transition(
            name="fade"
            mode="out-in"
        )
            .__collapses(
                v-if="data === null"
                key="skeleton"
            )
                skeleton-collapse-component.__collapse(
                    v-for="(_,index) in 2"
                    :key="index"
                )
            .__collapses(
                v-else
                key="tables"
            )
                collapse-component.__collapse(
                    v-for="(table, index) in data"
                    :isOpen="openedCollapse === index"
                    :title="table.title"
                    :key="index"
                )
                    table-accounting-component(
                        :data="table"
                        @change="onChangeTableData({tableIndex: index, ...$event})"
                    )



</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import Collapse from "../Collapse.vue";
import SkeletonCollapse from "../../ui/skeletons/SkeletonCollapse.vue";
import {TableAccountingData} from "../../../js/types/components/blanks/tables/table-accounting";
import TableAccounting from "../tables/TableAccounting.vue";


@Component({
    components: {
        'collapse-component': Collapse,
        'skeleton-collapse-component': SkeletonCollapse,
        'table-accounting-component': TableAccounting,
    }
})
export default class CompanyAccounting extends Vue {
    @Prop() readonly data!: TableAccountingData[] | null

    onChangeTableData(data) {
        this.$emit('change', data)
    }

    openedCollapse = 0
}

</script>
