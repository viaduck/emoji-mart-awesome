// @ts-nocheck
import { Store } from '../helpers'

const DEFAULTS = [
  '+1',
  'grinning',
  'kissing_heart',
  'heart_eyes',
  'laughing',
  'stuck_out_tongue_winking_eye',
  'sweat_smile',
  'joy',
  'scream',
  'disappointed',
  'unamused',
  'weary',
  'sob',
  'sunglasses',
  'heart',
]

let Index: any | null = null
let Skins: any | null = null

function add(emoji: { id: string, skin?: number }) {
  Index || (Index = Store.get('frequently') || {})
  Skins || (Skins = Store.get('skins') || {})

  const emojiId = emoji.id || emoji
  if (!emojiId) return

  Index[emojiId] || (Index[emojiId] = 0)
  Index[emojiId] += 1

  emoji.skin && (Skins[emojiId] = emoji.skin)

  Store.set('last', emojiId)
  Store.set('frequently', Index)
  Store.set('skins', Skins)
}

function get({ maxFrequentRows, perLine }) {
  if (!maxFrequentRows) return []

  Index || (Index = Store.get('frequently'))
  Skins || (Skins = Store.get('skins') || {})
  let emojiIds = []

  if (!Index) {
    Index = {}

    for (let i in DEFAULTS.slice(0, perLine)) {
      const emojiId = DEFAULTS[i]

      Index[emojiId] = perLine - i
      emojiIds.push(emojiId)
    }

    return emojiIds
  }

  const max = maxFrequentRows * perLine
  const last = Store.get('last')

  for (let emojiId in Index) {
    emojiIds.push(emojiId)
  }

  emojiIds.sort((a, b) => {
    const aScore = Index[b]
    const bScore = Index[a]

    if (aScore == bScore) {
      return a.localeCompare(b)
    }

    return aScore - bScore
  })

  if (emojiIds.length > max) {
    const removedIds = emojiIds.slice(max)
    emojiIds = emojiIds.slice(0, max)

    for (let removedId of removedIds) {
      if (removedId == last) continue
      delete Index[removedId]
      delete Skins[removedId]
    }

    if (last && emojiIds.indexOf(last) == -1) {
      delete Index[emojiIds[emojiIds.length - 1]]
      delete Skins[emojiIds[emojiIds.length - 1]]
      emojiIds.splice(-1, 1, last)
    }

    Store.set('frequently', Index)
    Store.set('skins', Skins)
  }

  return emojiIds
}

function getSkin(emojiId): number | undefined {
  return Skins[emojiId]
}

export default { add, get, getSkin, DEFAULTS }
