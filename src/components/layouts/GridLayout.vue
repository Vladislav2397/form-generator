<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'

import GridRowLayout from './GridRowLayout.vue'

export type ColorSpace =
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'pink'
    | 'blue'
    | 'cobalt'
    | 'purple'
    | 'gray'
    | 'brown'
    | 'black'


@Component({
    components: {
        'grid-row-layout-component': GridRowLayout
    }
})
export default class GridLayout extends Vue {
    @Prop() readonly layout!: GridRowLayout['layout'][]
    @Prop() readonly spacing!: [ vertical: ColorSpace, horizontal: number | string]

    // TODO Условия если пропсы одинаковые и цветные
    get gap(): [ vertical: ColorSpace, horizontal: number | string] {
        return [ this.spacing[0], +(this.spacing[1]) ]
    }

    getCorrectLayout() {
        const filteredSlots = this.$slots.default?.filter(slot => slot.tag) ?? []
        const totalLayoutItems = this.layout.reduce((total, layouts) => total + layouts.length, 0)
        const slotsCount = filteredSlots.length
        const deltaLayouts = slotsCount - totalLayoutItems

        return deltaLayouts > 0 ? [
            ...this.layout,
            ...filteredSlots.slice(totalLayoutItems).map(() => ['auto'])
        ] : this.layout
    }

    render(h: CreateElement): VNode {
        const filteredSlots = this.$slots.default?.filter(slot => slot.tag) ?? []
        let slotPosition = 0

        const children: VNode[] = []

        this.getCorrectLayout().forEach((rows, index) => {
            const slotChildren =
                filteredSlots &&
                filteredSlots.slice(
                    slotPosition, slotPosition + rows.length
                )

            slotPosition += rows.length
            let dataSpace = null

            for (let i = 0; i < slotChildren.length; i++) {
                const child = slotChildren[i];
                if(child.data?.attrs && child.data.attrs['data-space']) {
                    dataSpace = child.data.attrs['data-space'];
                    break;
                }
            }

            if(slotChildren.length) {
                const row = h(
                    'grid-row-layout-component',
                    {
                        class: ['grid-layout__item', `grid-layout__item--space-${dataSpace || this.gap[0]}`],
                        props: {
                            layout: rows,
                            spacing: this.gap[1],
                        }
                    },
                    slotChildren)
                children.push(row)
            }

            const scopedSlot = this.$scopedSlots[`index-${index}`]  as unknown as ({elementClass: string}) => VNode

            if(scopedSlot) {

                const scopedSlots = scopedSlot({elementClass: ['grid-layout__item']}) ?? []

                const scopedChild = scopedSlots[0]

                scopedChild?.data?.class.push(`grid-layout__item--space-${((scopedChild?.data?.attrs ?? {})['data-space']) || this.gap[0]}`)
                delete (scopedChild?.data?.attrs ?? {})['data-space']
                children.push(scopedChild)
            }

        })

        return h('div', {
            class: 'grid-layout',
        }, children)
    }
}
</script>
