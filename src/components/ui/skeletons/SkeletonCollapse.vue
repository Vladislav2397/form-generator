<template lang="pug">
    .b-collapse.skeleton-animation
        .__head
            skeleton-text-component(
                :widthRange="[0.2, 0.5]"
            )
            spinner-component.__icon
        divider-component.__divider(
            view="secondary"
        )

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class SkeletonCollapse extends Vue {

}

</script>
