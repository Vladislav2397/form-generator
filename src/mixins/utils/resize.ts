import { Component, Vue } from 'vue-property-decorator'
import { Maybe } from '../../types/utils/other'

@Component
export default class Resize extends Vue {
    resize = {
        prevWidth: null as Maybe<number>,
        currentWidth: null as Maybe<number>,
        callback: null as Maybe<() => void>,
    }

    addResizeWidthEvent(callback: () => void): void {
        this.getResizeWidth()
        this.resize.callback = callback
        window.addEventListener('resize', this.onWindowWidthResize)
    }

    removeResizeWidthEvent(): void {
        window.removeEventListener('resize', this.onWindowWidthResize)
    }

    onWindowWidthResize(): void {
        this.resize.prevWidth = this.resize.currentWidth
        this.resize.currentWidth = window.innerWidth

        if (this.resize.prevWidth !== this.resize.currentWidth) {
            this.resize.callback!()
        }
    }

    getResizeWidth(): void {
        this.resize.currentWidth = window.innerWidth
        this.resize.prevWidth = window.innerWidth
    }
}
