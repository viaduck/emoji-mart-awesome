import React from 'react'
import { EmojiTextPropTypes, EmojiTextDefaultProps } from '../utils/shared-props'
import { natives } from "../utils/emoji-index";
import emojiRegexFn from 'emoji-regex'
import Emoji from "./emoji";

const emojiRegex = emojiRegexFn();

const renderEmoji = (unicode, index, emojiProps) => {
  return (<Emoji emoji={natives[unicode]} key={'emoji-'+index} {...emojiProps}/>)
}

const replaceNative = (text, emojiProps) => {
  let result = [], prevIndex = 0, match;

  while ((match = emojiRegex.exec(text))) {
    let index = match.index, unicode = match[0];

    // skipped some text chars, add them to output
    if (index !== prevIndex)
      result.push(text.substring(prevIndex, index));

    // move cursor forward
    prevIndex = index + unicode.length;

    // replace and add to result
    result.push(renderEmoji(unicode, index, emojiProps));
  }

  // if leftover text exists, append it to result
  if (prevIndex < text.length)
    result.push(text.substring(prevIndex));

  return result;
}

const EmojiText = (props) => {
  for (let k in EmojiText.defaultProps) {
    if (props[k] === undefined && EmojiText.defaultProps[k] !== undefined) {
      props[k] = EmojiText.defaultProps[k]
    }
  }

  const className = props.className || ''
  const style = props.style || {}

  return (
    <p className={className} style={style}>
      {replaceNative(props.text, props.emojiProps)}
    </p>
  )
}

EmojiText.propTypes = EmojiTextPropTypes
EmojiText.defaultProps = EmojiTextDefaultProps

export default EmojiText