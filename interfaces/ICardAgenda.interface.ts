export interface ICardAgenda {
    icon: any
    namePet: string
    day: string
    hoursOf: string
    hoursTill: string
    itens: Array<number>
    editFunc: () => void
}