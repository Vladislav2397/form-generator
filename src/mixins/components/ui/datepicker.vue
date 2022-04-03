<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from 'vue-property-decorator'
import {onKeydown} from "@/utils/default/keydown"


@Component
export default class DatepickerMixin extends Vue {
    @Prop({default: 'left'}) readonly position!: 'left' | 'right'
    @Ref('datepicker') readonly datepickerRef!: Vue

    datepickerActive = false
    isBottomPosition = true

    onKeyDown(e: KeyboardEvent) {
        onKeydown(e, [
            {
                key: 'enter',
                callback: this.hideDatepicker
            },
            {
                key: 'esc',
                callback: this.hideDatepicker
            }
        ])
    }

    hideDatepicker() {
        this.datepickerActive = false
        this.isBottomPosition = true
    }

    showDatepicker() {
        if(!this.datepickerActive) {
            this.datepickerActive = true
            this.setPosition()
        }
    }

    setPosition(){
        this.$nextTick(() => {
            const rect = this.datepickerRef.$el.getBoundingClientRect()
            this.isBottomPosition = rect.top + rect.height + 10 < window.innerHeight
            console.log(this.isBottomPosition)
        })
    }

    addEvents() {
        document.addEventListener('keydown', this.onKeyDown, {passive: true})
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeyDown)
    }

    beforeDestroy() {
        this.removeEvents()
    }

    @Watch('datepickerActive')
    onChangeActive(newValue: string) {
        if(newValue) {
            this.addEvents()
        } else {
            this.removeEvents()
        }
    }

    get datepickerClasses(){
        const classes = [`input__datepicker--position-horizontal-${this.position}`]

        classes.push(this.isBottomPosition ? 'input__datepicker--position-vertical-bottom' : 'input__datepicker--position-vertical-top')

        return classes
    }
}

</script>
