import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}


const BaseButton = styled.button
    `
    height: 40px;
    line-height: 1;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    
    border-radius: 40px;
    cursor: pointer;
    overflow: hidden;
    transition: all .35s;
`

export const PrimaryButton = styled(BaseButton)`
    background: #fff;
    color: #8C82FC;
    border: 3px solid #8C82FC;
    &:hover, &:focus{
        background: #8C82FC;
        color: #fff;
      }

`
export const SecondaryButton = styled(BaseButton)`
    background: #fff;
    color: #007bff;
    border: 3px solid #007bff;
    &:hover, &:focus{
        background: #007bff;
        color: #fff;
    }
`

export const TertiaryButton = styled(BaseButton)`
    background: #fff;
    color: #28a745;
    border: 3px solid #28a745;
    &:hover, &:focus{
    background: #28a745;
    color: #fff;
}
`
export const DangerButton = styled(BaseButton)`
    background: #fff;
    color: #dc3545;
    border: 3px solid #dc3545;
    &:hover{
        background: #dc3545;
        color: #fff;
    }
`

const Button = (props: IProps) => {
    return (
        <BaseButton {...props} />
    )
}

export default Button