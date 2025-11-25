import PickerProps from '../Picker/PickerProps'

export default {
  fallback: '',
  id: '',
  native: '',
  shortcodes: '',
  size: {
    value: '',
    transform: (value) => {
      // If the value is a number, then we assume it’s a pixel value.
      if (!/\D/.test(value)) {
        return `${value}px`
      }

      return value
    },
  },

  // rendering
  spritesheet: {
    value: false,
  },
  getSpritesheetURL: PickerProps.getSpritesheetURL,

  // Shared
  set: PickerProps.set,
  skin: {
    value: null,
    choices: PickerProps.skin.choices,
  },
}
