<template lang="pug">
    layout-component
        .b-orders
            head-component.__head(
                :title="$route.meta.page.title"
                :buttons="buttons"
            )
            .__search
                input-component.__input(
                    v-model="filtersText"
                    placeholder="Поиск по ИНН или названию компании"
                    icon-left="search"
                )
                button-component.__button(
                    :icon="filtersHelper.show ? 'filter-fill' : 'filter'"
                    view="flat"
                    aria-label="Показать фильтры"
                    @click="toggleFilters"
                )

            .__filters(
                :class="{'is-active': filtersHelper.show}"
                :style="filtersHelper.style"
            )
                transition(
                    :name="transitionFilters"
                    mode="out-in"
                )
                    // TODO Подумать над разделеним логики попап и карточки или убрать active.sync
                    filters-component(
                        ref="filters"
                        v-if="filtersHelper.show"
                        v-model="filtersSync"
                        :active.sync="filtersHelper.show"
                        :selectsOptions="filterSelectsOptions"
                    )
            sorting-component.__sorting(
                v-model="sortingValue"
                :options="sortingSync.options"
                :hideTitle="$device.size.mobile"
                @sort="onSort"
            )
            .__list
                card-order-component.__order(
                    v-for="(order, index) in ordersList"
                    v-bind="order"
                    :key="index"
                    :view="orderCardView[order.idStatus]"
                    @click="onCardClick(order.id)"
                )
            .__bottom
                pagination-component.__pagination(
                    v-model="currentPage"
                    :lastPage="paginationSync.lastPage"
                )
                select-component.__select(
                    v-if="!$device.size.mobile"
                    v-model="perPageValue"
                    :options="perPageOptions"
                )
</template>

<script lang="ts">
import {Component, Inject, Mixins, Ref, Vue, Watch} from 'vue-property-decorator'
import orders from '../../js/mixins/components/pages/orders.vue'
import resize from '../../js/mixins/utils/resize'

import {orderCardView} from "../../js/utils/service/dataConverters";

import {AsyncData} from "../../js/types/store";
import {IHeadProps} from "../ui/Head.vue";
import {DeviceProviderValue} from "../../js/providers/device";
import Filters from "../blanks/Filters.vue";
import CardOrder from "../ui/cards/CardOrder.vue";
import Pagination from "../ui/Pagination.vue";
import {ModalsSetActiveAction} from "../../js/store/modules/modals/actions";
import {modals} from "../../js/store/modules/modals/state";
import {Maybe} from "../../js/types/utils/other";
// import {getModalDialogOptions} from "../../js/services/ModalDialogService";
import {Action, Getter} from "../../js/decorators";
import {
    OrdersFiltersGetter,
    OrdersListGetter,
    OrdersPaginationGetter,
    OrdersSortingGetter, OrdersStatusesGetter
} from "../../js/store/modules/orders/getters";
import {BanksListGetter} from "../../js/store/modules/banks/getters";
import {
    OrdersSetFiltersAction,
    OrdersSetListAction,
    OrdersSetPaginationAction,
    OrdersSetSortingAction
} from "../../js/store/modules/orders/actions";

@Component({
    components: {
        'filters-component': Filters,
        'card-order-component': CardOrder,
        'pagination-component': Pagination,
    }
})
export default class OrdersPage extends Mixins(orders, resize){
    @Inject('$device') $device!: DeviceProviderValue
    @Ref('filters') readonly filtersRef!: Vue

    @Getter('orders/list') ordersList!: OrdersListGetter
    @Getter('orders/pagination') pagination!: OrdersPaginationGetter
    @Getter('orders/filters') filters!: OrdersFiltersGetter
    @Getter('orders/sorting') sorting!: OrdersSortingGetter
    @Getter('orders/statuses') statusesList!: OrdersStatusesGetter
    @Getter('banks/list') banksList!: BanksListGetter

    @Action('orders/setList') setList!: OrdersSetListAction
    @Action('orders/setPagination') setPagination!: OrdersSetPaginationAction
    @Action('orders/setFilters') setFilters!: OrdersSetFiltersAction
    @Action('orders/setSorting') setSorting!: OrdersSetSortingAction
    @Action('modals/setActive') openModal!: ModalsSetActiveAction

    timeoutHeight1 = {} as ReturnType<typeof setTimeout>
    timeoutHeight2 = {} as ReturnType<typeof setTimeout>

    buttons:IHeadProps['buttons'] = [
        {
            text: 'Подать заявку',
            view: 'brand',
            callback: () => this.openModal({
                name: modals.ORDER_CREATE,
            })
        }
    ]

    filtersHelper = {
        show: false,
        style: {
            height: null as Maybe<string>
        }
    }

    toggleFilters(){
        this.filtersHelper.show = !this.filtersHelper.show
        this.setFiltersHeight()

        if(this.filtersHelper.show) {
            this.addResizeWidthEvent(this.onResize)
        } else {
            this.removeResizeWidthEvent()
        }
    }

    setFiltersHeight() {
        clearTimeout(this.timeoutHeight1);
        clearTimeout(this.timeoutHeight2);

        if(!this.isLogicForModal){
            this.filtersHelper.style.height = this.filtersHelper.show ? '0px' : `${this.filtersRef.$el.getBoundingClientRect().height}px` ;

            this.timeoutHeight1 = setTimeout(()=>{
                this.filtersHelper.style.height = this.filtersHelper.show ? `${this.filtersRef.$el.getBoundingClientRect().height}px` : '0px'
            })
            this.timeoutHeight2 = setTimeout(()=>{
                this.filtersHelper.style.height = null
            },300)
        }

    }

    onCardClick(id: number){
        this.openModal({
            name: modals.ORDER,
            payload: {
                id: 1
            }
        })
    }

    onResize(){
        this.toggleFilters()
    }

    get isLogicForModal(){
        return (this.$device.size.mobile || this.$device.size.tablet && !this.$device.size.tabletLate)
    }

    get transitionFilters(){
        return this.isLogicForModal ? null : 'fade-down'
    }

    @Watch('filters')
    onChangeFilters(){
        console.log('onChangeFilters')
    }

    beforeDestroy() {
        clearTimeout(this.timeoutHeight1);
        clearTimeout(this.timeoutHeight2);

        this.removeResizeWidthEvent()
    }

    asyncData ({ store }: AsyncData) {
        return store.dispatch('orders/fetchList')
    }


    orderCardView = orderCardView

}
</script>
