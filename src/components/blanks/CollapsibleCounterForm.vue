<template lang="pug">
    collapse-component.b-collapsible-counter-form(
        v-model="isOpenVar"

        :title="title"
        :badgeContent="badge.content"
        :badgeView="badge.view"
    )
        slot

</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue, Watch} from 'vue-property-decorator'

import Collapse from "./Collapse.vue"

@Component({
    components: {
        'collapse-component': Collapse
    }
})
export default class CollapsibleCounterForm extends Vue {
    @Prop() readonly title!: string
    @Prop() readonly countFilled!: string | number
    @Prop() readonly countAll!: string | number
    @Prop() readonly error!: boolean

    @PropSync('isOpen') isOpenSync!: boolean

    isOpenLocal = false

    get isOpenVar() {
        if (typeof this.isOpenSync !== 'undefined') {
            return this.isOpenSync
        }
        return this.isOpenLocal
    }

    set isOpenVar(value) {
        if (typeof this.isOpenSync !== 'undefined') {
            this.isOpenSync = value
        }
        this.isOpenLocal = value
    }

    get badge(){
        return {
            ...(this.countFilled || this.countAll) && {
                content: `${this.countFilled} из ${this.countAll}`,
            },
            ...this.error && this.countFilled !== this.countAll ? {
                view: 'critical'
            } : {
                view: this.countFilled === this.countAll ?  'success' : 'system'
            }
        }
    }

    @Watch('countFilled')
    onChangeCountFilled(newValue){
        if(newValue === this.countAll) {
            this.$emit('update:error', false)
        }
    }
}

</script>
