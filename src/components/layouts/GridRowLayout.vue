<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import remFromPx from '@/utils/default/getRems'

type layoutTypes = 'px' | 'rem' | '%' | 'auto'
type layoutPropSizeItem = 'auto' | `${number}${Exclude<layoutTypes, 'auto'>}`
type layoutSizeItem = { count: string | number, type: layoutTypes, fullType: string }
type layoutCorrectSizeItem = { count: string | number, type: Exclude<layoutTypes, 'px'>, fullType: string }

@Component
export default class GridRowLayout extends Vue {
    @Prop() readonly layout!: layoutPropSizeItem[]
    @Prop({ default: '12' }) readonly spacing!: string | number

    get gap() {
        return +(this.spacing)
    }

    get formattedLayout(): layoutCorrectSizeItem[] {
        // @ts-ignore
        return this.layout.map(size => {
            const formattedItem = this.layoutItemInfo(size)

            if (formattedItem.type === 'px') {
                const count = remFromPx(formattedItem.count)

                return {
                    count,
                    type: 'rem',
                    fullType: `${count}rem`
                }
            }

            return formattedItem
        })
    }

    layoutItemInfo(layoutItem: layoutPropSizeItem): layoutSizeItem {
        const result = /((?<count>[\d.]+)(?<type>\D+))/.exec(layoutItem)

        if (result?.groups) {
            return {
                count: result?.groups?.count as string,
                type: result?.groups?.type as Exclude<layoutTypes, 'px'>,
                fullType: `${result?.groups?.count}${result?.groups?.type}`
            }
        }
        return {
            count: 0,
            type: 'auto',
            fullType: 'auto'
        }
    }

    get filteredLayout() {
        const rems: layoutSizeItem[] = []
        const percents: layoutSizeItem[] = []
        const autos: layoutSizeItem[] = []

        this.formattedLayout.forEach(item => {
            if (item.type === 'rem') {
                rems.push(item)
            }
            else if (item.type === '%') {
                percents.push(item)
            }
            else if (item.type === 'auto') {
                autos.push(item)
            }
        })

        return {
            rems,
            percents,
            autos,
        }
    }

    get isSingle() {
        return this.layout.length === 1
    }

    get isOnlyAutosizeLayoutSize() {
        return (this.filteredLayout.autos.length === this.layout.length) ||
            (this.filteredLayout.percents.length === this.layout.length)
    }

    correctWidthByLayoutType(layoutSize: layoutCorrectSizeItem) {
        if (layoutSize.type === 'auto' && this.isOnlyAutosizeLayoutSize) {
            return `${1 / this.layout.length * 100}%`
        }

        if (layoutSize.type === 'auto') {
            const union = [
                ...this.filteredLayout.percents,
                ...this.filteredLayout.rems
            ].map(item => item.fullType)

            const autosLength = this.filteredLayout.autos.length

            const additionGap = autosLength > 1
                ? (union.length + (autosLength - 1)) * this.gap
                : union.length * this.gap

            return `calc((100% - ${
                union.join(' - ')
            } - ${
                remFromPx(additionGap)
            }rem) / ${
                autosLength
            })`
        }

        return layoutSize.fullType
    }

    get halfGap() {
        return remFromPx(+(this.spacing) / 2)
    }

    render(h: CreateElement): VNode {
        const children: VNode[] = []

        let itemIterator = 0

        this.formattedLayout.forEach((size, index) => {
            const item = h(
                'div',
                {
                    class: {
                        'grid-row-layout__item': true,
                        'grid-row-layout__item--first': index === 0 && !this.isSingle,
                        'grid-row-layout__item--last':index === this.layout.length - 1 && !this.isSingle,
                        'grid-row-layout__item--single': this.isSingle,
                    },
                    style: {
                        width: this.correctWidthByLayoutType(size),
                        'box-sizing': this.isOnlyAutosizeLayoutSize && 'border-box',
                    }
                },
                [this.$slots?.default && this.$slots?.default[itemIterator]]
            )

            itemIterator += 1

            children.push(item)
        })

        return h(
            'div',
            {
                class: 'grid-row-layout',
                style: `--row-gap: ${this.halfGap}rem`
            },
            children
        )
    }
}
</script>
