import * as tf from '@tensorflow/tfjs'
import { GameState, RPSCard } from '.'

const deck = [0, 0, 1, 0]

const state: GameState = {
    myCards: deck,
    oppCards: deck,
    point: [0, 0]
}

function createModel() {
    const model = tf.sequential()
    model.add(tf.layers.dense({inputShape: [10], units: 1, useBias: true}))
    model.add(tf.layers.dense({units: 4}))
    return model
}

function convertToTensor(states: GameState[], regrets: number[][]) {

}

const rule = new RPSCard()
console.log(rule.flattenState(state))