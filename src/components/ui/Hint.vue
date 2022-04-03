<template lang="pug" functional>
    icon-base-component.b-hint(
        name="question-fill"
        tag="button"
        :class="[data.staticClass,`hint--size-${props.size || 'm'}`, data.class]"
        v-on="listeners.click ? { click: listeners.click } : null"
    )

</template>
