<template lang="pug">
    .b-collapse(
        :class="{ 'is-active': valueModel }"
        :style="collapseStyle"
    )
        .__head(
            v-on:click="onHeadClick"
        )
            slot(
                name="header"
            )
                span {{ title }}
            badge-component.__badge(
                v-if="badgeContent"
                :view="badgeView"
                :showIndicator="false"
            ) {{ badgeContent }}
            icon-base-component.__icon(
                tag="i"
                name="chevron-down"
            )
        .__wrapper(
            :style="wrapperStyle"
        )
            transition(
                name="fade"
                mode="out-in"
            )
                .__content(
                    v-if="isInit || valueModel"
                    ref="content"
                )
                    slot
        divider-component.__divider(
            view="secondary"
        )

</template>

<script lang="ts" >
import { Component, Mixins, Prop, VModel, Ref } from 'vue-property-decorator'

import Resize from '../../js/mixins/utils/resize'
import { BadgeView } from '../../js/types/components/ui/badge'

@Component
export default class Collapse extends Mixins(Resize) {
    @Ref('content') contentRef!: HTMLDivElement

    @Prop() readonly badgeContent!: string
    @Prop() readonly badgeView!: BadgeView
    @Prop() readonly title!: string

    @VModel() valueModel!: boolean

    wrapperStyles = {
        maxHeight: '',
    }

    isInit = false

    get wrapperStyle() {
        return {
            'max-height': this.valueModel ? this.wrapperStyles.maxHeight : '0px',
        }
    }

    get collapseStyle() {
        return {
            'overflow': ( !this.isInit && this.valueModel) ? 'visible' : null
        }
    }

    contentHeight() {
        return this.contentRef?.getBoundingClientRect().height
    }

    initializeMaxHeight() {
        this.isInit = true

        this.$nextTick(() => {
            this.wrapperStyles.maxHeight = `${this.contentHeight() * 1.5}px`
            this.isInit = false
        })
    }

    mounted() {
        this.initializeMaxHeight()
        this.addResizeWidthEvent(this.onResizeWidth)
    }

    beforeDestroy(){
        this.removeResizeWidthEvent()
    }

    onResizeWidth() {
        this.initializeMaxHeight()
    }

    onHeadClick() {
        this.valueModel = !this.valueModel
    }
}

</script>
