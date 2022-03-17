import { GameState, RPSCard } from ".";
import { describe, it } from "mocha";
import { expect } from "chai";

const card = new RPSCard()

const getTestState: () => GameState = () => {
    return {
        myCards: [0, 1, 1, 0],
        oppCards: [0, 1, 0, 1],
        point: [0, 0]
    }
}

describe('basic tests', () => {
    describe('getAction', () => {
        it('test1', () => {
            const state = getTestState()
            expect(card.getActions(state.myCards)).to.deep.equal([false, true, true, false])
        })
    })
})