<template lang="pug">
    .b-icon-file
        .__image
            img.lazyload(
                :data-src="getIconSvg('file', {view: 'other'})"
                alt="Файл"
            )
        transition(
            name="fade"
            mode="out-in"
        )
            spinner-component.__loader(
                v-if="isShowPreloader"
                size="xs"
            )
            .__decoration(
                v-else
            )
                span
        transition(
            name="fade"
            mode="out-in"
        )
            .__status(
                v-if="isShowStatus"
                :class="`icon-file__status--${status}`"
            )
                icon-base-component.__icon(
                    v-if="status !== 'placeholder'"
                    :name="iconName"
                )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import { getIconSvg } from '../../../js/utils/service/getResources'
import {IconFileStatus} from "../../../js/types/components/ui/icons/icon-file";
import {IconName} from "../../../js/types/components/ui/icon";

export interface IIconFileProps {
    status: IconFileStatus
}

@Component
export default class IconFile extends Vue {
    @Prop() readonly status!: IIconFileProps['status']

    get isShowPreloader(){
        return this.status === 'loading'
    }

    get isShowStatus(){
        return ['error', 'loaded', 'default', 'placeholder'].includes(this.status)
    }

    get iconName(){
        const mapNames = {
            error: 'close',
            loaded: 'check',
            default: 'plus',
            placeholder: 'placeholder'
        } as Record<IconFileStatus, IconName>

        return mapNames[this.status]
    }

    getIconSvg = getIconSvg
}

</script>
