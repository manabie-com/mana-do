import React from 'react';

const LabelForm = (props: { htmlFor: string, label: string }) => {
  return <label htmlFor={props.htmlFor}>{props.label}</label>
}

export default LabelForm;