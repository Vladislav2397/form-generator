<template lang="pug">
    modal-big-component.b-modal-accounting(
        :name="modals.ACCOUNTING"
        :head="head"
        :show-append="false"
    )
        .b-modal-big-layout
            company-accounting-component(
                :data="data.table"
                @change="onChangeAccountingData"
            )
        template(#bottom)
            information-modal-component(
                v-bind="informationModalProps"
            )
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import { modals } from '../../../js/store/modules/modals/state'
import {Getter} from "../../../js/decorators";
import {ModalsPayloadGetter} from "../../../js/store/modules/modals/getters";
import api from "../../../js/api";
import {CompanyAPI} from "../../../js/api/company";
import InformationModal from "../InformationModal.vue";
import {TableAccountingEmitData} from "../tables/TableAccounting.vue";
import {errorToaster} from "../../../js/vue-utils/toast";
import {AppError} from "../../../js/utils/errorHandler/error";

@Component({
    components: {
        'company-accounting-component': () => import(/* webpackChunkName: "chunks/blanks/company/company-accounting" */ '../company/CompanyAccounting.vue'),
        'information-modal-component': InformationModal
    }
})
export default class ModalAccounting extends Vue {
    @Getter('modals/payload') payload!: ModalsPayloadGetter

    data: Record<'context' | 'table', null> | CompanyAPI.GET.GetAccounting.Response = {
        context: null,
        table: null
    }

    head = {
        title: 'Бух. отчётность'
    }

    informationModalProps = {
        button: {
            text: 'Сохранить',
            callback: () => this.saveAccountingData(),
            disabled: true,
            loading: false
        }
    }

    setHeadTitle(title){
        this.head.title = `Бух. отчётность ${title}`
    }

    setPayload(){
        if(this.payload){
            this.setHeadTitle(this.payload.name)

            this.fetchAccountingData(this.payload.id as number)
        }
    }

    onChangeAccountingData(data: {tableIndex: number} & TableAccountingEmitData){
        this.setTableData(data)
        this.setButtonDisable(false)
    }

    setTableData(data: {tableIndex: number} & TableAccountingEmitData){
        this.data.table![data.tableIndex].body[data.groupIndex].list[data.subgroupIndex].list[data.rowIndex][data.type] = data.value
    }

    setButtonDisable(value){
        if(this.informationModalProps.button.disabled !== value) {
            this.informationModalProps.button.disabled = value
        }
    }

    setButtonLoading(value){
        if(this.informationModalProps.button.loading !== value) {
            this.informationModalProps.button.loading = value
        }
    }

    async fetchAccountingData(id: CompanyAPI.GET.GetAccounting.Params){
        this.data = await api.getCompanyAccounting(id)
    }

    saveAccountingData(){
        this.setButtonLoading(true)
        this.setButtonDisable(true)
        type Item = CompanyAPI.POST.UpdateAccounting.Params['data']['list'][number]

        const list = this.data.table!.reduce<Item[]>((totalTables, table) => {
            const tableList = table.body.reduce<Item[]>((totalTable, group) => {
                const groupList = group.list.reduce<Item[]>((totalGroup, subGroup) => {
                    const subGroupList = subGroup.list.reduce<Item[]>((totalSubGroup, row) => [...totalSubGroup, {
                        section_id: row.section_id, quarter_value: row.quarter, year_value: row.year}], [])
                    return [...totalGroup, ...subGroupList]
                }, [])
                return [...totalTable, ...groupList]
            }, [])
            return [...totalTables, ...tableList]
        }, [])

        const sendData:  CompanyAPI.POST.UpdateAccounting.Params = {
            id: this.payload!.id,
            data: {
                list,
                context: {
                    quarter: this.data.context!.quarter_id,
                    year: this.data.context!.year_id
                }
            }
        }

        api.updateCompanyAccounting(sendData).then(response => {
            if(response.status) {
                this.$toast({
                    title: 'Успешно',
                    text: 'Бухгалерская отчетность успешно сохранена',
                    view: 'success'
                })
            }
        }).finally(() =>{
            this.setButtonLoading(false)
        }).catch(e => errorToaster(e as AppError))
    }

    created(){
        this.setPayload()
    }

    modals = Object.freeze(modals)
}

</script>
