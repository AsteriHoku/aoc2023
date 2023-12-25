const fs = require('fs');
let blines = fs.readFileSync('input-03.txt').toString().split('\r\n').map(str => str.split(''));
let bsum = 0;
const bsymUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
let bnumsToAdd = [];

for (let x = 0; x < blines.length; ++x) {
	for (let y = 0; y < blines[x].length; ++y) {
		if (bsymUnis.includes(blines[x][y].charCodeAt(0))) {
			//console.log(`found ${blines[x][y]} at ${x},${y}`);
			bsum += solveForNeighbors(x, y);
		}
	}
}

const sumv2 = bnumsToAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(`sumv2 ${sumv2}`);
console.log(`Congratulations you've reached the end with b and the bsum is ${bsum}`);

function solveForNeighbors(x, y) {
	//todo I may have to account for 4 digit numbers
	let neighborSum = 0;
	
	let northLine = blines[x - 1].slice(y - 3, y + 4).join('');
	let southLine = blines[x + 1].slice(y - 3, y + 4).join('');
	// console.log(northLine);
	// console.log(southLine);
	
	//north
	if (!anyIsDigit(northLine[3])) {
		if (anyIsDigit(northLine[2])) {
			let numOne = getNumFromString(northLine, 2);
			console.log(`got ${numOne} from left of ${northLine}`);
			if (isNaN(parseInt(numOne))) {
				console.error(`isNaN for partOne ${numOne}`);
			} else {
				neighborSum += parseInt(numOne);
				bnumsToAdd.push(parseInt(numOne));
			}
		}
		if (anyIsDigit(northLine[4])) {
			let numTwo = getNumFromString(northLine, 4);
			console.log(`got ${numTwo} from right of ${northLine}`)
			if (isNaN(parseInt(numTwo))) {
				console.error(`isNaN for partOne ${numTwo}`);
			} else {
				neighborSum += parseInt(numTwo);
				bnumsToAdd.push(parseInt(numTwo));
			}
		}
//		add to sum
	} else {
		let foo = getNumFromString(northLine, 3);
		console.log(`got ${foo} from middle of northLine ${northLine}`);
		if (isNaN(parseInt(foo))){
			console.error(`isNaN for foo ${foo}`);
		} else {
			neighborSum += parseInt(foo);
			bnumsToAdd.push(parseInt(foo));
		}
	}
	//south
	if (!anyIsDigit(southLine[3])) {
		if (anyIsDigit(southLine[2])) {
			let numOne = getNumFromString(southLine, 2);
			console.log(`got ${numOne} from left of ${southLine}`);
			if (isNaN(parseInt(numOne))) {
				console.error(`isNaN for partOne ${numOne}`);
			} else {
				neighborSum += parseInt(numOne);
				bnumsToAdd.push(parseInt(numOne));
			}
		}
		if (anyIsDigit(southLine[4])) {
			let numTwo = getNumFromString(southLine, 4);
			console.log(`got ${numTwo} from right of ${southLine}`)
			if (isNaN(parseInt(numTwo))) {
				console.error(`isNaN for partOne ${numTwo}`);
			} else {
				neighborSum += parseInt(numTwo);
				bnumsToAdd.push(parseInt(numTwo));
			}
		}
		//add to sum
	} else {
		//middle is a digit, find start and end and sum
		let baz = getNumFromString(southLine, 3);
		console.log(`got ${baz} from southLine ${southLine}`);
		if (isNaN(parseInt(baz))){
			console.error(`isNaN for foo ${baz}`);
		} else {
			neighborSum += parseInt(baz);
			bnumsToAdd.push(parseInt(baz));
		}
	}

	console.log(`middle line is ${blines[x].slice(y-3,y+4).join('')}`);
	if (bisDigit(x, y - 1)) {
		//solve for left of symbol
		let left = blines[x].slice(y - 3, y).join('').match(/\d/g).join('');
		console.log(`solving for left of symbol ==> x, y-1 is a digit and got ${left}`);
		if (isNaN(parseInt(left))) {
			console.error(`isNan for left ${left}`);
		} else {
			neighborSum += parseInt(left);
			bnumsToAdd.push(parseInt(left))
		}
	}
	if (bisDigit(x, y + 1)) {
		//solve for right of symbol
		let right = blines[x].slice(y + 1, y + 4).join('').match(/\d/g).join('');
		console.log(`solving for right of symbol ${blines[x][y]} ==> x, y+1 is a digit and got ${right}`);
		if (isNaN(parseInt(right))) {
			console.error(`isNan for right ${right}`);
		} else {
			neighborSum += parseInt(right);
			bnumsToAdd.push(parseInt(right));
		}
	}

	return neighborSum;
}

function bisDigit(x, y) {
	return blines[x][y].charCodeAt(0) >= 48 && blines[x][y].charCodeAt(0) <= 57;
}

function anyIsDigit(char) {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function getNumFromString(str, index) {
	let result = "";
	
	for (let i = index; i >= 0; i--) {
		if (/\d/.test(str[i])) {
			result = str[i] + result;
		} else {
			break;
		}
	}
	
	for (let i = index + 1; i < str.length; i++) {
		if (/\d/.test(str[i])) {
			result += str[i];
		} else {
			break;
		}
	}

	return result;
}