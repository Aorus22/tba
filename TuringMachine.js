import chalk from 'chalk';

class TuringMachine {
    constructor({ states, inputAlphabet, tapeAlphabet, transitions, initialState, blankSymbol, finalStates }) {
        this.states = states;
        this.inputAlphabet = inputAlphabet;
        this.tapeAlphabet = tapeAlphabet;
        this.transitions = transitions;
        this.initialState = initialState;
        this.blankSymbol = blankSymbol;
        this.finalStates = finalStates;
        this.currentState = initialState;
        this.tape = {
            content: [],
            head: 0
        };
    }

    addTape(input = '') {
        this.tape.content = [...input];
    }

    async run() {
        while (!this.finalStates.includes(this.currentState)) {
            console.log(`State: ${this.currentState}, Tape: ${this.getTapeWithHighlight(this.tape.head)}`);

            const currentSymbol = this.tape.content[this.tape.head] || this.blankSymbol;
            const transitionKey = JSON.stringify({ state: this.currentState, symbol: currentSymbol });

            if (!this.transitions[transitionKey]) {
                throw new Error(`No transition found for ${transitionKey}`);
            }

            const { newState, writeSymbol, direction } = this.transitions[transitionKey];
            this.currentState = newState;

            this.tape.content[this.tape.head] = writeSymbol;
            if (direction === 'R') {
                this.tape.head++;
            } else if (direction === 'L') {
                this.tape.head--;
                if (this.tape.head < 0) {
                    this.tape.content.unshift(this.blankSymbol);
                    this.tape.head = 0;
                }
            } else if (direction === 'N') {}

        }

        return this.tape.content.join('');
    }

    getTapeWithHighlight(headPosition) {
        let tapeWithHighlight = '';
        for (let i = 0; i < this.tape.content.length; i++) {
            if (i === headPosition) {
                tapeWithHighlight += chalk.red(this.tape.content[i]);
            } else {
                tapeWithHighlight += this.tape.content[i];
            }
        }
        return tapeWithHighlight;
    }
}

export default TuringMachine;
