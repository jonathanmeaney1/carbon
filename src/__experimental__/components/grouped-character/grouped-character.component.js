import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import { generateGroups, toSum, toIndexSteps } from './grouped-character.utils';
import Events from '../../../utils/helpers/events/events';

const GroupedCharacter = (props) => {
  const [pressedKey, updatePressedKey] = useState(null);

  const { groups, value } = props;
  const stepIndices = groups.reduce(toIndexSteps, []);
  const separator = props.separator.substring(0, 1); // Ensure max length is 1
  stepIndices.pop();

  const handleChange = (ev) => {
    const eventRef = ev.target;
    const { selectionEnd } = ev.target;
    let modifier = 0;
    const isAtOneBeyondSeparator = stepIndices.includes(selectionEnd - 1),
        backspacePressed = Events.isBackspaceKey({ which: pressedKey });

    if (isAtOneBeyondSeparator && backspacePressed) {
      modifier = -1;
    } else if (isAtOneBeyondSeparator) {
      modifier = 1;
    }

    const newCursorPos = selectionEnd + (1 * modifier);
    const reProcessedInputValue = ev.target.value.split(separator).join('');

    props.onChange({ target: { value: reProcessedInputValue } });
    setTimeout(() => eventRef.setSelectionRange(newCursorPos, newCursorPos));
  };

  return (
    <Textbox
      { ...props }
      value={ generateGroups(groups, value).join(separator) }
      onChange={ handleChange }
      onKeyDown={ ({ which }) => updatePressedKey(which) }
      onKeyPress={ (ev) => {
        if (groups.reduce(toSum) === value.length) {
          ev.preventDefault();
        }
      } }
    />
  );
};


GroupedCharacter.propTypes = {
  /** character to be used as separator */
  separator: ((props, propName, componentName) => {
    if (typeof props[propName] !== 'string' || props[propName].length > 1) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Must be string of length 1.`);
    }
    return null;
  }),
  /** pattern by which input value should be grouped */
  groups: PropTypes.array,
  /** input value */
  value: PropTypes.string,
  /** on change handler which will receive the input value without separators */
  onChange: PropTypes.func
};

export default GroupedCharacter;