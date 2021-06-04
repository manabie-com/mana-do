import React from 'react';

interface MCheckboxProps {
  checked: boolean,
  onChange: (checked: boolean) => void
}

/**
 *  Manabie's checkbox
 *
 * @param checked: is Checkbox checked or not
 * @param onChange: action fired when checkbox changed
 * @constructor
 */
const MCheckbox = ({
  checked,
  onChange
}: MCheckboxProps) => {
  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={({target: {checked}}) => onChange(checked)}
    />
  );
}

export default MCheckbox;
