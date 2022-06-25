import { Dispatch, SetStateAction } from "react"
import { IItens } from "./IItens.interface"

export interface IModal {
    title: string
    showModal: boolean
    hideModal: () => void
    setText: Dispatch<SetStateAction<string>>
    Itens: Array<IItens>
}

