/* eslint-disable */
// @ts-ignore
import Cleave from 'cleave.js'

let isChangeInside = false

// @ts-ignore
function onInput(e) {
    isChangeInside = true
}

export default {
    // @ts-ignore
    inserted(el, binding) {
        if (binding.value) {
            el.onkeypress = onInput
            el.cleave = new Cleave(el, binding.value || {})
        }
    },
    // @ts-ignore
    update(el, binding, node, oldNode) {
        if (binding.value) {
            const event = new Event('input', { bubbles: true })
            requestAnimationFrame(() => {
                if (isChangeInside) {
                    el.value = el.cleave.properties.result
                    el.dispatchEvent(event)
                    isChangeInside = false
                } else {
                    el.value = el.cleave.properties.dateFormatter.prototype.getValidatedData(node.data.domProps.value)
                }
            })
        }
    },
}
