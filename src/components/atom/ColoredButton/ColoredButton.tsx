import React, { useState } from 'react'
import { EnhanceTodoStatus } from '../../pages/ToDoPage/ToDoPage/ToDoPage';
import Button from '../Button/Button';

interface IShowButton {
    label: string,
    showing: EnhanceTodoStatus,
    backgroundColor: string,
    setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>,
}

//this component is to set color for button's background
const ColoredButton = ({ label, showing, setShowing, backgroundColor }: IShowButton) => {
    const [bgcolor, setBgcolor] = useState<Boolean>(false)

    return (
        <Button style={(!bgcolor) ? { backgroundColor: 'white' } : { backgroundColor: backgroundColor }}
            label={label}
            className={`btn-${label}`}
            
            onClick={() => {
                setBgcolor(true)
                setShowing(showing)
            }}
            onBlur={() => setBgcolor(false)} />
    )
}
export default ColoredButton;