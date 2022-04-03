<template lang="pug">

    card-component.b-card-attachment(
        :border-style="borderStyle"
        :background="background"
        :view="cardView"
        @dragenter="onDragEnter"
        @drop="onDrop"
        @click="onClick"
    )
        input.__value(
            v-if="isActiveInput"
            ref="input"
            type="file"
            :disabled="isDisabledInput"
            @change="processFile"
        )
        .__content
            icon-file-component.__status(
                :status="status"
            )
            .__name {{ name }}
            transition(
                name="fade"
                mode="out-in"
            )
                .__information(
                    :key="information"
                    :class="`card-attachment__information--${ isErrorSend ? 'critical' : 'secondary'}`"
                ) {{ information }}
            icon-base-component.__button.is-disabled(
                ref="icon"
                :name="iconName"
            )

</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, PropSync, Ref, Vue} from 'vue-property-decorator'

import IconFile from "../icons/IconFile.vue"
import {Document} from "../../../js/types/utils/form"
import {CardBackground, CardBorderStyle, CardView} from "../../../js/types/components/ui/card"
import {IconName} from "../../../js/types/components/ui/icon"
import {DeviceProviderValue} from "../../../js/providers/device"
import {ContextMenuOption} from "../../../js/vue-utils/context-menu"

enum statuses {
    DEFAULT = 'default',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}

export interface ICardAttachmentProps {
    value: Document['value']
    name: Document['title']
    error?: Document['error']
    errorText?: string
    progress?: Document['progress']
    context?: Document['context']
    placeholder?: string
    disabled?: boolean | string
    actions?: ('download' | 'update' | 'delete')[]

}

@Component({
    components: {
        'icon-file-component': IconFile
    }
})
export default class CardAttachment extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Prop({
        required: true
    }) readonly value!: ICardAttachmentProps['value']

    @Prop({
        required: true
    }) readonly name!: ICardAttachmentProps['name']

    @Prop() readonly progress!: ICardAttachmentProps['progress']
    @Prop() readonly disabled!: ICardAttachmentProps['disabled']
    @Prop() readonly context!: ICardAttachmentProps['context']
    @Prop() readonly errorText!: ICardAttachmentProps['errorText']
    @Prop() readonly placeholder!: ICardAttachmentProps['placeholder']
    @Prop({default: ['download', 'update', 'delete']}) readonly actions!: ICardAttachmentProps['actions']

    @PropSync('error') errorSync!: ICardAttachmentProps['error']

    @Ref('input') readonly inputRef!: HTMLInputElement
    @Ref('icon') readonly iconRef!: Element

    @Emit('upload')
    uploadEmit(file: File) {
        return file
    }

    @Emit('abortLoading')
    abortLoading() {
        console.log('abort')
    }

    @Emit('delete') deleteEmit() {/**/}
    @Emit('download') downloadEmit() {/**/}
    @Emit('update') updateEmit(file: File) {/**/}

    isChanged = false


    mapActions: Record<string, ContextMenuOption> = {
        download: {
            name: 'Скачать',
            callback: this.download,
            icon: 'save'
        },
        update: {
            name: 'Заменить',
            callback: this.update,
            icon: 'update'
        },
        delete: {
            name: 'Удалить',
            callback: this.delete,
            icon: 'trash'
        }
    }

    get isActiveInput() {
        return ![statuses.LOADED, statuses.LOADING].includes(this.status) ||
            this.isChanged
    }

    processFile(e: InputEvent){
        const input = e.target as HTMLInputElement

        if (input && input.files) {
            if (this.value) {
                this.updateEmit(input.files[0])
            } else {
                this.uploadEmit(input.files[0])
            }
        }
    }

    onClick() {
        switch (this.status) {
            case statuses.ERROR:
                this.clear()
                break
            case statuses.LOADED:
                if(this.menu.length > 1){
                    this.$contextMenu(this.iconRef, this.menu)
                } else {
                    this.menu[0].callback()
                }

                break
            case statuses.LOADING:
                this.abortLoading()
                this.clear()
                break
            default:
                break
        }
    }

    onDragEnter(){
        this.clear()
        switch(this.status) {
            case statuses.ERROR:
                this.clear()
                break;
            default:
                break;
        }
    }

    onDrop(){
        switch(this.status) {
            case statuses.LOADING:
                this.abortLoading()
                this.clear()
                break;
            default:
                break;
        }
    }

    clear(){
        if(this.inputRef) {
            this.inputRef.value = ''
        }

        this.clearError()
    }

    clearError (){
        this.errorSync = false
    }

    download(){
        console.log('download')
        this.downloadEmit()
    }

    update(){
        this.isChanged = true

        this.$nextTick(() => {
            console.log(this.inputRef)
            this.inputRef.click()
            this.isChanged = false
        })
    }

    delete(){
        this.deleteEmit()
    }

    get iconName(){
        let iconLoaded: IconName = 'menu'

        if(this.menu.length === 1 && this.menu[0].icon){
            iconLoaded = this.menu[0].icon
        }


        const mapIcons = {
            [statuses.DEFAULT]: 'plus',
            [statuses.LOADING]: 'close',
            [statuses.LOADED]: iconLoaded,
            [statuses.ERROR]: 'plus',
        } as Record<statuses, IconName>

        return mapIcons[this.status]
    }

    get information(){
        if(this.status === statuses.ERROR) {
            if(!this.isErrorSend) {
                return this.localPlaceholder
            }

            return this.errorText
        }

        if(this.status === statuses.LOADING){
            return `Загрузка ${this.progress}%`
        }

        if(this.status === statuses.LOADED){
            return this.context?.fileName || 'Загружен'
        }

        return this.localPlaceholder
    }

    get cardView(): CardView{
        return this.status === statuses.ERROR ? 'critical' : 'base'
    }

    get borderStyle(): CardBorderStyle{
        return this.status === statuses.DEFAULT ? 'dashed' : 'solid'
    }

    get background(): CardBackground{
        return [statuses.ERROR, statuses.DEFAULT].includes(this.status) ? 'base' : 'surface'
    }

    get isDisabled() {
        return typeof this.disabled !== 'undefined' && this.disabled !== false
    }

    get isDisabledInput(){
        return ([statuses.LOADED, statuses.LOADING].includes(this.status) && !this.isChanged) || this.isDisabled
    }

    get status(): statuses {
        if(this.value || (this.progress === 100 && this.value)) {
            return statuses.LOADED
        }

        if(this.progress){
            return statuses.LOADING
        }

        if(this.errorSync){
            return statuses.ERROR
        }

        return statuses.DEFAULT
    }

    get defaultPlaceholder(){
        return this.$device.size.desktop ? 'Нажмите на карточку или перетащите\u00A0файл' : 'Нажмите на карточку'
    }

    get localPlaceholder(){
        return this.placeholder || this.defaultPlaceholder
    }

    get isErrorSend(){
        return this.inputRef && this.inputRef.value
    }

    get menu(): ContextMenuOption[]{
        return this.actions!.reduce<ContextMenuOption[]>((total, action) => [
            ...total,
            this.mapActions[action],
        ], [])
    }

    statuses = statuses
}

</script>
