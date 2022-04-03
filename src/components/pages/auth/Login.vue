<template lang="pug">
    auth-layout-component
        transition(
            name="fade"
            mode="out-in"
        )
            //:error="errors.error === '1'"
            //    :errorText="errorText"
            auth-login-component(
                v-if="currentState === 'login'"
                @openRegistration="changeState('registration')"
                @openRecovery="changeState('recovery')"
            )
            auth-recovery-component(
                v-else-if="currentState === 'recovery'"
                @back="changeState('login')"
            )
            auth-registration-component(
                v-else-if="currentState === 'registration'"
                @back="changeState('login')"
            )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AuthLayout from '../../blanks/auth/AuthLayout.vue'
import AuthLogin from '../../blanks/auth/AuthLogin.vue'
import AuthRecovery from '../../blanks/auth/AuthRecovery.vue'
import AuthRegistration from '../../blanks/auth/AuthRegistration.vue'

type AuthState = 'login' | 'registration' | 'recovery'

@Component({
    components: {
        'auth-layout-component': AuthLayout,
        'auth-login-component': AuthLogin,
        'auth-recovery-component': AuthRecovery,
        'auth-registration-component': AuthRegistration
    }
})
export default class LoginPage extends Vue {
    currentState: AuthState = 'login'

    changeState (state: AuthState): void {
        this.currentState = state
    }
}
</script>
