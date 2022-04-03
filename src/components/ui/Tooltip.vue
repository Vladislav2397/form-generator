<template lang="pug">

.b-tooltip(
    v-click-outside="closeTooltip"
    @click="toggleBox"
    ref="tooltip"
)
    slot
    portal(
        v-if="isOpen"
        selector="#portal"
        :disabled="isPortalDisabled"
    )
        .__box(
            ref="box"
            :class="classes"
            :style="boxStyles"
        )
            // @vladislav
            //- For position arrow on tooltip
            //.__center
            //.__top
            //.__bottom
            //.__right
            //.__left
            //- ===========

            slot(
                name="content"
            )

</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { computedCoords, Position } from '../../js/vue-utils/computedCoordinates'

@Component
export default class Tooltip extends Vue {
    @Prop({ default: 'right-bottom' }) readonly position!: Position

    @Ref('tooltip') tooltipRef!: HTMLElement
    @Ref('box') boxRef!: HTMLElement

    get classes() {
        const classes: string[] = []

        if (this.position) classes.push(`tooltip__box--position-${this.position}`)

        return classes
    }

    isPortalDisabled = true
    boxStyles: string | null = null

    isOpen = false

    mounted() {
        this.addEvents()
    }

    addEvents() {
        setTimeout(() => {
            this.scrollableArea().addEventListener('scroll', this.closeTooltip)
        })
    }

    scrollableArea() {
        return document.querySelector(
            'div[data-scroll-lock-scrollable]'
        ) ?? document
    }

    beforeDestroy() {
        this.removeEvents()
    }

    removeEvents() {
        this.scrollableArea().removeEventListener('scroll', this.closeTooltip)
    }

    toggleBox() {
        if (this.isOpen) {
            this.closeTooltip()
        } else {
            this.openTooltip()
        }
    }

    openTooltip() {
        this.isPortalDisabled = true
        this.isOpen = true

        this.$nextTick(() => {
            const coords = computedCoords(this.tooltipRef, this.boxRef, {
                VERTICAL: 10,
                HORIZONTAL: 12,
            }, this.position)

            this.boxStyles = `left: ${coords.horizontal}px; top: ${coords.vertical}px`

            this.isPortalDisabled = false
        })
    }

    closeTooltip() {
        this.isOpen = false
    }
}

</script>
