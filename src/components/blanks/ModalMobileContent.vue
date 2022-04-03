<template functional lang="pug">
    .b-modal-mobile-content(
        :class="[data.staticClass, data.class]"
    )
        .__wrapper
            .__slot
                slot
</template>
