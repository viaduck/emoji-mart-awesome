import { Data } from '../../config'
import { SearchIndex } from '../../helpers'

const TRANSPARENT_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function Emoji(props) {
  let { id, skin, emoji } = props

  if (props.shortcodes) {
    const matches = props.shortcodes.match(SearchIndex.SHORTCODES_REGEX)

    if (matches) {
      id = matches[1]

      if (matches[2]) {
        skin = matches[2]
      }
    }
  }

  emoji || (emoji = SearchIndex.get(id || props.native))
  if (!emoji) return props.fallback

  if (props.native && !props.skin) {
    skin = emoji.skins.findIndex(es => es.native == props.native) + 1
  }

  const emojiSkin = emoji.skins[skin - 1] || emoji.skins[0]

  const imageSrc =
    emojiSkin.src ||
    (props.set != 'native' && !props.spritesheet
      ? typeof props.getImageURL === 'function'
        ? props.getImageURL(props.set, emojiSkin.unified)
        : `https://cdn.jsdelivr.net/npm/emoji-datasource-${props.set}@15.0.1/img/${props.set}/64/${emojiSkin.unified}.png`
      : undefined)

  const spritesheetSrc =
    typeof props.getSpritesheetURL === 'function'
      ? props.getSpritesheetURL(props.set)
      : `https://cdn.jsdelivr.net/npm/emoji-datasource-${props.set}@15.0.1/img/${props.set}/sheets-256/64.png`

  return (
    <>
      {props.set == 'native' ? (
        <span
          style={{
            fontSize: props.size,
            fontFamily:
              '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"',
          }}
        >
          {emojiSkin.native}
        </span>
      ) : (
        <img
          style={{
            display: 'inline',
            position: 'static',
            verticalAlign: 'top',

            maxWidth: props.size || '1em',
            maxHeight: props.size || '1em',
            width: spritesheetSrc ? props.size : undefined,
            height: spritesheetSrc ? props.size : undefined,

            backgroundImage: `url(${spritesheetSrc})`,
            backgroundSize: `${100 * Data.sheet.cols}% ${
              100 * Data.sheet.rows
            }%`,
            backgroundPosition: `${
              (100 / (Data.sheet.cols - 1)) * emojiSkin.x
            }% ${(100 / (Data.sheet.rows - 1)) * emojiSkin.y}%`,

            userSelect: 'text',
            MozUserDrag: 'none',
            WebkitUserDrag: 'none',
            msUserDrag: 'none',
            userDrag: 'none',
          }}
          alt={emojiSkin.native || emojiSkin.shortcodes}
          src={imageSrc || TRANSPARENT_GIF}
        />
      )}
    </>
  )
}
