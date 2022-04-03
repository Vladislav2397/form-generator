<template lang="pug">
    modal-component.b-modal-big(
        v-bind="{name, active, overlayFull: true}"
    )
        transition(
            name="fade-modal"
        )
            .__wrapper(
                v-if="isMount"
            )
                .__main
                    button-component.__button.--close(
                        v-bind="buttonOptions"
                        icon="close"
                        aria-label="Закрыть модальное окно"
                        @click="closeModal"
                    )
                    .__container.container(
                        :style="containerStyles"
                        data-scroll-lock-scrollable
                    )
                        head-component.__head(
                            v-if="head"
                            v-bind="head"
                        )
                        .__content
                            slot
                    .__bottom.container(
                        v-if="$slots.bottom"
                        ref="bottom"
                    )
                        slot(
                            name="bottom"
                        )
                transition(
                    mode="out-in"
                    :name="appendAnimationName"
                )
                    component.__append(
                        v-if="showAppendSync"
                        :is="appendComponentName"
                        v-bind="appendComponentProps"
                    )
                        button-component.__button.--close-append(
                            v-if="$device.size.tablet"
                            view="flat"
                            size = "l"
                            icon="close"
                            aria-label="Закрыть модальное дополнительные данные"
                            @click="closeAppend"
                        )
                        .__scroller
                            slot(
                                name="append"
                            )
                        .__teletype-banner(
                            v-if="$device.size.desktop"
                        )
                            p Если у вас есть вопрос #[br]напишите нам в чат
                            img.lazyload(
                                alt="Стрелка"
                                data-src="/images/utility/arrow-teletype.svg"
                            )
                transition(
                    appear
                    mode="out-in"
                    name="fade"
                )
                    .b-overlay.--full.__overlay(
                        v-if="isShowOverlay"
                        v-on:click="closeAppend"
                    )

</template>

<script lang="ts">
import {Component, Inject, Vue, Prop, Ref, PropSync} from 'vue-property-decorator'
import {IHeadProps} from "../../ui/Head.vue"
import {DeviceProviderValue} from "../../../js/providers/device"
import {ModalsRemoveActiveAction} from "../../../js/store/modules/modals/actions"
import {modals} from "../../../js/store/modules/modals/state"
import {Maybe} from "../../../js/types/utils/other"
import {Action} from "../../../js/decorators"
import ModalMobileContent from "../ModalMobileContent.vue"
import Sidebar from "../Sidebar.vue"

export interface IModalBigProps {
    head: IHeadProps
    showAppend?: boolean
    name: modals
    active: boolean
}

@Component({
    components: {
        'modal-mobile-content-component': ModalMobileContent,
        'sidebar-component': Sidebar,
    }
})
export default class ModalBig extends Vue {
    @Prop() readonly head!: IModalBigProps['head']
    @Prop() readonly active!: IModalBigProps['active']
    @Prop({
        required: true
    }) readonly name!: IModalBigProps['name']
    @PropSync('showAppend',{ default: true }) showAppendSync?: IModalBigProps['showAppend']
    @Ref('bottom') bottomRef!: HTMLElement
    @Inject('$device') $device!: DeviceProviderValue

    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction

    containerStyles = {
        paddingBottom: null as Maybe<string>
    }

    isMount = false
    animationTimeout
    animationDelay = 50


    setContainerStyles(){
        this.containerStyles.paddingBottom =  this.bottomRef && `${this.bottomRef.getBoundingClientRect().height}px`
    }

    mounted() {
        this.animationDelay = 50;
        this.setContainerStyles()
        this.animationTimeout = setTimeout(()=>{
            this.isMount = true
        }, this.animationDelay)
    }

    beforeDestroy(){
        clearTimeout(this.animationTimeout)
    }

    updated(){
        this.setContainerStyles()
    }

    closeAppend(){
        this.showAppendSync = false
    }

    get appendComponentName(){
        return this.$device.size.mobile ? 'modal-mobile-content-component' : 'sidebar-component'
    }

    get appendAnimationName(){
        if(this.$device.size.mobile) {
            return 'transform-down'
        }

        if (this.$device.size.tablet) {
            return 'transform-left'
        }

        return null
    }

    get appendComponentProps(){

        if(this.$device.size.desktop){
            return {
                size: 'm',
                background: 'base'
            }
        }

        return null
    }

    get buttonOptions() {
        return {
            size: (this.$device.size.tabletLate || this.$device.size.desktop) ? 'l' : 'm',
            view: (this.$device.size.desktop || this.$device.size.tabletLate) ? 'flat' : 'outline'
        }
    }

    get isShowOverlay(){
        return this.showAppendSync && !this.$device.size.desktop
    }

}

</script>
