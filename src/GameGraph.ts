import { GameState } from "./GameState";
import { InfoState } from "./InfoState";
import { RPSCard } from "./RPSCard";

export class GameGraph {
    nodeMap: Map<string, InfoState>
    gameRule: RPSCard

    constructor(gameRule: RPSCard) {
        this.nodeMap = new Map<string, InfoState>()
        this.gameRule = gameRule
    }

    sanitizeRegret(regrets: number[]) {
        // given tensorflow output, set unavailable action regret to 0.

    }

    getNode(state: GameState) {
        const key = this.gameRule.getKey(state)
        const node = this.nodeMap.get(key)
        if (node === undefined) {
            const newNode = new InfoState(state, this.gameRule)
            this.nodeMap.set(key, newNode)
            return newNode
        } else {
            return node
        }
    }

    cfr(state: GameState, reach: number, depth: number) {
        if (this.gameRule.isEnd(state)) {
            return this.gameRule.getPayoff(state)
        }
        const myNode = this.getNode(state)
        const oppNode = this.getNode(this.gameRule.filpState(state))
        
        const myStrategy = myNode.getStrategy()
        myNode.accumulateStrategy(myStrategy)
        const oppAction = oppNode.getAction()
        
        const actions = myNode.actions
        const actionsUtil = new Array(actions.length).fill(0)
        let util = 0
        for (let i=0; i<actions.length; i++) {
            if (actions[i]) {
                const nextState = this.gameRule.getNextState(state, i, oppAction)
                const nextReach = reach * myStrategy[i]
                const actionUtil = this.cfr(nextState, nextReach, depth+1)
                actionsUtil[i] = actionUtil
                util += actionUtil * myStrategy[i]
            }
        }
        const regret = actionsUtil.map((val) => (val-util) * reach)
        myNode.accumulateRegret(regret)
        return util
    }

    train(initial: GameState, iters: number) {
        for (let i=0; i<iters; i++) {
            this.cfr(initial, 1, 0)
        }
        console.log("train end")
    }

}