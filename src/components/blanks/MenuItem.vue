<template lang="pug">
    router-link.b-menu-item(
        :to="path"
    )
        .__icons
            icon-image-component.__icon.--default(
                :name="iconName"
                :src="getIconSvg(icon, { view: 'base'})"
            )
            icon-image-component.__icon.--active(
                :name="iconName"
                :src="getIconSvg(icon, { view: 'brand'})"
            )
        .__text
            slot
        .__information
            .__count {{count}}
            transition(
                appear
                name="fade"
                mode="out-in"
            )
                indicator-component.__indicator(
                    v-if="showIndicator"
                    view="brand"
                )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { getIconSvg } from '../../js/utils/service/getResources'
import {NavigationMenuItem} from "../../js/types/components/blanks/navigation";

export interface INavigationMenuProps {
    icon: NavigationMenuItem['icon'],
    path: NavigationMenuItem['path'],
    count: NavigationMenuItem['count'],
    showIndicator: boolean
}

@Component
export default class MenuItem extends Vue {
    @Prop() readonly icon!: INavigationMenuProps['icon']
    @Prop() readonly path!: INavigationMenuProps['path']
    @Prop() readonly count!: INavigationMenuProps['count']
    @Prop() readonly showIndicator!: INavigationMenuProps['showIndicator']

    get iconName() {
        return this.$slots.default?.length ? this.$slots.default[0].text : 'Иконка меню'
    }

    getIconSvg = getIconSvg
}

</script>
