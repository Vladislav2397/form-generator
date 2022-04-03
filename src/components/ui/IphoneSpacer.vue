<script lang="ts">
import {Component} from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { VueFunctional } from "../../js/vue-utils/functional-component";

@Component
export default class IphoneSpacer extends VueFunctional {
    render (createElement: CreateElement) {
        const detectIphone = () => {
            const resX = window.screen.height === 812 && window.screen.width === 375 && window.devicePixelRatio === 3

            const resXSMax = window.screen.height === 896 && window.screen.width === 414 && window.devicePixelRatio === 3

            const resXr = window.screen.height === 896 && window.screen.width === 414 && window.devicePixelRatio === 2

            return (resX || resXSMax || resXr) && window.innerWidth < window.innerHeight
        }

        const settings = {
            class: 'iphone-spacer',
        }
        return detectIphone() ? createElement('div', settings) : null
    }
}

</script>
