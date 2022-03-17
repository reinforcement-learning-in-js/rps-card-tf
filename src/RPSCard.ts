import { GameState } from "./GameState"

export class RPSCard {
    toStringDeck(d: number[]): string {
        return `[${d[0]}R,${d[1]}P,${d[2]}S,${d[3]}J]`
    }

    getKey(gameState: GameState): string {
        return `${this.toStringDeck(gameState.myCards)}/${this.toStringDeck(gameState.oppCards)}/${gameState.point}`
    }

    getActions(myCards: number[]): boolean[] {
        return myCards.map((val) => val>0)
    }

    flattenState(gameState: GameState): number[] {
        // for tensorflow training
        return gameState.myCards.concat(gameState.oppCards, gameState.point)
    }

    isEnd(gameState: GameState): boolean {
        return gameState.myCards.some((val) => val > 0)
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

    getNextCard(cards: number[], action: number) {
        const nextCards = cards.slice()
        nextCards[action] -= 1
        return nextCards
    }
    
    getNextPoint(myAction: number, oppAction: number, point: number[]): number[] {
        const nextPoint = point.slice()
        if (myAction === oppAction) {
            // draw
            return nextPoint
        }
        if (myAction === 3) {
            nextPoint[0] += 1
            return nextPoint
        }
        if (oppAction === 3) {
            nextPoint[1] += 1
            return nextPoint
        }
        if (myAction === (oppAction + 1)%3) {
            // my win
            nextPoint[0] += 1
        }
        // opponent win
        nextPoint[1] += 1
        return nextPoint
    }

    getNextState(gameState: GameState, myAction: number, oppAction: number): GameState {
        const nextState: GameState = {
            myCards: this.getNextCard(gameState.myCards, myAction),
            oppCards: this.getNextCard(gameState.oppCards, oppAction),
            point: this.getNextPoint(myAction, oppAction, gameState.point)
        }
        return nextState
    }
}