import { Deck, GameState } from "./GameState"

export class RPSCard {
    toStringDeck(d: Deck): string {
        return `[${d.R}R,${d.P}P,${d.S}S,${d.J}J]`
    }

    getKey(gameState: GameState): string {
        return `${this.toStringDeck(gameState.myCards)}/${this.toStringDeck(gameState.oppCards)}/${gameState.point}`
    }

    getActions(myCards: Deck): string[] {
        const actions = []
        for (const [key, value] of Object.entries(myCards)) {
            if (value > 0) {
                actions.push(key)
            }
        }
        return actions
    }

    isEnd(gameState: GameState): boolean {
        for (const [_, value] of Object.entries(gameState.myCards)) {
            if (value > 0) {
                return false
            }
        }
        return true
    }

    filpState(gameState: GameState): GameState {
        const newState: GameState = {
            myCards: gameState.oppCards,
            oppCards: gameState.myCards,
            point: gameState.point
        }
        return newState
    }

    getPayoff(gameState: GameState): number {
        if (gameState.point[0] > gameState.point[1]) {
            return 1
        } else if (gameState.point[0] < gameState.point[1]) {
            return -1
        } else {
            return 0
        }
    }

    getNextCard(cards: Deck, action: string) {
        const nextCards: Deck = {...cards}
        nextCards[action] -= 1
        return nextCards
    }
    
    getNextPoint(myAction: string, oppAction: string, point: number[]): number[] {
        const nextPoint = point.slice()
        if (myAction === oppAction) {
            return nextPoint
        }
        if (myAction === "J") {
            nextPoint[0] += 1
            return nextPoint
        }
        if (oppAction === "J") {
            nextPoint[1] += 1
            return nextPoint
        }
        interface WinMapSig {
            [key: string]: string
        }
        const winMap: WinMapSig = {
            R: "P",
            P: "S",
            S: "R"
        }
        if (oppAction === winMap[myAction]) {
            nextPoint[1] += 1
        } else {
            nextPoint[0] += 1
        }
        return nextPoint
    }

    getNextState(gameState: GameState, myAction: string, oppAction: string): GameState {
        const nextState: GameState = {
            myCards: this.getNextCard(gameState.myCards, myAction),
            oppCards: this.getNextCard(gameState.oppCards, oppAction),
            point: this.getNextPoint(myAction, oppAction, gameState.point)
        }
        return nextState
    }
}