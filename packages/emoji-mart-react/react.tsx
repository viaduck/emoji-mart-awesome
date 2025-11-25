// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { Picker } from 'emoji-mart'

export default function EmojiPicker(props) {
  const ref = useRef(null)
  const instance = useRef(null)

  if (instance.current) {
    instance.current.update(props)
  }

  useEffect(() => {
    const PickerConstructor = window?.customElements.get('em-emoji-picker') ?? Picker
    instance.current = new PickerConstructor({ ...props, ref })

    return () => {
      instance.current = null
    }
  }, [])

  return React.createElement('div', { ref })
}
