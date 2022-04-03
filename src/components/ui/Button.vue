<script lang="ts">
/* eslint-disable */
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import {ButtonSize, ButtonTag, ButtonType, ButtonView} from "@/types/components/ui/button"
import {IconName} from "@/types/components/ui/icon"
import Spinner from "./Spinner.vue"
import IconBase from './icons/IconBase.vue'
import {SpinnerSize, SpinnerView} from "@/types/components/ui/spinner";

export interface IButtonProps {
    view?: ButtonView
    tag?: ButtonTag
    size?: ButtonSize
    icon?: IconName
    type?: ButtonType
    iconLeft?: boolean | string
    href?: string
    disabled?: boolean | string
    loading?: boolean
    media?: boolean
    ariaLabel: string
}

@Component
class Button extends Vue {
    @Prop({ default: 'brand' }) readonly view!: IButtonProps['view']
    @Prop({ default: 'button' }) readonly tag!:  IButtonProps['tag']
    @Prop({ default: 'm' }) readonly size!:  IButtonProps['size']
    @Prop({ default: 'button' }) readonly type!:  IButtonProps['type']
    @Prop() readonly icon!:  IButtonProps['icon']
    @Prop({ default: false }) readonly iconLeft!:  IButtonProps['iconLeft']
    @Prop() readonly href!:  IButtonProps['href']
    @Prop() readonly disabled!:  IButtonProps['disabled']
    @Prop() readonly loading!:  IButtonProps['loading']
    @Prop() readonly media!:  IButtonProps['media']
    @Prop({ required: true }) readonly ariaLabel!:  IButtonProps['ariaLabel']

    @Ref('button') buttonRef!: HTMLButtonElement

    width: null | string = null

    setWidth(value: string | null){
        this.width = value
    }

    get classes (): string[] {
        const classes: string[] = ['button']

        classes.push(`button--size-${this.size}`)
        classes.push(`button--view-${this.view}`)

        if (this.icon) {
            if (this.isIconLeft) {
                classes.push(`button--icon-left`)
            } else {
                classes.push(`button--icon-right`)
            }
            if(!this.isValidSlot) {
                classes.push('is-only-icon')
            }
        }

        if (this.isDisabled) {
            classes.push('is-disabled')
        }

        if (this.media) {
            classes.push('button--media')
        }

        if(this.isValidSlot){
            classes.push('button--default')
        }



        return classes
    }

    get target (): string | null {
        return this.tag === 'a' && this.href?.indexOf('tel:') === -1 && this.href.indexOf('mailto:') === -1 ? '_blank' : null
    }

    get rel (): string | null {
        return this.target === '_blank' ? 'noopener noreferrer' : null
    }

    get slot ():VNode[] | undefined {
        return this.$slots.default
    }

    get isValidSlot(){
        return this.slot && this.slot[0].text
    }

    get isDisabled () {
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    get isIconLeft () {
        return typeof this.iconLeft !== 'undefined' && this.iconLeft !== false
    }

    get spinnerSize(): SpinnerSize{
        return this.size === 's' ? 's' : 'm'
    }

    get spinnerView(): SpinnerView{

        if(this.view === 'brand'){
            return 'base'
        }

        if(this.view && ['secondary-brand', 'outline-brand', 'flat-brand'].includes(this.view)) {
            return 'brand'
        }

        if(this.view && ['critical','success','warning'].includes(this.view)){
            // @ts-ignore
            return this.view
        }

        return 'system'
    }

    @Watch('loading')
    onChangeLoading(newValue: any){
        console.log(this);
        if(newValue) {
            this.setWidth(`${this.buttonRef.getBoundingClientRect().width}px`)
        } else {
            this.setWidth(null)
        }
    }


    render (createElement: CreateElement): VNode {
        const settings = {
            class: this.classes,
            style: {
                width: this.width
            },
            attrs: {
                target: this.target,
                rel: this.rel,
                disabled: this.isDisabled,
                'aria-label': this.ariaLabel,
                type: this.type,
                ...this.tag === 'a' && {
                    href: this.href
                },
                ...this.tag === 'router-link' && {
                    to: this.href
                },
                ...this.type === 'button' && {
                    role: 'button'
                }
            },
            on: {
                click: (e: Event) => this.$emit('click', e),
            },
            ref: 'button',
        }

        const content: VNode[] = []

        if(this.loading){
            const spinnerElement = createElement(Spinner, {
                class: ['button__spinner'],
                props: {
                    size: this.spinnerSize,
                    view: this.spinnerView
                }
            })

            content.push(spinnerElement)
        } else if (this.icon) {
            const iconElement = createElement(IconBase, {
                class: ['button__icon'],
                props: {
                    name: this.icon,
                },
            })

            if (this.isIconLeft) {
                content.push(iconElement)
            }
            if(this.slot){
                content.push(...this.slot)
            }

            if (!this.isIconLeft) {
                content.push(iconElement)
            }
        } else if(this.slot){
            content.push(...this.slot)
        }

        return createElement(this.tag, settings, content)
    }
}

export default Button
</script>
