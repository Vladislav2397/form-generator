<template lang="pug">
    transition(
        name="fade"
    )
        .b-modal(
            v-if="isMount"
            :class="{'is-active': isMount}"
            :style="styles"
        )
            .b-overlay(
                :class="{'overlay--full': overlayFull}"
                v-on:click.stop="close"
            )
            slot
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator'
import modal from '../../js/mixins/components/blanks/modal';


@Component
export default class Modal extends Mixins(modal) {
    @Prop() readonly overlayFull!: boolean
}

</script>
