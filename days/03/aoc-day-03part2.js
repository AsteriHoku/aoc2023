const fs = require('fs');
let lines = fs.readFileSync('input-03.txt').toString().split('\r\n').map(str => str.split(''));
let sum = 0;

for (let x = 0; x < lines.length; ++x) {
	for (let y = 0; y < lines[x].length; ++y) {
		if (lines[x][y] === '*') {
			sum += solveForNeighbors(x, y);
		}
	}
}

console.log(`Congratulations you've reached the end and the sum is ${sum}`);

function solveForNeighbors(x, y) {
	let nums = [];
	let northLine = lines[x - 1].slice(y - 3, y + 4).join('');
	let southLine = lines[x + 1].slice(y - 3, y + 4).join('');

	nums = solveForNorth(northLine, nums);
	nums = solveForSouth(southLine, nums);
	nums = solveInline(x, y, nums);

	return nums.length === 2 ? (nums[0] * nums[1]) : 0;
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

function solveForNorth(northLine, nums) {
	if (isDigit(northLine[3])) {
		let foo = getNumFromString(northLine, 3);
		nums.push(parseInt(foo));
	} else {
		if (isDigit(northLine[2])) {
			let numOne = getNumFromString(northLine, 2);
			nums.push(parseInt(numOne));
		}
		if (isDigit(northLine[4])) {
			let numTwo = getNumFromString(northLine, 4);
			nums.push(parseInt(numTwo));
		}
	}
	return nums;
}

function solveForSouth(southLine, nums) {
	if (isDigit(southLine[3])) {
		let baz = getNumFromString(southLine, 3);
		nums.push(parseInt(baz));
	} else {
		if (isDigit(southLine[2])) {
			let numOne = getNumFromString(southLine, 2);
			nums.push(parseInt(numOne));
		}
		if (isDigit(southLine[4])) {
			let numTwo = getNumFromString(southLine, 4);
			nums.push(parseInt(numTwo));
		}
	}
	return nums;
}

function solveInline(x, y, nums) {
	if (isDigit(lines[x][y - 1])) {
		//solve for left of symbol
		let left = lines[x].slice(y - 3, y).join('').match(/\d/g).join('');
		nums.push(parseInt(left));
	}
	if (isDigit(lines[x][y + 1])) {
		//solve for right of symbol
		let right = lines[x].slice(y + 1, y + 4).join('').match(/\d/g).join('');
		nums.push(parseInt(right));
	}
	return nums;
}