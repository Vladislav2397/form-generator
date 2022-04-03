<template lang='pug'>
    sidebar-component.b-navigation
        form.__head.container(
            method="GET"
            action="/logout"
        )
            button-hamburger-component.__button.--hamburger(
                v-if="!$device.size.desktop"
                :active="isShowMenu"
                @click="toggleIsShowMenu"
            )
            logo-component.__logo(
                v-bind="logoProps"
            )
            button-component.__button.--log-out(
                type="submit"
                view="flat"
                icon="exit"
                aria-label="Выйти"
                :key="$device.size.tablet"
            )
                template(
                    v-if="$device.size.tablet"
                ) Выйти
        transition(
            :name="!$device.size.desktop ? 'show-sidebar' : null"
            mode="out-in"
        )
            .__wrapper(
                v-if="isShowMenu || $device.size.desktop"
            )
                .__menu(
                    v-for="group in menu"
                )
                    menu-item-component(
                        v-for="link in group.list"
                        :key="link.name"
                        :icon="link.icon"
                        :path='link.path'
                        :show-indicator="link.update"
                        :count="link.count"
                    ) {{link.name}}
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'

import ButtonHamburger from '../ui/ButtonHamburger.vue'
import { DeviceProviderValue } from '../../js/providers/device'
import { getIconSvg } from '../../js/utils/service/getResources'
import routes from '../../js/router/routes'
import {Action, Getter} from "../../js/decorators";
import Sidebar from './Sidebar.vue'
import MenuItem from "./MenuItem.vue"
import {NavigationIsShowMenuGetter, NavigationMenuGetter} from "../../js/store/modules/navigation/getters";
import {NavigationSetIsShowMenuAction, NavigationSetMenuAction} from "../../js/store/modules/navigation/actions";
import {NavigationMenuGroup, NavigationMenuItem} from "../../js/types/components/blanks/navigation";

@Component({
    components: {
        'menu-item-component': MenuItem,
        'button-hamburger-component': ButtonHamburger,
        'sidebar-component': Sidebar
    },
})
export default class Navigation extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Getter('navigation/isShowMenu') isShowMenu!: NavigationIsShowMenuGetter
    @Getter('navigation/menu') menu!: NavigationMenuGetter

    @Action('navigation/setIsShowMenu') setIsShowMenu!: NavigationSetIsShowMenuAction
    @Action('navigation/setMenu') setMenu!: NavigationSetMenuAction

    toggleIsShowMenu() {
        this.setIsShowMenu(!this.isShowMenu)

        if(this.$device.size.mobile) {
            if(this.isShowMenu) {
                this.$scrollLock.disablePageScroll()
            } else {
                this.$scrollLock.enablePageScroll()
            }
        }
    }

    createNavigation(rts: RouteConfig[]) {
        const menu: NavigationMenuGroup[] = []

        rts.forEach(route => {
            if (route.meta?.sidebar?.group) {
                const indexes = route.meta?.sidebar.group.split('-')
                const indexGroup = indexes[0]
                const indexInGroup = indexes[1]

                const list: NavigationMenuItem[] = menu[indexGroup] ? [...menu[indexGroup].list] : []

                list[indexInGroup] = {
                    path: route.path,
                    name: route.meta.sidebar.text,
                    icon: route.meta.sidebar.icon,
                    count: 12,
                    update: true
                }

                menu[indexGroup] = {
                    list,
                }
            }
        })

        return menu
    }

    created() {
        this.setMenu(this.createNavigation(routes))
    }

    clear() {
        this.setIsShowMenu(false)
        this.$scrollLock.enablePageScroll()
    }

    @Watch('$device.size', {deep: true})
    onChangeSize(){
        this.clear()
    }

    @Watch('$route')
    onChangeRoute(){
        this.clear()
    }

    get logoProps(){
        return {
            ...this.$route.name !== 'objects' && {
                tag: 'router-link',
                href: '/'
            }
        }
    }

    getIconSvg = getIconSvg
}
</script>
