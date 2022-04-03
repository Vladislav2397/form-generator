<template lang="pug">
    .b-progress-bar(
        :class="classes"
    )
        .__description(
            v-if="isShowDescription"
        )
            .__count(
                v-if="isShowStepCount"
            ) Шаг {{ activeStep }} из {{ stepsCount }}
            .__names(
                v-if="isShowStepNames"
            )
                transition(
                    name="fade"
                    mode="out-in"
                    duration="400"
                )
                    .__name.is-bold(
                        v-for="(title, index) in stepsNames"
                        :key="title"
                        v-if="stepsNames[activeStep - 1] && index + 1 === activeStep"
                    ) {{ title }}
        .__steps
            .__step(
                v-for="(step, index) in stepsCount"
                :style="{width}"
                :class="{'is-active': activeStep === step && !isComplete}"
            )
                span(
                    :style="fillStyles[index]"
                )
</template>

<script lang="ts">
import {Component, Prop, Mixins, Watch} from 'vue-property-decorator'
import progressBar, {IProgressBarProps} from "../../js/mixins/components/ui/progress-bar"
import {Maybe} from "../../js/types/utils/other";


@Component
export default class ProgressBar extends Mixins(progressBar) {
    @Prop() readonly stepsNames!: IProgressBarProps['stepsNames']
    @Prop() readonly value!: IProgressBarProps['value']
    @Prop({default: true}) readonly showDescription!: IProgressBarProps['showDescription']
    @Prop() readonly description!: IProgressBarProps['description']

    delayForStep = 350

    delayedStep: Maybe<number> = null

    timeout = {} as  ReturnType<typeof setTimeout>

    setDelayStep(currentStep: number) {
        clearTimeout(this.timeout)
        this.delayedStep = currentStep

        this.timeout = setTimeout(()=>{
            this.delayedStep = null
        }, this.delayForStep)
    }

    get isShowStepCount(){
        return !(this.$device.size.mobile || this.$device.size.tablet) && this.stepsCount > 1
    }

    get isShowStepNames(){
        return this.stepsNames && this.stepsNames.length > 0
    }

    get isShowDescription() {
        return this.showDescription && (this.isShowStepCount || this.isShowStepNames)
    }

    get isComplete(){
        return this.value.every(item => item >= 1);
    }

    get activeStep(){
        const reverseValue = [...this.value].reverse();
        const activeIndex = this.value.length - reverseValue.findIndex(item => item > 0 && item <= 1)
        return this.isComplete ? this.value.length : activeIndex
    }

    get width() {
        return this.stepsCount > 1 ? `calc((100% - (0.333rem * ${this.stepsCount - 1})) / ${this.stepsCount})` : null
    }

    get fillStyles(){
        return this.value.map((item,index) => {

            const itemPrev = this.value[index - 1]

            let normalizedValue = item > 1 ? 1 : item

            if(itemPrev && itemPrev < 1){
                normalizedValue = 0
            }

            return {
                width: `${normalizedValue*100}%`,
                opacity: normalizedValue === 0 ? 0 : 1,
                transition: this.delayedStep === index + 1 ? `width 0.3s linear ${this.delayForStep/1000}s, min-width 0.3s linear ${this.delayForStep/1000}s, opacity 0.233s ease ${this.delayForStep/1000}s, background-color 0.3s ease, border-color 0.3s ease` : null
            }
        })
    }

    get stepsCount(){
        return this.value.length
    }



    @Watch('activeStep')
    onWatchActiveStep(newValue){
        this.setDelayStep(newValue)
    }



    beforeDestroy() {
        clearTimeout(this.timeout)
    }
}

</script>
