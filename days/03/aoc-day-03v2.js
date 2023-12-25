const fs = require('fs');
let lines = fs.readFileSync('testinput-03.txt').toString().split('\r\n');
lines = lines.map(str => str.split(''));

console.dir(lines);
let sum = 0;
const symbolUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
//numUnicodes range 48-57

for (let x = 0; x < lines.length; ++x) {
	for (let y = 0; y < lines[x].length; ++y) {
        // if (!isDigit(x,y) && !symbolUnis.includes(lines[x][y].charCodeAt(0)) && lines[x][y] !== '.'){
        //     console.log(lines[x][y])
        // }
		if (x === 3 && y > 20){
			console.log('found the #');
		}
		if (symbolUnis.includes(lines[x][y].charCodeAt(0))) {
			//console.log(`found symbol ${lines[x][y].charAt(0)} at ${x},${y}`);
			sum += findNeighbors(x, y);
			//console.log(`sum is now ${sum}`);
		}
	}
}

console.log(`Congratulations you've reached the end and the sum is ${sum}`);

function findNeighbors(x, y) {
	console.log(`finding neighbors for x ${x} y ${y}`);
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
    //console.dir(neighbors);
    let nsum = 0;
    for (let i = 0; i < neighbors.length; ++i){
		console.log(`neighbors[${i}][0] is ${neighbors[i][0]} neighbors[${i}][1] is ${neighbors[i][1]}`)
        if (isDigit(neighbors[i][0], neighbors[i][1])){
            let a = addToSum(neighbors[i][0], neighbors[i][1]);
			nsum += a;
			console.log(`adding ${nsum}`);
		}
    }
	return nsum;
}

function isDigit(x, y) {
	//console.log(`isDigit x ${x} y ${y}`);
	return lines[x][y].charCodeAt(0) >= 48 && lines[x][y].charCodeAt(0) <= 57
}

//2,6
function addToSum(x, y) {
	let num = '';
	let nonDigitCount = 0;
    let foundStart = false;
	let start = y - 2;
	let end = y + 2;
    let omitIndexStart = 0;
	for (let i = start; i <= end; ++i) {
		if (!isDigit(x, i)) {
            if (foundStart) break;
			nonDigitCount++;
		} else {
            if (!foundStart){
                foundStart = true;
                omitIndexStart = i;
            }
			num += lines[x][i];
		}
	}
    //console.log(`num is ${num} and lines[x] is ${lines[x]}`);
    for (let j = omitIndexStart; j < omitIndexStart+num.length; ++j){
        lines[x][j] = '.';
    }
    //console.log(`lines[x] is now ${lines[x]}`);
    
	return parseInt(num);
}