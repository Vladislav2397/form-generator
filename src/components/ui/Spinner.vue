<template lang="pug">
    .b-spinner(
        :class="`spinner--size-${size}`"
    )
        img.lazyload(
            v-if="$IE === 9"
            data-src="/images/utility/loader.gif"
            alt="Загрузка"
        )
        svg(
            v-else
            v-bind="svgAttrs"
        )
            defs
                linearGradient(
                    :id="gradientsId.a"
                )
                    stop(offset="0%" stop-opacity="0" stop-color="currentColor")
                    stop(offset="100%" stop-opacity=".5" stop-color="currentColor")
                linearGradient(
                    :id="gradientsId.b"
                )
                    stop(offset="0%" stop-color="currentColor")
                    stop(offset="100%" stop-opacity=".5" stop-color="currentColor")
            g(stroke-width="15")
                path(
                    :stroke="`url(#${gradientsId.a})`"
                    d="M15 100a85 85 0 0 1 170 0"
                )
                path(
                    :stroke="`url(#${gradientsId.b})`"
                    d="M185 100a85 85 0 0 1-170 0"
                )

</template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
import {IEProviderValue} from "../../js/providers/ie";
import {SpinnerView, SpinnerSize} from "../../js/types/components/ui/spinner";

export interface ISpinnerProps {
    view: SpinnerView
    size: SpinnerSize
}

@Component
export default class Spinner extends Vue {
    @Prop({default: 'system'}) readonly view!: ISpinnerProps['view']
    @Prop({default: 'm'}) readonly size!: ISpinnerProps['size']

    @Inject('$IE') $IE!: IEProviderValue

    get svgAttrs(){
        const mapColors = {
            system: 'rgba(138, 146, 168, 1)',
            base: 'rgba(255,255,255,1)',
            brand: 'rgba(0, 85, 255, 1)',
            success: 'rgba(121, 167, 74, 1)',
            critical: 'rgba(229, 84, 71, 1)',
            warning: 'rgba(249, 168, 53, 1)',
        } as  Record<SpinnerView, string>

        return {
            color: mapColors[this.view],
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: `0 0 200 200`,
            width: "200",
            height: "200",
        }
    }

    get gradientsId() {
        return {
            a: `spinner-${this.view}-a`,
            b: `spinner-${this.view}-b`
        }
    }

}

</script>
