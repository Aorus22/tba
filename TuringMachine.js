import chalk from "chalk";

class TuringMachine {
    constructor({ states, inputAlphabet, tapeAlphabet, transitions, initialState, blankSymbol, finalStates }) {
        this.states = states;
        this.inputAlphabet = inputAlphabet;
        this.tapeAlphabet = tapeAlphabet;
        this.transitions = transitions;
        this.initialState = initialState;
        this.blankSymbol = blankSymbol;
        this.finalStates = finalStates;
        this.currentStates = [initialState]; 
        this.tapes = [
            {
                content: [],
                head: 0
            }
        ]; 
    }

    addTapes(inputs = ['']) {
        this.tapes = inputs.map(input => ({ content: [...input], head: 0 }));
    }

    async run() {
        while (!this.finalStates.some(finalState => this.currentStates.includes(finalState))) {
            console.log(`States: ${this.currentStates.join(', ')}, Tapes: ${this.getTapesWithHighlight()}`);
    
            const transitionKeys = this.currentStates.map((state, idx) => {
                const currentSymbol = this.tapes[idx].content[this.tapes[idx].head] || this.blankSymbol;
                return JSON.stringify({ state, symbol: [currentSymbol] }); // symbol diubah menjadi array
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
