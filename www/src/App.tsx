
import type { GameState, Deck } from '../../src/GameState'

function App() {
    const deck: Deck = {
        R: 1,
        P: 1,
        S: 1, 
        J: 0
    }
    const state: GameState = {
        myCards: deck,
        oppCards: deck,
        point: [0, 0]
    }
    const rps = new RPSCard()
    return <div>
        <h1>
            {rps.getKey(state)}
            hello, world! +1
        </h1>
    </div>
}

export default App