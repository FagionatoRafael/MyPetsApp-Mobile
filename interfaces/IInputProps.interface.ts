import { SetStateAction } from "react"

export interface IInputProp {
    label: string
    text: string
    invalidText: string
    onChangeText: (value: SetStateAction<string>) => void
    hasErros: boolean
    hasTouch?: () => void
    hasMask?: boolean
    editable?: boolean
    smallInput?: boolean
}

