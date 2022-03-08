export interface Deck {
    [key: string]: number
    R: number
    P: number
    S: number
    J: number
}

export interface GameState {
    myCards: Deck
    oppCards: Deck
    point: number[]
}