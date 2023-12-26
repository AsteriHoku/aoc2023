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

console.log(`Congratulations you've reached the end and the sum is ${sum}`);

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
	let res = "";

	for (let i = index; i >= 0; --i) {
		if (isDigit(str[i])) {
			res = `${str[i]}${res}`;
		} else break;
	}

	for (let i = index + 1; i < str.length; ++i) {
		if (isDigit(str[i])) {
			res += str[i];
		} else break;
	}

	return res;
}

function solveForNorth(northLine) {
	let northSum = 0;
	if (isDigit(northLine[3])) {
		//middle is a digit
		const foo = getNumFromString(northLine, 3);
		northSum += parseInt(foo);
	} else {
		if (isDigit(northLine[2])) {
			const numOne = getNumFromString(northLine, 2);
			northSum += parseInt(numOne);
		}
		if (isDigit(northLine[4])) {
			const numTwo = getNumFromString(northLine, 4);
			northSum += parseInt(numTwo);
		}
	}
	return northSum;
}

function solveForSouth(southLine) {
	let southSum = 0;
	if (isDigit(southLine[3])) {
		//middle is a digit
		const baz = getNumFromString(southLine, 3);
		southSum += parseInt(baz);
	} else {
		if (isDigit(southLine[2])) {
			const numOne = getNumFromString(southLine, 2);
			southSum += parseInt(numOne);
		}
		if (isDigit(southLine[4])) {
			const numTwo = getNumFromString(southLine, 4);
			southSum += parseInt(numTwo);
		}
	}
	return southSum;
}

function solveInline(x, y) {
	let inLineSum = 0;
	if (isDigit(lines[x][y - 1])) {
		const left = lines[x].slice(y - 3, y).join('').match(/\d/g).join('');
		inLineSum += parseInt(left);
	}
	if (isDigit(lines[x][y + 1])) {
		const right = lines[x].slice(y + 1, y + 4).join('').match(/\d/g).join('');
		inLineSum += parseInt(right);
	}
	return inLineSum;
}