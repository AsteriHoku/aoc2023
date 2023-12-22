const fs = require('fs');
let lines = fs.readFileSync('input-08.txt').toString().split('\r\n');
let pattern = lines[0].trim();
lines = lines.map(l => l.trim()).slice(2);

const t2 = performance.now();
let inputs = {};
for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const val = line.substr(0, 3);
    const L = line.substr(7, 3);
    const R = line.substr(12, 3);
    inputs[val] = {'L': L, 'R': R};
}

let steps = 0;
let current = 'AAA';

let ans = runPattern();
console.log(`found ans ${ans}`);

function runPattern() {
    for (let i = 0; i < pattern.length; ++i) {
        //console.log(`finding for ${pattern[i]}`);
        //console.log(`current val: ${current} L: ${inputs[current].L} R: ${inputs[current].R}`);
		
        if (current === 'ZZZ') {
            console.log(`Congratulations you've reached ZZZ in ${steps} steps`);
            return steps;
        }
        current = inputs[current][pattern[i]];
        steps++;
        if (i === pattern.length - 1) i = 0 - 1;
    }
}