const fs = require('fs');
let lines = fs.readFileSync('input-08.txt').toString().split('\r\n');
let pattern = lines[0].trim();
lines = lines.map(l => l.trim()).slice(2);

const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};

//create inputs & As
const As = [];
let inputs = {};
for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const val = line.substr(0, 3);
    if (val[2] === 'A'){
        As.push(val);
    }
    const L = line.substr(7, 3);
    const R = line.substr(12, 3);
    inputs[val] = {'L': L, 'R': R};
}

//check As
console.dir(As);

//solve
let ans = runAs();
console.log(`found ans ${ans}`);

function runAs(){
    let individualSteps = [];
    for (let i = 0; i < As.length; ++i){
        individualSteps.push(runPattern(As[i]));
    }
    return findLCM(individualSteps);
}

function runPattern(p) {
    let steps = 0;
    for (let i = 0; i < pattern.length; ++i) {
        if (p[2] === 'Z') {
            return steps;
        }
        p = inputs[p][pattern[i]];
        steps++;
        if (i === pattern.length - 1) i = 0 - 1;
    }
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function findLCM(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = lcm(result, arr[i]);
    }

    return result;
}
