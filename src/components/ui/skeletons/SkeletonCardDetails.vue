<template functional lang="pug">
    card-component.b-card-details
        .__title
            skeleton-text-component(
                :widthRange="[0.4, 0.7]"
                size="xs"
            )
        .__list
            .__item.--skeleton(
                v-for="_ in 2"
            )
                skeleton-text-component(
                    size="xs"
                    view="secondary"
                )
                skeleton-text-component(
                    size="xs"
                )
</template>
