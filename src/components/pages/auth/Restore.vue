<template lang="pug">
    auth-layout-component
        auth-restore-component(
            :token="restoreToken"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

import AuthLayout from '../../blanks/auth/AuthLayout.vue'
import AuthRestore from '../../blanks/auth/AuthRestore.vue'

@Component({
    components: {
        'auth-layout-component': AuthLayout,
        'auth-restore-component': AuthRestore,
    }
})
export default class RecoveryPage extends Vue {
    @Prop() readonly content!: Record<string, string>

    get restoreToken(){
        return this.content && this.content.token
    }
}

</script>
