import AuctionStep from './AuctionStep.vue'

export default {
    title: 'UI/AuctionStep',
    component: AuctionStep,
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {AuctionStep},
    template: `<AuctionStep v-bind="" />`
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    //
}