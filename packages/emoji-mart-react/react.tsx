// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { Emoji, Picker } from 'emoji-mart'

export function EmojiPicker(props) {
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

export function Emoji(props) {
  const ref = useRef(null)
  const instance = useRef(null)

  if (instance.current) {
    instance.current.update(props)
  }

  useEffect(() => {
    const EmojiConstructor = window?.customElements.get('em-emoji') ?? Emoji
    instance.current = new EmojiConstructor({ ...props, ref })

    return () => {
      instance.current = null
    }
  }, [])

  return React.createElement('span', { ref })
}
