import React from 'react';
import "../index.css";
const InputComponent = (inputProps: any) => {
  return (
    <div className="todo__creation">
        <input
            className='todo__input'
            placeholder="What need to be done?"
            onChange={inputProps.onChangeContent}/>
    </div>
  )
}

export default InputComponent