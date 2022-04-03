<template lang="pug">
    component.b-link(
        :is="tag"
        :class="classes"
        v-on="events"
        v-bind="attrs"
    )
        span
            slot
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {LinkSize, LinkUnderline, LinkView, LinkIconPosition, LinkTag} from "../../js/types/components/ui/link";
import getOptionsByTag from "../../js/utils/default/getOptionsByTag";

export interface ILinkProps {
    href: string
    tag?: LinkTag
    size?: LinkSize
    view?: LinkView
    underline?: LinkUnderline
    icon?: LinkIconPosition
    disabled?: boolean | string
}

@Component
export default class Link extends Vue {
    @Prop() readonly href!: ILinkProps['href']
    @Prop({ default: 'router-link' }) readonly tag!: ILinkProps['tag']
    @Prop({ default: 'm' }) readonly size!: ILinkProps['size']
    @Prop({ default: 'interactive' }) readonly view!: ILinkProps['view']
    @Prop({ default: 'solid' }) readonly underline!: ILinkProps['underline']
    @Prop() readonly icon!:  ILinkProps['icon']
    @Prop() readonly disabled!: ILinkProps['disabled']


    get notLinkTags(){
        return !['router-link', 'a'].includes(this.tag!)
    }

    get isDisabled () {
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    get classes() {
        const classes = [
            `link--view-${this.view}`,
            `link--size-${this.size}`,
        ]

        if(this.underline) {
            classes.push(`link--underline-${this.underline}`)
        }
        if(this.icon) {
            classes.push(`link--icon link--icon-${this.icon}`)
        }
        if(this.isDisabled) {
            classes.push(`is-disabled`)
        }

        return classes
    }

    get attrs(){
        return {
            ...this.tag === 'a' && getOptionsByTag('a', this.href),
            ...this.tag === 'button' && getOptionsByTag('button'),
            ...this.tag === 'router-link' && getOptionsByTag('router-link', this.href)
        }
    }

    get events() {
        return {
            ...!this.isDisabled && {
                ...this.notLinkTags && {
                    click: (e: Event) => this.$emit('click', e)
                },
                mouseenter: (e: Event) =>  this.$emit('mouseenter', e),
                mouseleave: (e: Event) =>  this.$emit('mouseleave', e),
            }
        }
    }
}

</script>
