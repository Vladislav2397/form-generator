<template lang="pug">
    .b-icon-status(
        :class="classes"
    )
        .__wrapper
            icon-base-component.__icon(
                :name="iconDefault"
            )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {IconStatusSize, IconStatusView} from "../../../js/types/components/ui/icons/icon-status";
import {IconName} from "../../../js/types/components/ui/icon";

export interface IIconStatusProps {
    view?: IconStatusView
    size?: IconStatusSize
    icon?: IconName
}

@Component
export default class IconStatus extends Vue {
    @Prop({default: 'm'}) readonly size!: IIconStatusProps['size']
    @Prop({default: 'system'}) readonly view!: IIconStatusProps['view']
    @Prop() readonly icon!: IIconStatusProps['icon']


    get iconDefault(){
        const mapIcons = {
            system: 'search',
            warning: 'warning',
            critical: 'close',
            success: 'check',
        }


        return this.icon || mapIcons[this.view!]
    }

    get classes() {
        return [`icon-status--view-${this.view}`, `icon-status--size-${this.size}`]
    }
}

</script>
