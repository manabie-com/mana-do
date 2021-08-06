import { MouseEventHandler } from "react";

export interface ButtonProp {
    className?: string
    disabled?: boolean
    error?: string
    id?: string
    label: string
    style?: object
    onClick: MouseEventHandler<HTMLButtonElement>
}