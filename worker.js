import { parentPort } from'worker_threads';
import chalk from "chalk";
import readline from 'readline';

const blankSymbol = " ";
const finalStates = "q13";
const totalTapes = 2;
const transitions = {
    '{"state":"q0","symbol":"0 "}': { newState: 'q0', writeSymbol: '00', direction: 'RR' },
    '{"state":"q0","symbol":"1 "}': { newState: 'q1', writeSymbol: '1 ', direction: 'RL' },
    '{"state":"q1","symbol":"00"}': { newState: 'q1', writeSymbol: '00', direction: 'RS' },
    '{"state":"q1","symbol":"0Y"}': { newState: 'q1', writeSymbol: '0Y', direction: 'RS' },
    '{"state":"q1","symbol":" 0"}': { newState: 'q2', writeSymbol: ' 0', direction: 'LS' },
    '{"state":"q1","symbol":" Y"}': { newState: 'q2', writeSymbol: ' Y', direction: 'LS' },
    '{"state":"q2","symbol":"00"}': { newState: 'q3', writeSymbol: ' 0', direction: 'LS' },
    '{"state":"q2","symbol":"0Y"}': { newState: 'q3', writeSymbol: ' Y', direction: 'LS' },
    '{"state":"q2","symbol":"10"}': { newState: 'q13', writeSymbol: '10', direction: 'SS' },
    '{"state":"q2","symbol":"1Y"}': { newState: 'q13', writeSymbol: '1Y', direction: 'SS' },
    '{"state":"q3","symbol":"00"}': { newState: 'q3', writeSymbol: '00', direction: 'LS' },
    '{"state":"q3","symbol":"10"}': { newState: 'q3', writeSymbol: '10', direction: 'LS' },
    '{"state":"q3","symbol":"0Y"}': { newState: 'q3', writeSymbol: '0Y', direction: 'LS' },
    '{"state":"q3","symbol":"1Y"}': { newState: 'q3', writeSymbol: '1Y', direction: 'LS' },
    '{"state":"q3","symbol":" 0"}': { newState: 'q4', writeSymbol: ' 0', direction: 'RS' },
    '{"state":"q3","symbol":" Y"}': { newState: 'q4', writeSymbol: ' Y', direction: 'RS' },
    '{"state":"q4","symbol":"00"}': { newState: 'q5', writeSymbol: ' 0', direction: 'RS' },
    '{"state":"q4","symbol":"0Y"}': { newState: 'q5', writeSymbol: ' Y', direction: 'RS' },
    '{"state":"q5","symbol":"00"}': { newState: 'q5', writeSymbol: '00', direction: 'SL' },
    '{"state":"q5","symbol":"0Y"}': { newState: 'q5', writeSymbol: '00', direction: 'SL' },
    '{"state":"q5","symbol":"0X"}': { newState: 'q5', writeSymbol: '00', direction: 'SL' },
    '{"state":"q5","symbol":"0 "}': { newState: 'q6', writeSymbol: 'X ', direction: 'RR' },
    '{"state":"q6","symbol":"00"}': { newState: 'q7', writeSymbol: '0X', direction: 'SR' },
    '{"state":"q6","symbol":"0Y"}': { newState: 'q9', writeSymbol: 'XY', direction: 'RS' },
    '{"state":"q7","symbol":"00"}': { newState: 'q7', writeSymbol: '00', direction: 'SR' },
    '{"state":"q7","symbol":"0Y"}': { newState: 'q7', writeSymbol: '0Y', direction: 'SR' },
    '{"state":"q7","symbol":"0 "}': { newState: 'q8', writeSymbol: '0Y', direction: 'SL' },
    '{"state":"q8","symbol":"00"}': { newState: 'q8', writeSymbol: '00', direction: 'SL' },
    '{"state":"q8","symbol":"0Y"}': { newState: 'q8', writeSymbol: '0Y', direction: 'SL' },
    '{"state":"q8","symbol":"0X"}': { newState: 'q6', writeSymbol: '0X', direction: 'SR' },
    '{"state":"q9","symbol":"0Y"}': { newState: 'q10', writeSymbol: '0Y', direction: 'SL' },
    '{"state":"q9","symbol":"1Y"}': { newState: 'q11', writeSymbol: '1Y', direction: 'LS' },
    '{"state":"q10","symbol":"0X"}': { newState: 'q10', writeSymbol: '00', direction: 'SL' },
    '{"state":"q10","symbol":"0 "}': { newState: 'q6', writeSymbol: '0 ', direction: 'SR' },
    '{"state":"q11","symbol":"XY"}': { newState: 'q11', writeSymbol: '0Y', direction: 'LS' },
    '{"state":"q11","symbol":" Y"}': { newState: 'q12', writeSymbol: ' Y', direction: 'RS' },
    '{"state":"q12","symbol":"0Y"}': { newState: 'q12', writeSymbol: '0Y', direction: 'SR' },
    '{"state":"q12","symbol":"0 "}': { newState: 'q14', writeSymbol: '0 ', direction: 'SL' },
    '{"state":"q14","symbol":"0Y"}': { newState: 'q14', writeSymbol: '0Y', direction: 'RS' },
    '{"state":"q14","symbol":"1Y"}': { newState: 'q1', writeSymbol: '1Y', direction: 'RS' },
};

let currentState = "q0";
let tapes = [];

const getTransitionKeys = () => {
    let currentSymbols = "";

    for (let i = 0; i < totalTapes; i++) {
        const currentHead = tapes[i].head;
        const symbol = tapes[i].content[currentHead] || blankSymbol;
        currentSymbols = currentSymbols + symbol;
    }

    return JSON.stringify({ state: currentState, symbol: currentSymbols });
}

const run = () => {
    while (currentState !== finalStates) {
        const key = getTransitionKeys();

        try {
            const { newState, writeSymbol, direction } = transitions[key];
            currentState = newState;

            for (let i = 0; i < totalTapes; i++) {
                const currentNewTapeSymbol = writeSymbol[i];
                const currentTapeHead = tapes[i].head;
                const currentTapeNewDirection = direction[i];

                tapes[i].content[currentTapeHead] = currentNewTapeSymbol;

                if (currentTapeNewDirection === "R") {
                    tapes[i].head++;
                }

                if (currentTapeNewDirection === "L") {
                    tapes[i].head--;
                    if (tapes[i].head < 0) {
                        tapes[i].content.unshift(blankSymbol);
                        tapes[i].head = 0;
                    }
                }
            }
        } catch (error) {
            parentPort.postMessage({ error: `Error: Transisi tidak ditemukan untuk ${key}` });
            return;
        }
    }

    const formatTapes = () => {
        const formattedTapes = tapes.map((tape, index) => {
            const content = tape.content;
            const formattedContent = content.filter(char => char !== ' ').join('');
            return `${formattedContent}`
        });

        return formattedTapes;
    };

    parentPort.postMessage({ result: formatTapes() });
};

parentPort.on('message', (message) => {
    if (message.tapes) {
        tapes = message.tapes;
    }
    run();
});
