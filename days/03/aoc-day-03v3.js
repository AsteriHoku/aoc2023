const fs = require('fs');
let lines = fs.readFileSync('input-03.txt').toString().split('\r\n').map(str => str.split(''));
let sum = 0;
const symUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
let sumNums = [];
//there are no symbols on the top or bottom row, so boundary accounting is unnecessary

for (let x = 0; x < lines.length; ++x) {
	for (let y = 0; y < lines[x].length; ++y) {
		if (symUnis.includes(lines[x][y].charCodeAt(0))) {
			sum += findNeighbors(x, y);
		}
	}
}
sumNums.forEach(n => {console.log(n)});
console.log(sumNums.length);
console.log(`Congratulations you've reached the end and the sum is ${sum}`);

function findNeighbors(x, y) {
    let neighbors = [
        [x-1,y-1],
        [x-1,y],
        [x-1,y+1],
        [x,y-1],
        [x,y+1],
        [x+1,y-1],
        [x+1,y],
        [x+1,y+1]
    ]

    let nsum = 0;
    for (let i = 0; i < neighbors.length; ++i){
        if (isDigit(neighbors[i][0], neighbors[i][1])){
            let a = addToSum(neighbors[i][0], neighbors[i][1]);
			sumNums.push(a);
			nsum += a;
			//console.log(`adding ${a}`);
		}
    }
	return nsum;
}

function isDigit(x, y) {
	return lines[x][y].charCodeAt(0) >= 48 && lines[x][y].charCodeAt(0) <= 57
}

function addToSum(x, y) {
	let num = '';
    let foundStart = false;
    let omitIndexStart = 0;
	for (let i = (y-2); i <= (y+2); ++i) {
		if (!isDigit(x, i)) {
            if (foundStart) break;
		} else {
            if (!foundStart){
                foundStart = true;
                omitIndexStart = i;
            }
			num += lines[x][i];
		}
	}
	removeAccountedNumber(x, omitIndexStart, num);
	return parseInt(num);
}

function removeAccountedNumber(x, o, num){
	for (let j = o; j < o+num.length; ++j){
		lines[x][j] = '.';
	}
}