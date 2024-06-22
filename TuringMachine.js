import chalk from "chalk";

class TuringMachine {
    constructor({ states, inputAlphabet, tapeAlphabet, transitions, initialState, blankSymbol, finalStates, totalTapes }) {
        this.states = states;
        this.inputAlphabet = inputAlphabet;
        this.tapeAlphabet = tapeAlphabet;
        this.transitions = transitions;
        this.blankSymbol = blankSymbol;
        this.finalStates = finalStates;
        this.currentStates = initialState; 
        this.totalTapes = totalTapes
        this.tapes = [
            {
                content: [],
                head: 0
            }
        ]; 
    }

    addTapes(inputs = ['']) {   
        this.tapes = inputs.map(input => ({ content: [input], head: 0 }));
    }

    async run() {
        while (!this.currentStates.includes(this.finalStates)) {
            console.log(`States: ${this.currentStates.join(', ')}, Tapes: ${this.getTapesWithHighlight()}`);
    
            const getTransitionKeys = () => {
                let currentSymbols = []

                for (let i = 0; i < this.totalTapes; i++){
                    const currentHead = this.tapes[i].head
                    const symbol = this.tapes[i].content[currentHead] || this.blankSymbol
                    currentSymbols.push(symbol)
                }

                return JSON.stringify({ state: this.states, symbol: currentSymbols });
            }

            const transitionKeys1 = this.currentStates.map((state, idx) => {
                let currentSymbols = [];
            
                // Ambil simbol dari pita, dimulai dari head, sebanyak tapeAlphabet.length (maksimal)
                for (let i = 0; i < this.tapeAlphabet.length; i++) {
                    const symbol = this.tapes[idx].content[this.tapes[idx].head + i] || this.blankSymbol;
                    currentSymbols.push(symbol);
            
                    // Berhenti jika sudah mencapai simbol yang cukup
                    if (currentSymbols.length === this.tapeAlphabet.length) {
                        break;
                    }
                }
            
                return JSON.stringify({ state, symbol: currentSymbols });
            });
    
            let allValidTransitions = true;
            for (let i = 0; i < this.tapes.length; i++) {
                const transitionKey = transitionKeys[i];
                if (!this.transitions[transitionKey]) {
                    throw new Error(`No transition found for ${transitionKey}`);
                }
                const { newState, writeSymbol, direction } = this.transitions[transitionKey];
    
                // Pastikan format array
                if (!(Array.isArray(newState) && Array.isArray(writeSymbol) && Array.isArray(direction)) ||
                    newState.length !== writeSymbol.length || writeSymbol.length !== direction.length) {
                    throw new Error(`Transition format mismatch for ${transitionKey}`);
                }
    
                // Ambil elemen pertama dari array untuk newState, writeSymbol, dan direction
                this.currentStates[i] = newState[0];
                this.tapes[i].content[this.tapes[i].head] = writeSymbol[0];
                if (direction[0] === 'R') {
                    this.tapes[i].head++;
                } else if (direction[0] === 'L') {
                    this.tapes[i].head--;
                    if (this.tapes[i].head < 0) {
                        this.tapes[i].content.unshift(this.blankSymbol);
                        this.tapes[i].head = 0;
                    }
                }
            }
    
            if (!allValidTransitions) {
                throw new Error(`No valid transitions found for current configuration.`);
            }
        }
    
        return this.tapes.map(tape => tape.content.join(''));
    }

    getTapesWithHighlight() {
        let tapesWithHighlight = '';
        for (let i = 0; i < this.tapes.length; i++) {
            tapesWithHighlight += `Tape ${i + 1}: `;
            for (let j = 0; j < this.tapes[i].content.length; j++) {
                if (j === this.tapes[i].head) {
                    tapesWithHighlight += chalk.red(this.tapes[i].content[j]);
                } else {
                    tapesWithHighlight += this.tapes[i].content[j];
                }
            }
            tapesWithHighlight += ' ';
        }
        return tapesWithHighlight.trim();
    }
}

export default TuringMachine;
