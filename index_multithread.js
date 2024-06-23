import { Worker } from'worker_threads';
import chalk from "chalk";
import readline from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = (query) => {
    return new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));
}

const totalTapes = 2;
const blankSymbol = " ";
let tapes = [];

const addTapes = (tapeContent = [""]) => {
    for (let i = 0; i < totalTapes; i++) {
        const currentContent = [...tapeContent[i]];
        const currentTape = {
            content: currentContent,
            head: 0
        };
        tapes.push(currentTape);
    }
}

const generateString = (m, n) => '0'.repeat(m) + '1' + '0'.repeat(n-1);

const main = async () => {
    const m = await getInput('Masukkan m: ');
    const n = await getInput('Masukkan n: ');

    addTapes([generateString(m, n), "   "]);

    const worker = new Worker('./worker.js');
    worker.postMessage({ tapes });

    worker.on('message', (message) => {
        if (message.error) {
            console.error(message.error);
        } else if (message.result) {
            console.log(message.result[1].length);
        }
        rl.close();
    });

    worker.on('error', (error) => {
        console.error(error);
        rl.close();
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
        rl.close();
    });
};

main();
