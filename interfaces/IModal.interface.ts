import { Dispatch, SetStateAction } from "react"

export interface IModal {
    title: string
    showModal: boolean
    hideModal: () => void
    setText: Dispatch<SetStateAction<string>>
    Itens: Array<IItens>
    idIten: number | undefined
    getId: (value: any) => void
}

export interface IItens {
    id: number | string
    name?: string
    ShowedName?: string
    img?: string
}