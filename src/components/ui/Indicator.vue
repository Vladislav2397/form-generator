<template lang="pug" functional>
    i.b-indicator(
        :class="[`indicator--view-${props.view}`, data.staticClass]"
    ) ●
</template>
