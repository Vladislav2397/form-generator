<template lang="pug">
    .b-filters-layout
        .__head
            title-component.__title(
                size="xs"
            ) Фильтры
            transition(
                name="fade"
                mode="out-in"
            )
                badge-component.__badge(
                    v-if="filledFiltersCount"
                    :showIndicator="false"
                ) {{ filledFiltersCount }}
            button-component.__button(
                :key="buttonText"
                :aria-label="buttonText"
                size="s"
                view="flat"
                @click="clear"
            ) {{ buttonText }}
        .__form
            .__field
                select-component.__input(
                    v-model="statusValue"
                    :options="selectsOptions.statuses"
                    :size="formItemSize"
                    label="Статус заявки"
                    placeholder="Выберите статус"
                )
            .__field
                input-multi-datepicker-component.__input(
                    v-model="dateStartValue"
                    :placeholders="['дд.мм.гггг', 'дд.мм.гггг']"
                    :size="formItemSize"
                    label="Дата подачи"
                )
            .__field
                input-multi-datepicker-component.__input(
                    v-model="dateEndValue"
                    :placeholders="['дд.мм.гггг', 'дд.мм.гггг']"
                    :size="formItemSize"
                    label="Дата выдачи"
                )
            .__field
                input-multi-component.__input(
                    v-model="sumValue"
                    :placeholders="['от', 'до']"
                    :size="formItemSize"
                    mask="decimal"
                    label="Сумма обеспечения, ₽"
                )
            .__field
                input-multi-component.__input(
                    v-model="commissionValue"
                    :placeholders="['от', 'до']"
                    :size="formItemSize"
                    mask="decimal"
                    label="Сумма гарантии, ₽"
                )
            .__field
                select-component.__input(
                    v-model="bankValue"
                    :options="selectsOptions.banks"
                    :size="formItemSize"
                    label="Выберите банки"
                    placeholder="Ничего не выбрано"
                )
</template>

<script lang="ts">
import {Component, Inject, Prop, VModel, Vue} from 'vue-property-decorator'
import {DeviceProviderValue} from "../../js/providers/device"
import {FiltersOptions} from "../../js/types/utils/other"
import {SelectOption} from "../../js/types/components/ui/select"

import filterFactory from "../../js/store/modules/orders/filter-factory"

@Component
export default class FiltersLayout extends Vue {
    @Prop() selectsOptions!: Record<string, SelectOption[]>
    @VModel() valueModel!: FiltersOptions
    @Inject('$device') $device!: DeviceProviderValue

    clear() {
        this.valueModel = {
            ...filterFactory('orders'),
            text: this.valueModel.text
        }
    }

    get statusValue(){
        return this.valueModel.status
    }

    set statusValue(value) {
        this.valueModel = {
            ...this.valueModel,
            status: value
        }
    }

    get dateStartValue(){
        return [this.valueModel.dateStart.from, this.valueModel.dateStart.to]
    }

    set dateStartValue(value) {
        this.valueModel = {
            ...this.valueModel,
            dateStart: {
                ...this.valueModel.dateStart,
                from: value[0],
                to: value[1]
            }
        }
    }

    get dateEndValue(){
        return [this.valueModel.dateEnd.from, this.valueModel.dateEnd.to]
    }

    set dateEndValue(value) {
        this.valueModel = {
            ...this.valueModel,
            dateEnd: {
                ...this.valueModel.dateEnd,
                from: value[0],
                to: value[1]
            }
        }
    }

    get sumValue(){
        return [this.valueModel.sum.from, this.valueModel.sum.to]
    }

    set sumValue(value) {
        this.valueModel = {
            ...this.valueModel,
            sum: {
                ...this.valueModel.sum,
                from: value[0],
                to: value[1]
            }
        }
    }

    get commissionValue(){
        return [this.valueModel.commission.from, this.valueModel.commission.to]
    }

    set commissionValue(value) {
        this.valueModel = {
            ...this.valueModel,
            commission: {
                ...this.valueModel.commission,
                from: value[0],
                to: value[1]
            }
        }
    }

    get bankValue(){
        return this.valueModel.banks
    }

    set bankValue(value) {
        this.valueModel = {
            ...this.valueModel,
            banks: value
        }
    }

    get buttonText(){
        return (this.$device.size.mobile || this.$device.size.tablet) ? 'Очистить все' : 'Очистить'
    }

   get formItemSize(){
        return (this.$device.size.mobile || this.$device.size.tablet) ? 'm' : 's'
   }


   get filledFiltersCount(){
        return Object.keys(this.valueModel).filter(key => key !== 'text').reduce((total, key) => total + (['sum','commission', 'dateStart', 'dateEnd'].includes(key) ? Number(!!this.valueModel[key].from) + Number(!!this.valueModel[key].to)  : Number(!!this.valueModel[key])), 0)
   }

}

</script>
