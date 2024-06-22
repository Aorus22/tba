import TuringMachine from './TuringMachine.js';

const addOneConfig = {
    states: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    inputAlphabet: ['0', '1'],
    tapeAlphabet: ['0', '1', 'X', 'Y', ' '],
    transitions: {
        '{"state":"0","symbol":["1"]}': { newState: ['0'], writeSymbol: ['1'], direction: ['R'] },
        '{"state":"0","symbol":["0"]}': { newState: ['0'], writeSymbol: ['0'], direction: ['R'] },
        '{"state":"0","symbol":["X"]}': { newState: ['7'], writeSymbol: ['X'], direction: ['L'] },
        '{"state":"0","symbol":[" "]}': { newState: ['1'], writeSymbol: [' '], direction: ['L'] },
        
        '{"state":"1","symbol":["1"]}': { newState: ['2'], writeSymbol: [' '], direction: ['L'] },
        '{"state":"1","symbol":["0"]}': { newState: ['3'], writeSymbol: ['X'], direction: ['L'] },
        
        '{"state":"2","symbol":["0"]}': { newState: ['2'], writeSymbol: [' '], direction: ['L'] },
        
        '{"state":"3","symbol":["1"]}': { newState: ['3'], writeSymbol: ['1'], direction: ['L'] },
        '{"state":"3","symbol":["0"]}': { newState: ['3'], writeSymbol: ['0'], direction: ['L'] },
        '{"state":"3","symbol":[" "]}': { newState: ['4'], writeSymbol: [' '], direction: ['R'] },
        
        '{"state":"4","symbol":["0"]}': { newState: ['0'], writeSymbol: [' '], direction: ['R'] },
        '{"state":"4","symbol":["1"]}': { newState: ['5'], writeSymbol: [' '], direction: ['R'] },
        
        '{"state":"5","symbol":["Y"]}': { newState: ['5'], writeSymbol: ['0'], direction: ['R'] },
        '{"state":"5","symbol":["X"]}': { newState: ['5'], writeSymbol: [' '], direction: ['R'] },
        '{"state":"5","symbol":[" "]}': { newState: ['6'], writeSymbol: [' '], direction: ['R'] },
        '{"state":"5","symbol":["0"]}': { newState: ['5'], writeSymbol: [' '], direction: ['R'] },
        
        '{"state":"7","symbol":["Y"]}': { newState: ['7'], writeSymbol: ['Y'], direction: ['L'] },
        '{"state":"7","symbol":["1"]}': { newState: ['8'], writeSymbol: ['1'], direction: ['R'] },
        '{"state":"7","symbol":["0"]}': { newState: ['3'], writeSymbol: ['X'], direction: ['L'] },
        
        '{"state":"8","symbol":[" "]}': { newState: ['7'], writeSymbol: ['Y'], direction: ['L'] },
        '{"state":"8","symbol":["Y"]}': { newState: ['8'], writeSymbol: ['Y'], direction: ['R'] },
        '{"state":"8","symbol":["X"]}': { newState: ['8'], writeSymbol: ['0'], direction: ['R'] },
    },
    initialState: '0',
    blankSymbol: ' ',
    finalStates: ['6']
};

function runTuringMachine(input1) {
    const tm = new TuringMachine(addOneConfig);
    tm.addTapes([input1]);

    try {
        return tm.run(); 
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

console.log('Test Case 1:', runTuringMachine('000000100'));