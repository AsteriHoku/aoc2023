const fs = require('fs');
let blines = fs.readFileSync('input-03.txt').toString().split('\r\n').map(str => str.split(''));
let bsum = 0;
const bsymUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
let bnumsToAdd = [];
const missed = ['5', '0', '83', '9', '49', '68', '4'];

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

	let northLine = blines[x - 1].slice(y - 1, y + 2).join('');
	let southLine = blines[x + 1].slice(y - 1, y + 2).join('');
	console.log(northLine);
	console.log(southLine);

	//if entire thing is a number can we dump out? are numbers longer than 3 digits?

	if (!anyIsDigit(northLine[1])) {
		//middle char is not a digit, so upper left and upper right need to be accounted for
		if (anyIsDigit(northLine[0])) {

		}
		if (anyIsDigit(northLine[2])) {

		}
	} else {


	}

	if (!anyIsDigit(southLine[1])) {
		//middle char is not a digit, so upper left and upper right need to be accounted for
		if (anyIsDigit(southLine[0])) {

		}
		if (anyIsDigit(southLine[2])) {

		}
	} else {


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

	//todo sarah neighbors on same line need different logic
	//todo holy fuck just go back to replacing the entire number with itself 
	// but be sure to clear out the rest like I am here
	//let nsum = 0;
	// for (let i = 0; i < northSouthIndices.length; ++i){
	// 	if (bisDigit(northSouthIndices[i][0], northSouthIndices[i][1])){
	// 		let a = addToSum(northSouthIndices[i][0], northSouthIndices[i][1]);
	// 		if (isNaN(a)){
	// 			console.log(`a isNaN with ${a} at ${x},${y}`)
	// 		}
	// 		// if (numsToAdd.includes(a)){
	// 		// 	// console.log(`sumNums had ${a}`);
	// 		// } else {
	// 		// 	console.log(`numsToAdd did not have ${a} at ${neighbors[i][0]},${neighbors[i][1]}`);
	// 		// }
	// 		//console.log(`adding ${a} from ${x},${y}`);
	// 		bnumsToAdd.push(a);
	// 		nsum += a;
	// 		console.log(`adding ${a}\t\tnsum now ${nsum}`);
	// 	}
	// }
	return neighborSum;
}

function bisDigit(x, y) {
	return blines[x][y].charCodeAt(0) >= 48 && blines[x][y].charCodeAt(0) <= 57;
}

function anyIsDigit(char) {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

//cases to account for
//first char is a digit followed by a non-digit
// --> if there are other digits I still need to continue
// --> if there are not other digits then I have my num

//i can strip away symbols then I only have . and digits
//string split with anything that is a symbol
//then I'm adding
function addToSum(x, y) {
	let num = getNumString(x, y);
	// let num = '';
	// let numString = getNumString(x,y);
	// let numCount = numString.match(/\d/g).join('').length;
	// if (numCount === 1){
	// 	console.log(`found a single digit`);
	// }
	// let i = getStartIndex(x,y);
	// let foundStart = false;
	// let omitIndexStart = 0;
	// for (let i = (y-2); i <= (y+2); ++i) {
	// 	if (!bisDigit(x, i)) {
	// 		if (blines[x][i] === '.' && num.length === 1){
	// 			//reset, we only found 1 digit
	// 			num = '';
	// 			foundStart = false;
	// 			omitIndexStart = 0;
	// 		}
	// 		if (foundStart) break;
	// 	} else {//foundstart is wrong if it gets to a . and num is 1 digit
	// 		//so if I keep this logic, then check next and it's not a digit
	// 		//if !isDigit && num.length === 1 => then 
	// 		// => foundStart = false
	// 		// => omitIndexStart = 0
	// 		// can I switch this logic so that foundStart is only true if num.length > 0 ?
	// 		if (!foundStart){
	// 			foundStart = true;
	// 			omitIndexStart = i;
	// 		}
	// 		num += blines[x][i];
	// 		if (numCount === 1) break;
	// 	}
	// }
	// if (missed.includes(num)){
	// 	console.log(`found a missed number ${num} at ${x},${y}`);
	// }
	// //console.log(`blines[x] was ${blines[x]}`);
	// removeAccountedNumber(x, omitIndexStart, num);
	// //console.log(`and is now ${blines[x]}`);
	if (isNaN(parseInt(num))) {
		console.log(`num isNaN with ${num} at ${x},${y}`)
	}
	return parseInt(num);
}

function getNumString(x, y) {
	let str = blines[x].slice(y - 2, y + 3).join('');
	while (isNaN(parseInt(str[0]))) {
		str = str.substring(1);
	}
	let endIndex = 0;
	for (let i = 0; i < str.length; i++) {
		if (isNaN(parseInt(str[i]))) {
			endIndex = i;
			break;
		}
	}
	return str.substring(0, endIndex);
}

// function getStartIndex(x,y){
// 	if (blines[x][y-1])
// }

function removeAccountedNumber(x, o, num) {
	for (let j = o; j < o + num.length; ++j) {
		blines[x][j] = '.';
	}
}