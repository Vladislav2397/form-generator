import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { ButtonItem } from '../../../types/utils/other'
import { modals } from '../../../store/modules/modals/state'
import { ModalsRemoveActiveAction } from '../../../store/modules/modals/actions'
import { onKeydown } from '../../../utils/default/keydown'

import resize from '../../utils/resize'
import { ModalsActiveGetter } from '../../../store/modules/modals/getters'
import { Action, Getter } from '../../../decorators'

export interface IModalProps {
    button: ButtonItem
    name: modals
    active: boolean
}

@Component
export default class ModalMixin extends Mixins(resize) {
    @Prop() readonly name!: IModalProps['name']
    @Prop() readonly active!: IModalProps['active']

    @Getter('modals/active') activeModals!: ModalsActiveGetter
    @Action('modals/removeActive') closeModal!: ModalsRemoveActiveAction

    isMount = false
    animationTimeout
    readonly animationDelay = 300

    close() {
        this.isMount = false
        this.animationTimeout = setTimeout(() => {
            this.closeModal().then()
        }, this.animationDelay)
    }

    onKeydown(e) {
        onKeydown(e, [
            {
                key: 'esc',
                callback: this.close,
            },
        ])
    }

    async onResize() {
        await this.close()
    }

    addEvents() {
        document.addEventListener('keydown', this.onKeydown, { passive: true })
        this.addResizeWidthEvent(this.onResize)
        this.$scrollLock.disablePageScroll()
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeydown)
        this.$scrollLock.enablePageScroll()
        this.removeResizeWidthEvent()
    }

    mounted() {
        this.addEvents()
        this.isMount = true
    }

    beforeDestroy() {
        this.removeEvents()
        clearTimeout(this.animationTimeout)
    }

    get styles() {
        const index = this.activeModals.findIndex(modalName => modalName === this.name)
        return {
            zIndex: ~index ? 10 + index : null,
        }
    }

    @Watch('modalsActive')
    onChangeModalActive() {
        if (this.activeModals[this.activeModals.length - 1] === this.name) {
            this.addEvents()
        } else {
            this.removeEvents()
        }
    }
}
