<template lang="pug">
    card-component.b-card-info(
        :interactive="false"
    )
        .__content.skeleton-animation
            spinner-component.__loader(
                size="s"
            )
            .__skeletons
                .__section.--left.--skeleton
                    skeleton-text-component.__skeleton.--title(
                        size="s"
                        :widthRange="[0.5, 0.9]"
                    )
                .__section.--right.--skeleton(
                    v-if="items && ~items.indexOf('label')"
                )
                    skeleton-text-component.__skeleton.--label(
                        view="secondary"
                        size="xs"
                        :widthRange="[0.5, 1]"
                    )
            .__bottom(
                v-if="items && (~items.indexOf('promo') || ~items.indexOf('description'))"
            )
                skeleton-text-component.__skeleton.--promo(
                    v-if="~items.indexOf('promo')"
                    view="success"
                    size="xs"
                    :widthRange="[0.3, 0.6]"
                )
                skeleton-text-component.__skeleton.--description(
                    v-if="~items.indexOf('description')"
                    view="secondary"
                    size="xs"
                    :widthRange="[0.3, 0.6]"
                )

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class SkeletonCardInfo extends Vue {
    @Prop() readonly items!: ('label' | 'promo' | 'description')[]
}

</script>
