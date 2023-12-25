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

	//todo get the full possible string, if the middle is not a digit, split on it and add left & right
	//if the middle is a digit then get the value of it between symbols
	//if y-1 from it is not a digit, then it's the start of the number
	//if y-1 is a digit, then it's the end or middle of a number
	let northLine = blines[x - 1].slice(y - 3, y + 4).join('');
	let southLine = blines[x + 1].slice(y - 3, y + 4).join('');
	// console.log(northLine);
	// console.log(southLine);
	//north
	if (!anyIsDigit(northLine[3])) {
		// if (anyIsDigit(northLine[2])) {
		// 	let partOne = northLine.substring(0, 2);
		// 	let numOne = partOne.match(/\d/g).join('');
		// 	if (isNaN(parseInt(numOne))) {
		// 		console.log(`isNaN for partOne ${numOne}`);
		// 	} else {
		// 		neighborSum += parseInt(numOne);
		// 	}
		// }
		// if (anyIsDigit(northLine[4])) {
		// 	let partTwo = northLine.substring(4);
		// 	let numTwo = partTwo.match(/\d/g).join('');
		// 	if (isNaN(parseInt(numTwo))) {
		// 		console.log(`isNaN for partOne ${numTwo}`);
		// 	} else {
		// 		neighborSum += parseInt(numTwo);
		// 	}
		// }
		//add to sum
	} else {
		//middle is a digit, find start and end and sum
		//change logic to check the north middle first, then different logic applies and can use a shorter string
		// let n = northLine.slice(1, -1);
		// console.log(`middle is a digit so northLine ${northLine} is now ${n}`);
		//todo if x, y-1 is a digit, getNum(str, 3)
		let foo = getNumFromString(northLine, 3);
		console.log(`got ${foo} from northLine ${northLine}`);
	}
	//south
	if (!anyIsDigit(southLine[3])) {
		if (anyIsDigit(southLine[2])) {
			let partOne = southLine.substring(0, 2);
			let numOne = partOne.match(/\d/g).join('');
			if (isNaN(parseInt(numOne))) {
				console.log(`isNaN for partOne ${numOne}`);
			} else {
				neighborSum += parseInt(numOne);
			}
		}
		if (anyIsDigit(southLine[4])) {
			let partTwo = southLine.substring(4);
			let numTwo = partTwo.match(/\d/g).join('');
			if (isNaN(parseInt(numTwo))) {
				console.log(`isNaN for partOne ${numTwo}`);
			} else {
				neighborSum += parseInt(numTwo);
			}
		}
		//add to sum
	} else {
		//middle is a digit, find start and end and sum
	}

	if (bisDigit(x, y - 1)) {
		//solve for left of symbol
		let left = blines[x].slice(y - 3, y - 1).join('').match(/\d/g);
		if (isNaN(parseInt(left))) {
			console.error(`isNan for left ${left}`);
		} else {
			neighborSum += parseInt(left);
		}
	}
	if (bisDigit(x, y + 1)) {
		//solve for right of symbol
		let right = blines[x].slice(y + 1, y + 3).join('').match(/\d/g);
		if (isNaN(parseInt(right))) {
			console.error(`isNan for right ${right}`);
		} else {
			neighborSum += parseInt(right);
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

	// Iterate to the left of the specified index
	for (let i = index; i >= 0; i--) {
		if (/\d/.test(str[i])) {
			result = str[i] + result;
		} else {
			break; // Stop if a non-digit character is encountered
		}
	}

	// Iterate to the right of the specified index
	for (let i = index + 1; i < str.length; i++) {
		if (/\d/.test(str[i])) {
			result += str[i];
		} else {
			break; // Stop if a non-digit character is encountered
		}
	}

	return result;
}