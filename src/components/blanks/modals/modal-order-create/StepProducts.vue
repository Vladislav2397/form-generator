<template lang="pug">
    .b-modal-content-layout
        products-list-component.__item(
            :list="products"
            @choose="onChooseProduct"
        )
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Action, Getter} from "../../../../js/decorators"

import ProductsList from "../../ProductsList.vue"

import {ProductsListGetter} from "../../../../js/store/modules/products/getters"
import { ProductItem } from '../../../../js/store/modules/products/state'
import {OrderCreateSetProductAction} from "../../../../js/store/modules/order-create/actions"
import {ProductsFetchListAction} from "../../../../js/store/modules/products/actions"
import {OrderCreatePurchaseGetter} from "../../../../js/store/modules/order-create/getters"


@Component({
    components: {
        'products-list-component': ProductsList,
    }
})
export default class StepProducts extends Vue {
    @Action('orderCreate/setProduct') setProduct!: OrderCreateSetProductAction
    @Action('products/fetchList') productsFetchList!: ProductsFetchListAction

    @Getter('products/list') products!: ProductsListGetter
    @Getter('orderCreate/purchase') purchase!: OrderCreatePurchaseGetter

    isValid() {
        return true
    }

    onChooseProduct(product: ProductItem){
        this.$emit('choose', product)
        this.setProduct(product)
    }

    mounted(){
        this.productsFetchList()
    }
}

</script>
