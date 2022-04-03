<template lang="pug">

.b-document-list
    .__section(
        v-for="(formContainer, sectionName, index) in formFields"
        :key="`section${index}`"
    )
        .__head
            .__left
                title-component.__title(
                    size="xs"
                ) {{ titleHeadInfo(sectionName).title }}
                tooltip-component.__tooltip
                    icon-base-component.__icon(
                        name="question-fill"
                        ref="icon"
                    )
            transition(
                name="fade"
                mode="out-in"
            )
                .__right(
                    :key="loading"
                )
                    template(
                        v-if="loading"
                    )
                        badge-component.__badge.skeleton-animation(
                            :showIndicator="false"
                        ) &nbsp;
                    template(
                        v-else
                    )
                        badge-component.__badge(
                            :showIndicator="false"
                            :view="formContainerInfo[sectionName].badgeStatus"
                        ) {{ formContainerInfo[sectionName].filled }} из {{ formContainerInfo[sectionName].count }}

        transition(
            name="fade"
            mode="out-in"
        )
            .__content(
                :key="loading"
            )
                template(
                    v-if="loading"
                )
                    skeleton-card-attachment-component.__file(
                        v-for="iterator in 2"
                        :key="iterator"
                    )
                template(
                    v-else
                )
                    card-attachment-component.__file(
                        v-for="(formFile, key) in forms(formContainer)"
                        :key="`card${key}`"
                        :error.sync="formFile.error"
                        :value="formFile.value"
                        :progress="formFile.progress"
                        :name="formFile.optionals.name"

                        @abortLoading="onAbortLoading(formFile)"
                        @upload="onUpload(formFile, $event)"
                        @update="onUpdate(formFile, $event)"
                        @download="onDownload(formFile)"
                        @delete="onDelete(formFile)"
                    )

</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'

// eslint-disable-next-line import/no-unresolved
import FormFileField from "../../js/utils/formField/formFileField"
import CardAttachment from "../ui/cards/CardAttachment.vue"
import Tooltip from "../ui/Tooltip.vue"

import SendOrderService from "../../js/services/SendOrderService"
import FormContainer from "../../js/utils/formField/formContainer"
import SkeletonCardAttachment from '../ui/skeletons/SkeletonCardAttachment.vue'


function download(dataURL, filename?) {
    const a = document.createElement("a")

    a.href = dataURL
    a.setAttribute("download", filename ?? '')
    a.click()

    return false
}

// FIXME: Refactor component
@Component({
    components: {
        'skeleton-card-attachment-component': SkeletonCardAttachment,
        'tooltip-component': Tooltip,
        'card-attachment-component': CardAttachment,
    }
})
export default class DocumentList extends Vue {
    @Prop() readonly required!: any
    @Prop() readonly optional!: any
    @Prop() readonly loading!: boolean

    @Emit('upload')
    uploadEmit(formField: FormFileField, id: number) {/**/}

    @Ref('icon') iconListRef!: HTMLDivElement[]

    sendOrderService!: SendOrderService

    companyId = '2'
    documentTypeId = '1'

    get formFields() {
        return {
            required: this.required,
            optional: this.optional,
        }
    }

    forms(formContainer: FormContainer) {
        return formContainer?.forms
    }

    get formContainerInfo() {
        const required = {
            filled: this.required?.filled() || 0,
            count: this.required?.fieldsCount() || 0,
            badgeStatus() {
                return (this.count && this.filled === this.count)
                    ? 'success' : 'system'
            }
        }

        const optional = {
            filled: this.optional?.filled() || 0,
            count: this.optional?.fieldsCount() || 0,
            badgeStatus() {
                return (this.count && this.filled === this.count)
                    ? 'success' : 'system'
            }
        }

        return {
            required: {
                filled: required.filled,
                count: required.count,
                badgeStatus: required?.badgeStatus() ?? 'system',
            },
            optional: {
                filled: optional.filled,
                count: optional.count,
                badgeStatus: optional.badgeStatus() ?? 'system',
            }
        }
    }

    async onUpload(
        formField: FormFileField,
        file: File,
    ) {
        try {
            const response = await this.sendOrderService.uploadDocument(
                {
                    file,
                    ...formField.optionals.documentGroup === 'company' ? {
                        company_id: this.companyId,
                        document_type_id: formField.optionals.documentTypeId
                    } : {
                        founder_id: formField.optionals.documentTypeId
                    }
                },
                formField.optionals.documentGroup,
                formField.onUpload
            )

            this.uploadEmit(formField, response.id)
        } catch (error) {
            formField.clear()

            this.$toast({
                title: 'Ошибка загрузки файла',
                view: 'critical',
            })
        }
    }

    async onUpdate(
        formField: FormFileField,
        file: File,
    ): Promise<void> {
        try {
            const response = await this.sendOrderService.updateDocument(
                <'company' | 'founder'>formField.optionals.documentGroup,
                formField.value ?? '1',
                file
            )

            // eslint-disable-next-line no-param-reassign
            formField.value = response.id
        } catch (error) {
            this.$toast({
                title: 'Ошибка при обновлении файла',
                view: 'critical',
            })
        }
    }

    onDownload(formField: FormFileField): void {
        this.sendOrderService
            .downloadDocument(
                formField.value ?? '1',
                <'company' | 'founder'>formField.optionals.documentGroup
            )
            .then(route => {
                // FIXME: Replace route on common var
                const href = `http://new.finaxe.ru/web-api/${route}`

                download(
                    href,
                    `${formField.optionals.documentGroup}${formField.value}`
                )
            })
    }

    onDelete(formField: FormFileField): void {
        this.sendOrderService.deleteComponent(
            formField.optionals.documentGroup,
            formField.value ?? '1'
        )
        formField.clear()
    }

    onAbortLoading(formFile: FormFileField) {
        formFile.abortLoading()
    }

    created(): void {
        this.sendOrderService = new SendOrderService()
    }

    titleHeadInfo(type: keyof DocumentList['formFields']): { title: string, hint: string } {
        switch (type) {
            case "required":
                return {
                    title: 'Обязательные документы',
                    hint: 'Дополнительные документы',
                }
            default:
                return {
                    title: 'Дополнительные документы',
                    hint: 'Обязательные документы',
                }
        }
    }
}
</script>
