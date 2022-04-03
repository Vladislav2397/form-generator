<template lang="pug">
    modal-component.b-modal-small(
        v-bind="{name, active}"
    )
        transition(
            appear
            name="transform-down"
            mode="out-in"
        )
            .__wrapper
                component.__content(
                    :is="componentName"
                    v-bind = "componentProps"
                )
                    slot
                template(
                    v-if="isShowButtons"
                )
                    .__buttons
                        divider-component.__divider(
                            v-if="isShowDivider"
                        )
                        button-component.__button(
                            v-for="(button, index) in buttons"
                            :aria-label="button.text"
                            :view="button.view"
                            :key="index"
                            size="l"
                            @click="button.callback"
                        ) {{ button.text }}
                iphone-spacer-component
</template>

<script lang="ts">
import {Component, Inject, Vue, Prop} from 'vue-property-decorator'
import {ButtonItem} from "../../../js/types/utils/other";
import {DeviceProviderValue} from "../../../js/providers/device";
import {modals} from "../../../js/store/modules/modals/state";
import ModalDesktopContent from '../ModalDesktopContent.vue'
import ModalMobileContent from '../ModalMobileContent.vue'
import Filters from '../Filters.vue'


export interface IModalSmallProps{
    buttons: ButtonItem[]
    name: modals
    active: boolean
}

@Component({
    components: {
        Filters,
        'modal-mobile-content-component': ModalMobileContent,
        'modal-desktop-content-component': ModalDesktopContent
    },
})
export default class ModalSmall extends Vue {
    @Prop() readonly buttons?: IModalSmallProps['buttons']
    @Prop({
        required: true
    }) readonly name!: IModalSmallProps['name']
    @Prop() readonly active!: IModalSmallProps['active']
    @Inject('$device') $device!: DeviceProviderValue

    get isShowDivider(){
        return this.isMobileComponent
    }

    get isShowButtons(){
        return this.buttons && this.buttons.length
    }

    get isMobileComponent() {
        return (this.$device.size.mobile || this.$device.size.tablet) && !this.$device.size.tabletLate
    }

    get componentName() {
        return this.isMobileComponent ? 'modal-mobile-content-component' : 'modal-desktop-content-component'
    }

    get componentProps() {
        return !this.isMobileComponent ? {clearBottomRadius: true} : null
    }
}

</script>
