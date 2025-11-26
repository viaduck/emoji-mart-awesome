# `@emoji-mart-awesome/react`

A React wrapper for [EmojiMartAwesome](https://github.com/viaduck/emoji-mart-awesome).

## ✍️ Changes compared to the upstream `@emoji-mart/react`
- Added React 19 support
- Added Emoji component for react usage

## 🧑‍💻 Usage
```sh
npm install --save emoji-mart-awesome @emoji-mart/data @emoji-mart-awesome/react
```

```js
import data from '@emoji-mart/data'
import Picker from '@emoji-mart-awesome/react'

function App() {
  return (
    <Picker data={data} onEmojiSelect={console.log} />
  )
}
```

## 📚 Documentation
See https://github.com/missive/emoji-mart#react
