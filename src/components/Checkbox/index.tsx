import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    id: string
}

const HidenCheckbox = styled.input.attrs({ type: 'checkbox' })
`
    display: none;
`
interface  IStyledProps {
    checked: boolean
}

const StyledCheckbox = styled.label<IStyledProps>
`
    width: 29px;
    height: 29px;
    border: 3px solid #333;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ::before {
        content: '✓';
        font-size: 20px;
        display: ${props => props.checked ? 'inline' : 'none'};
      }
`

const Checkbox = (props: IProps) => {
    return (
        <>
            <HidenCheckbox id={props.id} type="checkbox" onChange={props.onChange} data-testid={props.id} />
            <StyledCheckbox htmlFor={props.id} checked={props.checked}></StyledCheckbox>
        </>
    )
}

export default Checkbox