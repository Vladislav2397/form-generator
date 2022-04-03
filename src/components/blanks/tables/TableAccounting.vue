<template lang="pug">
    .b-table-accounting
        .__scroller
            table.__content
                thead
                    th(
                        v-for="th in data.head"
                    )
                        p.secondary {{ th }}
                tbody
                    template(
                        v-for="(group, groupIndex) in data.body"
                    )
                        tr(
                            v-if="group.groupName"
                        )
                            td(
                                colspan="4"
                            )
                                title-component(
                                    size="xs"
                                ) {{ group.groupName }}
                        template(
                            v-for="(subgroup, subgroupIndex) in group.list"
                        )
                            tr(
                                v-if="subgroup.groupName"
                            )
                                td(
                                    colspan="4"
                                )
                                    title-component(
                                        size="xxs"
                                    ) {{ subgroup.groupName }}
                            tr(
                                v-for="(row, rowIndex) in subgroup.list"
                            )
                                td
                                    p(
                                        :class="row.state"
                                    ) {{ row.title }}
                                td
                                    p.secondary {{ row.code }}
                                td
                                    input-component(
                                        :value="row.quarter"
                                        placeholder="Введите сумму"
                                        mask="decimal"
                                        size="s"
                                        view="flat"
                                        @input="onChange(groupIndex, subgroupIndex, rowIndex, 'quarter', $event)"
                                    )
                                td
                                    input-component(
                                        :value="row.year"
                                        placeholder="Введите сумму"
                                        mask="decimal"
                                        size="s"
                                        view="flat"
                                        @input="onChange(groupIndex, subgroupIndex, rowIndex, 'year', $event)"
                                    )

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {
    TableAccountingData,
} from "../../../js/types/components/blanks/tables/table-accounting";

export interface ITableAccountingProps {
    data: TableAccountingData
}

export type TableAccountingEmitData = {
    groupIndex: number,
    subgroupIndex: number,
    rowIndex: number,
    type: 'quarter' | 'year',
    value: string
}

@Component
export default class TableAccounting extends Vue {
    @Prop({required: true}) readonly data!: ITableAccountingProps['data']

    onChange(groupIndex: number, subgroupIndex: number, rowIndex: number, type: 'quarter' | 'year', value: string){
        this.$emit('change', {
            groupIndex,
            subgroupIndex,
            rowIndex,
            type,
            value
        })
    }
}

</script>
