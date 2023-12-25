const fs = require('fs');
let lines = fs.readFileSync('input-03.txt').toString().split('\r\n').map(str => str.split(''));
const symUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
let sum = 0;

for (let x = 0; x < lines.length; ++x) {
	for (let y = 0; y < lines[x].length; ++y) {
		if (symUnis.includes(lines[x][y].charCodeAt(0))) {
			sum += solveForNeighbors(x, y);
		}
	}
}

console.log(`Congratulations you've reached the end with b and the sum is ${sum}`);

function solveForNeighbors(x, y) {
	let neighborSum = 0;
	let northLine = lines[x - 1].slice(y - 3, y + 4).join('');
	let southLine = lines[x + 1].slice(y - 3, y + 4).join('');

	neighborSum += solveForNorth(northLine);
	neighborSum += solveForSouth(southLine);
	neighborSum += solveInline(x, y);

	return neighborSum;
}

function isDigit(char) {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function getNumFromString(str, index) {
	let result = "";

	for (let i = index; i >= 0; i--) {
		if (/\d/.test(str[i])) {
			result = `${str[i]}${result}`;
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

function solveForNorth(northLine) {
	let northSum = 0;
	if (isDigit(northLine[3])) {
		//middle is a digit
		let foo = getNumFromString(northLine, 3);
		if (isNaN(parseInt(foo))) {
			console.error(`isNaN for foo ${foo}`);
		} else {
			northSum += parseInt(foo);
		}
	} else {
		if (isDigit(northLine[2])) {
			let numOne = getNumFromString(northLine, 2);
			if (isNaN(parseInt(numOne))) {
				console.error(`isNaN for partOne ${numOne}`);
			} else {
				northSum += parseInt(numOne);
			}
		}
		if (isDigit(northLine[4])) {
			let numTwo = getNumFromString(northLine, 4);
			if (isNaN(parseInt(numTwo))) {
				console.error(`isNaN for partOne ${numTwo}`);
			} else {
				northSum += parseInt(numTwo);
			}
		}
	}
	return northSum;
}

function solveForSouth(southLine){
	let southSum = 0;
	if (!isDigit(southLine[3])) {
		if (isDigit(southLine[2])) {
			let numOne = getNumFromString(southLine, 2);
			if (isNaN(parseInt(numOne))) {
				console.error(`isNaN for partOne ${numOne}`);
			} else {
				southSum += parseInt(numOne);
			}
		}
		if (isDigit(southLine[4])) {
			let numTwo = getNumFromString(southLine, 4);
			if (isNaN(parseInt(numTwo))) {
				console.error(`isNaN for partOne ${numTwo}`);
			} else {
				southSum += parseInt(numTwo);
			}
		}
	} else {
		//middle is a digit
		let baz = getNumFromString(southLine, 3);
		if (isNaN(parseInt(baz))) {
			console.error(`isNaN for foo ${baz}`);
		} else {
			southSum += parseInt(baz);
		}
	}
	return southSum;
}

function solveInline(x, y) {
	let inLineSum = 0;
	if (isDigit(lines[x][y - 1])) {
		//solve for left of symbol
		let left = lines[x].slice(y - 3, y).join('').match(/\d/g).join('');
		if (isNaN(parseInt(left))) {
			console.error(`isNan for left ${left}`);
		} else {
			inLineSum += parseInt(left);
		}
	}
	if (isDigit(lines[x][y + 1])) {
		//solve for right of symbol
		let right = lines[x].slice(y + 1, y + 4).join('').match(/\d/g).join('');
		if (isNaN(parseInt(right))) {
			console.error(`isNan for right ${right}`);
		} else {
			inLineSum += parseInt(right);
		}
	}
	return inLineSum;
}