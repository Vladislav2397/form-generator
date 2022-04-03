import { Component, Mixins } from 'vue-property-decorator'

import resize from '../mixins/utils/resize'

const device = {
    size: {
        mobile: false,
        tablet: false,
        tabletLate: false,
        desktop: false,
    },
    type: {
        desktop: false,
        mobile: false,
    },
}

export type DeviceProviderValue = typeof device

@Component
export default class DeviceProvider extends Mixins(resize) {
    device = device

    isMobile() {
        return Boolean(navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i))
    }

    created(): void {
        this.setSize()
        this.setType()
        this.addResizeWidthEvent(this.setSize)
    }

    beforeDestroy(): void {
        this.removeResizeWidthEvent()
    }

    setSize(): void {
        const width = window.innerWidth

        const breakpoints = {
            tablet: 650,
            tabletLate: 768,
            desktop: 1200,
        }

        this.device.size.mobile = width < breakpoints.tablet
        this.device.size.tablet = width < breakpoints.desktop && width >= breakpoints.tablet
        this.device.size.tabletLate = width < breakpoints.desktop && width >= breakpoints.tabletLate
        this.device.size.desktop = width >= breakpoints.desktop
    }

    setType() {
        this.device.type.desktop = !this.isMobile()
        this.device.type.mobile = this.isMobile()
    }
}
