<template functional lang="pug">
    .b-modal-desktop-content(
        :class="[data.staticClass, {'modal-desktop-content--clear-bottom-border-radius' : props.clearBottomRadius}, data.class]"

    )
        .__wrapper
            .__content
                slot
</template>
