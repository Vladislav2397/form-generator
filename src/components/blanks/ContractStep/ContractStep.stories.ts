import ContractStep from './ContractStep.vue'

export default {
    title: 'UI/ContractStep',
    component: ContractStep,
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {ContractStep},
    template: `<ContractStep v-bind="" />`
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    //
}