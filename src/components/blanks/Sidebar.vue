<template functional lang="pug">
    aside.b-sidebar(
        :class="[data.staticClass, data.class, `sidebar--background-${props.background || 'surface'}`, `sidebar--size-${props.size || 's'}`]"
    )
        slot
</template>
