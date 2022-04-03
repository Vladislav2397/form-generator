<template lang="pug">
    component.b-card(
        :class="classes"
        :is="tag"
        v-bind="options"
        v-on:click="$emit('click', $event)"
        v-on:dragenter="$emit('dragenter', $event)"
        v-on:dragleave="$emit('dragleave', $event)"
        v-on:drop="$emit('drop', $event)"
    )
        slot
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Mixins } from 'vue-property-decorator'

import card from '@/mixins/components/ui/card.vue'

import getOptionsByTag from "@/utils/default/getOptionsByTag"

@Component
export default class Card extends Mixins(card) {
    get classes(): string[] {
        // @ts-ignore
        const classes = [`card--view-${this.view}`, `card--size-${this.size}`, `card--border-style-${this.borderStyle}`, `card--background-${this.background}`]

        // @ts-ignore
        if (this.interactive && !this.disabled) {
            classes.push('card--interactive')
        }

        // @ts-ignore
        if(this.disabled) {
            classes.push('is-disabled')
        }

        return classes
    }

    get options() {
        return {
            // @ts-ignore
            ...this.tag === 'a' && getOptionsByTag('a', this.href),
            ...this.tag === 'button' && getOptionsByTag('button'),
            ...this.tag === 'router-link' && getOptionsByTag('router-link', this.href)
        }
    }
}

</script>
