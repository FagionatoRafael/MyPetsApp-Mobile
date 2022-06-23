import { Dispatch, SetStateAction } from "react"

export interface IModal {
    title: string
    showModal: boolean
    hideModal: () => void
    setText: Dispatch<SetStateAction<string>>
}