<template lang="pug">
    main.b-layout
        .__slot.container
            slot
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'


@Component
export default class Layout extends Vue {
}

</script>
