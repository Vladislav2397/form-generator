<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {
    CardBackground,
    CardBorderStyle,
    CardSize,
    CardTag,
    CardView
} from "../../../types/components/ui/card"

export interface ICardProps {
    view?: CardView
    size?: CardSize
    interactive?: boolean
    disabled?: boolean
    tag?: CardTag
    href?: string
    borderStyle?: CardBorderStyle
    background?: CardBackground
}

@Component
export default class CardMixin extends Vue {
    @Prop({ default: 'base' }) readonly view!: ICardProps['view']
    @Prop({ default: 'l' }) readonly size!: ICardProps['size']
    @Prop({ default: true }) readonly interactive!: ICardProps['interactive']
    @Prop() readonly disabled!: ICardProps['disabled']
    @Prop({default: 'div'}) readonly tag!: ICardProps['tag']
    @Prop() readonly href!: ICardProps['href']
    @Prop({default: 'solid'}) readonly borderStyle!: ICardProps['borderStyle']
    @Prop({default: 'surface'}) readonly background!: ICardProps['background']

    get attrs() {
        return {
            view: this.view,
            interactive: this.interactive,
            disabled: this.disabled,
            tag: this.tag,
            href: this.href,
            borderStyle: this.borderStyle,
            background: this.background,
        }
    }
}

</script>
