import control from '../control'
import { trimObj } from '../utils'

/**
 * Location List class
 * Output a <select ... /> form element
 */
export default class controlLocationList extends control {
  /**
   * class configuration
   */
  static get definition() {
    return {
      // i18n custom mappings
      i18n: {
        default: 'Location List',
      },
    }
  }
  /**
   * build a select DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    // options of the select element
    const options = []
    const { values, value, placeholder, type, inline, other, toggle, ...data } = this.config
    if (values) {
      // if a placeholder is specified, add it to the top of the option list
      if (placeholder) {
        options.push(
          this.markup('option', placeholder, {
            disabled: null,
            selected: null,
          }),
        )
      }
      // process the rest of the options
      for (let i = 0; i < values.length; i++) {
        let option = values[i]
        // location list option has two labels, title & description
        // therefore, the label that appers in the select element is both labels
        const { label = option.title + (option.description ? ' - ' + option.description : ''), ...optionAttrs } = option
        optionAttrs.id = `${data.id}-${i}`

        // don't select this option if a placeholder is defined
        if (!optionAttrs.selected || placeholder) {
          delete optionAttrs.selected
        }

        // if a value is defined at select level, select this attribute
        if (typeof value !== 'undefined' && optionAttrs.value === value) {
          optionAttrs.selected = true
        }

        // create an option and push it to the options
        const o = this.markup('option', document.createTextNode(label), optionAttrs)
        options.push(o)
      }
    }

    // build & return the DOM elements
    data.className = 'form-control'
    this.dom = this.markup('select', options, trimObj(data, true))
    return this.dom
  }
}
// register this control for the following type
control.register('locationList', controlLocationList)
