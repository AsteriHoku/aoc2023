const fs = require('fs');
let lines = fs.readFileSync('input-13.txt').toString().split("\n");

//test
let testLines = [
    '..#..#.###..#',
    '.###.#...#..#',
    '..#.###.#####',
    '.##..##.#.##.',
    '.##..##.#.##.',
    '#.##.#.',
    '.####.#',
    '',
    '.#...####.##..#',
    '..#.###...#.##.',
];

//lines = testLines;
lines = lines.map((line) => line.trim());
let sum = 0n;

//solve
for (let x = 0; x < lines.length-1; ++x){
    if (lines[x] != null && lines[x] !== '') {
        let lineScore = 0n;
        lineScore += BigInt(solveHorizontal(x) ?? 0);
        lineScore += BigInt(solveVertical(x) ?? 0);

        if (lineScore !== BigInt(0)){
            console.log(`lineScore is ${lineScore}`);
        }

        if (lineScore !== 0n) {
            sum += lineScore;
            console.log(`sum currently ${sum}`);
        }
        
        if (x === 1221){
            console.log(`\t\t\tTEST\t\t${lines[x] === '#.##...'}`);
            console.log(`\t\t\tTEST\t\t${lineScore === BigInt((x+1)*100)}`);
        }
    }
}

//account for last here to avoid a check for every single other line (if !last)
const last = solveVertical(lines.length-1) ?? 0;
console.log(`\t\t\tTEST\t\t${lines[lines.length-1] === '#.....#....'}`);
console.log(`\t\t\tTEST\t\t${last === 0}`);
sum += BigInt(last);
console.log(`Congratulations you've reached the end and the sum is ${sum}`);




function solveHorizontal(index){
    if (lines[index] === lines[index+1]){
        console.log(`\thorizontal match at index ${index} for ${lines[index]} and ${lines[index+1]} -- adding ${((index+1)*100)}`);
        return ((index+1)*100);
    }
}

function solveVertical(index){
    let line = lines[index];
    if (line.length % 0 === 0){
        let i = (line.length/2)+1;
        let pattern = line.substring(0, i);
        let match = line.substring(i+1);
        match = match.split('').reverse().join('');
        if (pattern === match){
            console.log(`\tvertical match - line was ${line} -- adding ${i}`);
            return i;
        }
    } else {
        let j = Math.floor(line.length/2);
        //check first
        if (line[j] === line[j+1]){
            let pattern = line.substring(0, j);
            let match = line.substring(j, j+(pattern.length));
            match = match.split('').reverse().join('');
            if (pattern === match){
                console.log(`\tvertical match - line was ${line} -- and adding ${j}`);
                return j;
            }
        }
        //check second
        if (line[j+1] === line[j+2]){
            let pattern = line.substring(0, j+1);
            let match = line.substring(j+1, j+1+(pattern.length));
            match = match.split('').reverse().join('');
            if (pattern === match){
                console.log(`\tvertical match - line was ${line} -- and adding ${j+1}`);
                return j+1;
            }
        }
    }
}
