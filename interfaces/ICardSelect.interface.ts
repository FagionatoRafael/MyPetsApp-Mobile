export interface ICardSelect {
    text: string
    id: number
    selected: boolean
    funcId?: (id: any) => void
}