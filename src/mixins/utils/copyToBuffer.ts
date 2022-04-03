import { Component, Vue } from 'vue-property-decorator'
import copyToBuffer from '../../utils/default/copyToBuffer'

@Component
export default class CopyToBufferMixins extends Vue {
    copyToBuffer(value: string | number | undefined) {
        if (value) {
            copyToBuffer(value)
            // this.$toast({
            //     text: 'Ссылка скопированна',
            //     view: 'success',
            // })
        } else {
            // this.$toast({
            //     title: 'Ошибка',
            //     text: 'Что-то пошло не так',
            //     view: 'critical',
            // })
        }
    }
}
