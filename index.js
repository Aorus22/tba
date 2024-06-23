import chalk from "chalk";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = (query) => {
    return new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));
}

const finalStates = "q15"
const totalTapes = 2
const blankSymbol = " "

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

    '{"state":"q13","symbol":"1Y"}': { newState: 'q13', writeSymbol: '10', direction: 'SL' },
    '{"state":"q13","symbol":"1X"}': { newState: 'q13', writeSymbol: '10', direction: 'SL' },
    '{"state":"q13","symbol":"10"}': { newState: 'q15', writeSymbol: '10', direction: 'SS' },
    '{"state":"q13","symbol":"1 "}': { newState: 'q15', writeSymbol: '1 ', direction: 'SS' },

    '{"state":"q16","symbol":"0 "}': { newState: 'q16', writeSymbol: '0 ', direction: 'LS' },
    '{"state":"q16","symbol":"1 "}': { newState: 'q16', writeSymbol: '1 ', direction: 'LS' },
    '{"state":"q16","symbol":"  "}': { newState: 'q0', writeSymbol: '  ', direction: 'RS' },

    '{"state":"q17","symbol":"0 "}': { newState: 'q16', writeSymbol: '  ', direction: 'LS' },
    '{"state":"q17","symbol":"1 "}': { newState: 'q16', writeSymbol: '1 ', direction: 'LS' },

    '{"state":"q18","symbol":"0 "}': { newState: 'q18', writeSymbol: '0 ', direction: 'RS' },
    '{"state":"q18","symbol":"1 "}': { newState: 'q18', writeSymbol: '1 ', direction: 'RS' },
    '{"state":"q18","symbol":"  "}': { newState: 'q17', writeSymbol: '  ', direction: 'LS' },


}


let currentState = "q18"
const tapes = [
    // {
    //     content: ["0", "0", "0", "0", "0", "0", "1", "0", "0"],
    //     head: 0
    // },
]; 

const addTapes = (tapeContent = [""]) => {
    for (let i = 0; i < totalTapes; i++) {
        const currentContent = [...tapeContent[i]]
        const currentTape = {
            content: currentContent,
            head: 0
        }
        tapes.push(currentTape)
    }
}

const getTransitionKeys = () => {
    let currentSymbols = ""

    for (let i = 0; i < totalTapes; i++){
        const currentHead = tapes[i].head
        const symbol = tapes[i].content[currentHead] || blankSymbol
        currentSymbols = currentSymbols + symbol
    }

    return JSON.stringify({ state: currentState, symbol: currentSymbols });
}

const visualizeTape = () => {
    tapes.forEach((tape) => {
        const content = tape.content.map((char, index) => {
            if (index === tape.head) {
                return chalk.red(char); 
            } else {
                return char;
            }
        }).filter(char => char !== ' ').join('');
        
        console.log(content);
    });
    console.log("")
} 

const run = (isVisualize) => {
    while (currentState !== finalStates) {

        if(isVisualize){visualizeTape()};
    
        const key = getTransitionKeys();
    
        try {
            const { newState, writeSymbol, direction } = transitions[key];
            // console.log(`${newState} - ${writeSymbol} - ${direction}`)
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
            console.error(`Error: Transisi tidak ditemukan untuk ${key}`);
            break; 
        }
    }

    const formatTapes = () => {
        const formattedTapes = tapes.map((tape, index) => {
            const content = tape.content;
            const formattedContent = content.filter(char => char !== ' ').join('');
            return `${formattedContent}`
        });
    
        return formattedTapes
    };

    return formatTapes()
}

const generateString = (m, n) => '0'.repeat(m) + '1' + '0'.repeat(n);

const main = async () => {
    const m = await getInput('Masukkan m: ');
    const n = await getInput('Masukkan n: ');
    
    addTapes([generateString(m, n), "   "])
    const result = run(false)
    console.log(result[1].length)

    rl.close();
};

main()

