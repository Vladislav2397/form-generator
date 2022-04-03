<template lang="pug">
    button.b-button-hamburger(
        type="button"
        role="button"
        :class="{'is-active': active}"
        v-on:click="$emit('click')"
    )
        .__wrapper
            span
            span
            span
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

export interface IButtonHamburgerProps {
    active?: boolean
}

@Component
export default class ButtonHamburger extends Vue {
    @Prop() readonly active!: IButtonHamburgerProps['active']
}

</script>
