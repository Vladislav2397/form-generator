<template lang="pug">
    .b-signing-documents
        .__wrapper
            transition(
                name="fade"
                mode="out-in"
            )
                sign-documents-component(
                    v-if="isShowSign"
                    label="Для выпуска банковской гарантии необходимо подписать документы"
                    :documents="documents"
                    :link="link"
                    :hide-link="isHideLinkInSignDocuments"
                    :information="bankInformation"
                )
                response-component.__response(
                    v-else
                    v-bind="responseProps"
                )
                    icon-status-component(
                        icon="time"
                        size="l"
                    )

</template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
import {IResponseProps} from "../../../Response.vue";
import SignDocuments, {ISignDocumentsProps} from "../../../SignDocuments.vue";
import {Document} from "../../../../../js/types/utils/form";
import {Maybe} from "../../../../../js/types/utils/other";
import {DeviceProviderValue} from "../../../../../js/providers/device";

export interface ISigningDocumentsProps {
    documents: Maybe<Document[]>
    link: Maybe<string>
    bankInformation?: ISignDocumentsProps['information']
}

@Component({
    components: {
        'sign-documents-component': SignDocuments
    }
})
export default class SigningDocuments extends Vue {
    @Prop({ required: true }) readonly documents!: ISigningDocumentsProps['documents']
    @Prop({ required: true }) readonly link!: ISigningDocumentsProps['link']
    @Prop() readonly bankInformation!: ISigningDocumentsProps['bankInformation']

    @Inject('$device') $device!: DeviceProviderValue

    responseProps: IResponseProps = {
        title: 'Ожидание ответа банка',
        description: 'Файлы для подписания подготавливаются',
        size: 'l',
        buttons: [
            {
                text: 'Обновить',
                callback: () => this.$emit('update')
            }
        ]
    }

    isShowSign(){
        return this.documents && this.documents.length
    }

    get isHideLinkInSignDocuments(){
        return this.$device.size.desktop && !this.$device.type.mobile
    }
}

</script>
