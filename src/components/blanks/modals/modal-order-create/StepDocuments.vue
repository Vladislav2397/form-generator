<template lang="pug">

.b-modal-content-layout
    document-list-component.__item(
        :required="fields && fields.required"
        :optional="fields && fields.optional"
        :loading="!isLoad"

        @upload="onUpload"
    )

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { OrderCreateDocumentsGetter } from '../../../../js/store/modules/order-create/getters'
import { OrderCreateFetchDocumentAction } from '../../../../js/store/modules/order-create/actions'

import DocumentList from '../../DocumentList.vue'
import SkeletonCardAttachment from '../../../ui/skeletons/SkeletonCardAttachment.vue'

import FormFileField from '../../../../js/utils/formField/formFileField'
import FormContainer from '../../../../js/utils/formField/formContainer'

import { Action, Getter } from '../../../../js/decorators'
import { Maybe } from '../../../../js/types/utils/other'

@Component({
    components: {
        'skeleton-card-attachment-component': SkeletonCardAttachment,
        'document-list-component': DocumentList,
    },
})
export default class StepDocuments extends Vue {
    @Prop() readonly orderId!: number

    @Getter('orderCreate/documents') documents!: OrderCreateDocumentsGetter

    @Action('orderCreate/fetchDocuments') fetchDocuments!: OrderCreateFetchDocumentAction

    fields: Maybe<Record<'required' | 'optional', InstanceType<typeof FormContainer>>> = null

    created() {
        this.fetchDocuments(this.orderId).then(() => {
            this.fields = this.formatDocuments()
        })
    }

    get isLoad() {
        return Boolean(this.fields && this.documents.required)
    }

    formatDocuments<
        T = Record<'required' | 'optional', InstanceType<typeof FormContainer>>
    >() {
        // @ts-ignore
        const documents: T = {}

        Object.entries(this.documents ?? {}).forEach(([name, docs]) => {
            const formContainer = {}

            docs.forEach(field => {
                formContainer[`${field.group}${field.context.type}`] = new FormFileField({
                    value: field.id,
                    optionals: {
                        required: name === 'required',
                        name: field.title,
                        documentTypeId: field.context.type,
                        documentGroup: field.group,
                    }
                })
            })

            documents[name] = new FormContainer(formContainer)
        })

        return documents
    }

    validate() {
        this.fields?.required.validation()
    }

    isValid() {
        return this.fields?.required.isValid()
    }

    onUpload(formField: FormFileField, id: number) {
        // eslint-disable-next-line no-param-reassign
        formField.value = id
    }
}

</script>
