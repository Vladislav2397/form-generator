<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from "../../../js/decorators";
import { UserUserGetter } from "../../../js/store/modules/user/getters";
import { userRoles } from "../../../js/store/modules/user/state";


@Component({
    components: {
        'modal-order-client-component': () => import(/* webpackChunkName: "chunks/modals/modal-order-client" */ "./modal-order/client/ModalOrderClient.vue"),
        'modal-order-admin-component': () => import(/* webpackChunkName: "chunks/modals/modal-order-admin" */ "./modal-order/admin/ModalOrderAdmin.vue"),
    }
})
export default class ModalOrder extends Vue {
    @Getter('user/user') user!: UserUserGetter

    render(createElement){
        const isClientModal = [userRoles.CLIENT, userRoles.AGENT].includes(this.user.role)
        const modalComponentName = isClientModal ? 'modal-order-client-component' : 'modal-order-admin-component'

        return createElement(modalComponentName)
    }

    roles = Object.freeze(userRoles)
}

</script>
