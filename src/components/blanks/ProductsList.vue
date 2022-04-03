<template lang="pug">
    .b-products-list
        transition(
            name="fade"
            mode="out-in"
        )
            .__content(
                key="1"
                v-if="list.length"
            )
                .__group(
                    v-for="group in list"
                    v-if="group.list.length"
                )
                    title-component.__title(
                        size="xs"
                    ) {{ group.name }}
                    .__wrapper
                        card-info-component.__item(
                            v-for="product in group.list"
                            :key="product.id"
                            :title="product.name"
                            :disabled="product.disabled"
                            v-bind="getCardProps(product)"
                            @click="$emit('choose', product)"
                        )
            .__content(
                key="2"
                v-else
            )
                .__group(
                    v-for="_ in 2"
                )
                    skeleton-text-component.__title.skeleton-animation(
                        :widthRange="[0.3, 0.5]"
                    )
                    .__wrapper
                        skeleton-card-info-component.__item(
                            v-for="(_, index) in 6"
                            :key="index"
                            :items="['promo', 'description']"
                        )




</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {ProductItem, ProductsGroup} from "../../js/store/modules/products/state";
import CardInfo from "../ui/cards/CardInfo.vue";
import SkeletonCardInfo from "../ui/skeletons/SkeletonCardInfo.vue"

export interface IProductListProps {
    list: ProductsGroup[]
}

@Component({
    components: {
        'card-info-component': CardInfo,
        'skeleton-card-info-component': SkeletonCardInfo,
    }
})
export default class ProductList extends Vue {
    @Prop({required: true}) list!: IProductListProps['list']

    loading = true

    getCardProps(product: ProductItem){
        return {
            ...product.options?.description && {
                description: product.options.description.text,
                ...product.options.description.icon && {
                    iconDescription: product.options.description.icon
                }
            },
            ...product.options?.time && {
                promo: product.options.time.text,
                iconPromo: 'time'
            }
        }
    }
}

</script>
