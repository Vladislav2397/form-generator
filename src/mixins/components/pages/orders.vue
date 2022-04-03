<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {SortingValue} from "../../../types/components/ui/sorting";
import {
    OrdersFiltersGetter,
    OrdersListGetter,
    OrdersPaginationGetter,
    OrdersSortingGetter, OrdersStatusesGetter
} from "../../../store/modules/orders/getters";
import {
    OrdersSetFiltersAction,
    OrdersSetListAction,
    OrdersSetPaginationAction, OrdersSetSortingAction
} from "../../../store/modules/orders/actions";
import {perPageCounts} from "../../../utils/service/dataConverters";
import {SelectOption} from "../../../types/components/ui/select";
import {BanksListGetter} from "../../../store/modules/banks/getters";

@Component
export default class OrdersPageMixin extends Vue{

    ordersList!: OrdersListGetter
    pagination!: OrdersPaginationGetter
    filters!: OrdersFiltersGetter
    sorting!: OrdersSortingGetter
    statusesList!: OrdersStatusesGetter

    banksList!: BanksListGetter

    setList!: OrdersSetListAction
    setPagination!: OrdersSetPaginationAction
    setFilters!: OrdersSetFiltersAction
    setSorting!: OrdersSetSortingAction

    perPageOptions: SelectOption[] = [
        {
            id: 1,
            text: 'Показывать по 15',
        },
        {
            id: 2,
            text: 'Показывать по 30'
        },
        {
            id: 3,
            text: 'Показывать по 50'
        }
    ]

    createOrder(){
        console.log('createOrder')
    }

    onSort(value: SortingValue){
        console.log(value)
    }

    get filterSelectsOptions() {
        return {
            banks: this.banksList,
            statuses: this.statusesList
        }
    }

    get paginationSync(){
        return this.pagination
    }

    set paginationSync(value){
        this.setPagination(value)
    }

    get sortingSync(){
        return this.sorting
    }

    set sortingSync(value){
        this.setSorting(value)
    }

    get filtersSync(){
        return this.filters
    }

    set filtersSync(value){
        this.setFilters(value)
    }

    get filtersText(){
        return this.filters.text
    }

    set filtersText(value){
        this.setFilters({
            ...this.filters,
            text: value
        })
    }

    get sortingValue(){
        return this.sortingSync.value
    }

    set sortingValue(value){
        this.sortingSync = {
            ...this.sortingSync,
            value
        }
    }

    get currentPage() {
        return this.paginationSync.currentPage
    }

    set currentPage(e: number){
        this.paginationSync = {
            ...this.paginationSync,
            currentPage:  e
        }
    }

    get perPageValue() {
        return this.perPageOptions.find(option => perPageCounts[option.id] === this.paginationSync.perPage)?.id || null
    }

    set perPageValue(e: SelectOption['id'] | null){
        this.paginationSync = {
            ...this.paginationSync,
            ...e !== null && {
                perPage:  perPageCounts[e]
            }
        }
    }
}

</script>
