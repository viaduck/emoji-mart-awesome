import React from 'react'
import { EmojiTextPropTypes, EmojiTextDefaultProps } from '../utils/shared-props'
import { natives } from "../utils/emoji-index";
import emojiRegexFn from 'emoji-regex'
import Emoji from "./emoji";

const emojiRegex = emojiRegexFn();

const renderEmoji = (unicode, index, emojiProps) => {
  return (
      <Emoji
        key={'emoji-'+index}
        emoji={natives[unicode]}
        inline={true}
        style={{verticalAlign: "bottom"}}
        {...emojiProps}
      />)
}

const replaceNative = (result, text, emojiProps) => {
  let prevIndex = 0, match;

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
}

const replace = (elements, emojiProps) => {
  let result = [];
  
  for (let e in elements) {
    const value = elements[e];
    
    if (typeof value === 'string')
        replaceNative(result, value, emojiProps);
    else
        result.push(value);
  }
  
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
      {replace(props.children, props.emojiProps)}
    </p>
  )
}

EmojiText.propTypes = EmojiTextPropTypes
EmojiText.defaultProps = EmojiTextDefaultProps

export default EmojiText
