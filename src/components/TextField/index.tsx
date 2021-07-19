import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTextField = styled.input
`
    width: -webkit-fill-available;
    padding: 10px;
    border-radius: 4px;
    border: 3px solid #333;
    font-size: 25px;
`

interface IProps extends InputHTMLAttributes<HTMLInputElement> {

}

const TextField = (props : IProps) => {
    return (
        <StyledTextField {...props} />
    )
}

export default TextField