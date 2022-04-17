import { SetStateAction } from "react"

export default interface IInputProp {
    label: string
    text: string
    onChangeText: (value: SetStateAction<string>) => void
    hasErros: () => boolean
    hasTouch?: () => void
}