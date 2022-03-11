import type { GameState } from './GameState'
import { RPSCard } from './RPSCard'

const CARD_TYPES = 4

export class InfoState {
    gameState: GameState
    actions: boolean[]
    regretSum: number[]
    strategySum: number[]

    visit: number

    constructor(gameState: GameState, rpsCard: RPSCard) {
        this.gameState = gameState

        this.actions = rpsCard.getActions(gameState.myCards)
        this.regretSum = new Array(CARD_TYPES).fill(0)
        this.strategySum = new Array(CARD_TYPES).fill(0)

        this.visit = 0
    }

    getStrategy(): number[] {
        const strategy = this.regretSum.map((item) => item > 0 ? item : 0)
        const normalizingSum = strategy.reduce((accum, val) => accum + val, 0)
        if (normalizingSum > 0) {
            return strategy.map((val) => val/normalizingSum)
        } else {
            const add = 1/strategy.length
            return new Array(strategy.length).fill(add)
        }
    }

    getAverageStrategy(): number[] {
        const normalizingSum = this.strategySum.reduce((accum, val) => accum+val)
        if (normalizingSum > 0) {
            return this.strategySum.map((val) => val/normalizingSum)
        } else {
            const add = 1/this.strategySum.length
            return new Array(this.strategySum.length).fill(add)
        }
    }

    getAction(): number {
        function weightedSample<T>(weight: number[], arr: T[]): number {
            const r = Math.random()
            let cumulativeProb = 0
            for (let i=0; i<arr.length; i++) {
                cumulativeProb += weight[i]
                if (r < cumulativeProb) {
                    return i
                }
            }
            return arr.length-1
        }
        const strategy = this.getStrategy()
        const action = weightedSample(strategy, this.actions)
        return action
    }

    accumulateRegret(regret: number[]) {
        this.regretSum = this.regretSum.map((val, idx) => val + regret[idx])
    }

    accumulateStrategy(strategy: number[]) {
        this.strategySum = this.strategySum.map((val, idx) => val + strategy[idx])
    }

    toString(): string {
        const averageStrategy = this.getAverageStrategy()
        const actionStrategy = this.actions.map((action, idx) => `${action}${averageStrategy[idx]}`)
        return actionStrategy.join(', ')
    }
}