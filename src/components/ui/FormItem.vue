<script lang="ts">
import { CreateElement, VNode } from "vue";
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { FormItemSize, FormItemView, FormItemCursor, FormItemTag } from "@/types/components/ui/form-item";
import { IconName } from "@/types/components/ui/icon";
import formItem from '@/mixins/components/ui/form-item.vue'
import IconBase from './icons/IconBase.vue'
import Spinner from "./Spinner.vue";
import { Maybe } from "@/types/utils/other";


export interface IFormItemProps {
    size?: FormItemSize
    view?: FormItemView
    cursor?: FormItemCursor
    description?: string
    placeholder?: string
    label?: string
    errorText?: string
    disabled?: boolean | string
    error?: boolean
    iconLeft?: IconName
    iconRight?: IconName
    tag?: FormItemTag
    loading?: boolean
}

@Component
export default class FormItem extends Mixins(formItem) {
    blockName = 'form-item'

    errorAnimation = {
        show: false,
        styles: {
            duration: 100,
            options: {
                height: '0px' as Maybe<string>,
                marginTop: '0px' as Maybe<string>,
                opacity: 0
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout1
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout2

    get classes(): string[] {
        const classes = [
            this.blockName,
            `${this.blockName}--size-${this.size}`,
            `${this.blockName}--view-${this.view}`,
            `${this.blockName}--cursor-${this.cursor}`,
        ];

        if(this.isDisabled) {
            classes.push('is-disabled')
        }

        if(this.errorSync) {
            classes.push('is-error')
        }

        if(this.iconLeft || this.iconRight)  {
            classes.push(`${this.blockName}--icon`)

            if(this.iconLeft) {
                classes.push(`${this.blockName}--icon-left`)
            }

            if (this.iconRight) {
                classes.push(`${this.blockName}--icon-right`)
            }
        }

        return classes
    }

    get isDisabled(){
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    @Watch('error')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChangeError(newValue){
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout2)
        if(newValue) {
            this.errorAnimation.show = true
            requestAnimationFrame(() => {
                this.errorAnimation.styles.options.height = null
                this.errorAnimation.styles.options.marginTop = null
            })
            this.timeout1 = setTimeout(()=>{
                this.errorAnimation.styles.options.opacity = 1
            }, this.errorAnimation.styles.duration)

        } else {
            this.errorAnimation.styles.options.opacity = 0
            this.timeout1 = setTimeout(()=>{
                this.errorAnimation.styles.options.height = '0px'
                this.errorAnimation.styles.options.marginTop = '0px'
            }, this.errorAnimation.styles.duration)

            this.timeout2 = setTimeout(()=>{
                this.errorAnimation.show = false
            }, this.errorAnimation.styles.duration * 2)
        }

    }

    beforeDestroy(){
        this.errorAnimation.show = false
    }

    content(createElement: CreateElement):VNode {
        const children: VNode [] = []

        let element

        if(this.$scopedSlots.default) {
            const slot = this.$scopedSlots.default({ blockClass: this.blockName, elementClass: `${this.blockName}__element`}) as unknown as VNode
            children.push(slot)
        }  else {

            const valueChildren: VNode [] = []


            const placeholder = this.placeholder ? createElement(
                'div',
                {
                    class: `${this.blockName}__placeholder`
                },
                this.placeholder
            ) : null


            element = createElement(
                'div',
                {
                    class: `${this.blockName}__element`
                },
            )

            if(this.$scopedSlots.tags) {
                const slot = this.$scopedSlots.tags({ blockClass: this.blockName, elementClass: `${this.blockName}__tags`}) as unknown as VNode
                valueChildren.push(slot)
            } else if (placeholder) {
                valueChildren.push(placeholder)
            }

            const value = createElement(
                'div',
                {
                    class: `${this.blockName}__value`
                },
                valueChildren
            )

            children.push(value)
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        children.push(element)


        if(this.iconLeft) {
            children.push(
                createElement(IconBase, {
                    class: [`${this.blockName}__icon`, `${this.blockName}__icon--left`],
                    props: {
                        name: this.iconLeft,
                    },
                })
            )
        }

        if(this.loading || this.iconRight) {

            const transitionChildren:VNode[] = []

            if(this.loading){
                transitionChildren.push(
                    createElement(
                        Spinner,
                        {
                            class: [`${this.blockName}__preloader`],
                            key: 'loader',
                            props: {
                                size: 's',
                            }
                        }
                    )
                )
            } else if(this.iconRight) {
                transitionChildren.push(createElement(
                    IconBase,
                    {
                        key: this.iconRight,
                        class: [`${this.blockName}__icon`, `${this.blockName}__icon--right`],
                        props: {
                            name: this.iconRight,
                            tag: this.$listeners.clickIcon ? 'button' : 'i'
                        },
                        attrs: {
                            role: 'button',
                            type: 'button'
                        },
                        on: {
                            click: (e: Event) => this.$emit('clickIcon', e),
                        },
                    }
                ))
            }

            const transition = createElement(
                'transition',
                {
                    props: {
                        name: 'fade',
                        mode: 'out-in',
                        appear: true
                    }
                },
                transitionChildren
            )


            children.push(transition)

        }

        if(this.$slots.options){
            children.push(...this.$slots.options)
        }

        return createElement(
            'div',
            {
                class: 'form-item__content',
                on: {
                    click: (e: Event) => this.$emit('click', e),
                }
            },
            children
        )
    }

    template(createElement: CreateElement):VNode[] {
        const layout:VNode[] = [];

        const content = this.content(createElement)

        const label = createElement(
            'div',
            {
                class: 'form-item__text form-item__text--label'
            },
            this.label
        )

        if(this.label) {
            layout.push(label)
        }

        layout.push(content)

        if(this.description || this.errorText) {

            let description

            if(this.errorText && this.errorAnimation.show) {
                description = createElement(
                    'div',

                    {
                        style: this.errorAnimation.styles.options,
                        class: 'form-item__text form-item__text--description form-item__text--error'
                    },
                    this.errorText
                )
            }

            if( this.description) {
                description = createElement(
                    'div',
                    {
                        class: 'form-item__text form-item__text--description'
                    },
                    this.description
                )

            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            layout.push(description)
        }

        if(this.$scopedSlots.append) {
            const slot = this.$scopedSlots.append({ blockClass: this.blockName, elementClass: `${this.blockName}__append`}) as unknown as VNode
            layout.push(slot)
        }



        return layout
    }

    render(createElement: CreateElement): VNode {
        const settings = {
            class: this.classes,
        }

        return createElement(this.tag, settings, this.template(createElement))
    }

}

</script>
