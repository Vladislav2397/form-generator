<template lang="pug">

card-component.b-card-attachment(
    :interactive="false"
)
    .__content
        .__status
            icon-file-component(
                status="placeholder"
            )
        .__skeletons.skeleton-animation
            .__name
                skeleton-text-component(
                    size="s"
                    :widthRange="[0.2, 0.3]"
                )
            .__information
                skeleton-text-component(
                    size="xs"
                    view="secondary"
                    :widthRange="[0.1, 0.2]"
                )
        spinner-component.__button(
            size="s"
        )

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import { getIconSvg } from '../../../js/utils/service/getResources'
import IconFile from '../icons/IconFile.vue'

@Component({
    components: {
        'icon-file-component': IconFile
    },
})
export default class SkeletonCardInfo extends Vue {
    getIconSvg = getIconSvg
}

</script>
