<template lang="pug" functional>
    component.b-icon-base(
        :is="props.tag || 'i'"
        :class="[data.staticClass,`icon-base--${props.name || 'placeholder'}`, data.class]"
        :role="data.attrs && data.attrs.role"
        :type="data.attrs && data.attrs.type"
        :ref="data.ref"
        :disabled="props.tag === 'button' && typeof props.disabled !== 'undefined' && props.disabled !== false"
        v-on="listeners.click ? { click: listeners.click } : null"
    )
</template>
