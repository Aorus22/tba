const transitions = {
    '{"state":"q0","symbol":"1B"}': { newState: 'q0', writeSymbol: '00', direction: 'RR' },
    '{"state":"q0","symbol":"1B"}': { newState: 'q1', writeSymbol: '1B', direction: 'RL' },

    '{"state":"q1","symbol":"00"}': { newState: 'q1', writeSymbol: '00', direction: 'RS' },
    '{"state":"q1","symbol":"0Y"}': { newState: 'q1', writeSymbol: '0Y', direction: 'RS' },
    '{"state":"q1","symbol":"B0"}': { newState: 'q2', writeSymbol: 'B0', direction: 'LS' },
    '{"state":"q1","symbol":"BY"}': { newState: 'q2', writeSymbol: 'BY', direction: 'LS' },

    '{"state":"q2","symbol":"00"}': { newState: 'q3', writeSymbol: 'B0', direction: 'LS' },
    '{"state":"q2","symbol":"0Y"}': { newState: 'q3', writeSymbol: 'BY', direction: 'LS' },
    '{"state":"q2","symbol":"10"}': { newState: 'q13', writeSymbol: '10', direction: 'SS' },
    '{"state":"q2","symbol":"1Y"}': { newState: 'q13', writeSymbol: '1Y', direction: 'SS' },

    '{"state":"q3","symbol":"00"}': { newState: 'q3', writeSymbol: '00', direction: 'LS' },
    '{"state":"q3","symbol":"10"}': { newState: 'q3', writeSymbol: '10', direction: 'LS' },
    '{"state":"q3","symbol":"0Y"}': { newState: 'q3', writeSymbol: '0Y', direction: 'LS' },
    '{"state":"q3","symbol":"1Y"}': { newState: 'q3', writeSymbol: '1Y', direction: 'LS' },
    '{"state":"q3","symbol":"B0"}': { newState: 'q4', writeSymbol: 'B0', direction: 'RS' },
    '{"state":"q3","symbol":"BY"}': { newState: 'q4', writeSymbol: 'BY', direction: 'RS' },

    '{"state":"q4","symbol":"00"}': { newState: 'q5', writeSymbol: 'B0', direction: 'RS' },
    '{"state":"q4","symbol":"0Y"}': { newState: 'q5', writeSymbol: 'BY', direction: 'RS' },

    '{"state":"q5","symbol":"00"}': { newState: 'q5', writeSymbol: '00', direction: 'SL' },
    '{"state":"q5","symbol":"0Y"}': { newState: 'q5', writeSymbol: '00', direction: 'SL' },
    '{"state":"q5","symbol":"0X"}': { newState: 'q5', writeSymbol: '00', direction: 'SL' },
    '{"state":"q5","symbol":"0B"}': { newState: 'q6', writeSymbol: 'XB', direction: 'RR' },

    '{"state":"q6","symbol":"00"}': { newState: 'q7', writeSymbol: '0X', direction: 'SR' },
    '{"state":"q6","symbol":"0Y"}': { newState: 'q9', writeSymbol: 'XY', direction: 'RS' },

    '{"state":"q7","symbol":"00"}': { newState: 'q7', writeSymbol: '00', direction: 'SR' },
    '{"state":"q7","symbol":"0Y"}': { newState: 'q7', writeSymbol: '0Y', direction: 'SR' },
    '{"state":"q7","symbol":"0B"}': { newState: 'q8', writeSymbol: '0Y', direction: 'SL' },

    '{"state":"q8","symbol":"00"}': { newState: 'q8', writeSymbol: '00', direction: 'SL' },
    '{"state":"q8","symbol":"0Y"}': { newState: 'q8', writeSymbol: '0Y', direction: 'SL' },
    '{"state":"q8","symbol":"0X"}': { newState: 'q6', writeSymbol: '0X', direction: 'SR' },

    '{"state":"q9","symbol":"0Y"}': { newState: 'q10', writeSymbol: '0Y', direction: 'SL' },
    '{"state":"q9","symbol":"1Y"}': { newState: 'q11', writeSymbol: '1Y', direction: 'LS' },

    '{"state":"q10","symbol":"0X"}': { newState: 'q10', writeSymbol: '00', direction: 'SL' },
    '{"state":"q10","symbol":"0B"}': { newState: 'q6', writeSymbol: '0B', direction: 'SR' },

    '{"state":"q11","symbol":"XY"}': { newState: 'q11', writeSymbol: '0Y', direction: 'LS' },
    '{"state":"q11","symbol":"BY"}': { newState: 'q12', writeSymbol: 'BY', direction: 'RS' },

    '{"state":"q12","symbol":"0Y"}': { newState: 'q12', writeSymbol: '0Y', direction: 'SR' },
    '{"state":"q12","symbol":"0B"}': { newState: 'q1', writeSymbol: '0B', direction: 'SL' },

}