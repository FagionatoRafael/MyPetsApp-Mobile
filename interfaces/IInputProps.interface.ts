import { SetStateAction } from "react"

export interface IInputProp {
    label: string
    text: string
    invalidText: string
    isPassword?: boolean
    onChangeText: (value: SetStateAction<string>) => void
    hasErros: boolean
    hasTouch?: () => void
    isSecure?: () => void
    hasMask?: boolean
    editable?: boolean
    smallInput?: boolean
    multiline?: boolean
    keyboardType?: 'default' | 'email-address',
    secureTextEntry?: boolean
}

