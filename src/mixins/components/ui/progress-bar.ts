import { Component, Vue, Prop, Inject } from 'vue-property-decorator'

import { ProgressBarSize, ProgressBarView } from '../../../types/components/ui/progress-bar'
import { DeviceProviderValue } from '../../../providers/device'

export interface IProgressBarProps {
    stepsNames: string[]
    value: number[]
    view?: ProgressBarView
    size?: ProgressBarSize
    showDescription?: boolean
    description?: string
}

@Component
export default class ProgressBarMixin extends Vue {
    @Prop({ default: 'brand' }) readonly view!: IProgressBarProps['view']
    @Prop({ default: 'm' }) readonly size!: IProgressBarProps['size']

    @Inject('$device') $device!: DeviceProviderValue

    get classes() {
        return [`progress-bar--view-${this.view}`, `progress-bar--size-${this.size}`]
    }
}
