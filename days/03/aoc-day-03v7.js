const fs = require('fs');
let blines = fs.readFileSync('input-03.txt').toString().split('\r\n').map(str => str.split(''));
let bsum = 0;
const bsymUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
let bnumsToAdd = [];
const missed = ['5','0','83','9','49','68','4'];

for (let x = 0; x < blines.length; ++x) {
	for (let y = 0; y < blines[x].length; ++y) {
		if (bsymUnis.includes(blines[x][y].charCodeAt(0))) {
			//console.log(`found ${blines[x][y]} at ${x},${y}`);
			bsum += findNeighbors(x, y);
		}
	}
}
// bnumsToAdd.forEach(n => {
// 	if (!sumNums.includes(n)){ console.log(n)}
// });
// numsToAdd.forEach(n => {
// 	if (!bnumsToAdd.includes(n)){ console.log(`bnums did not have ${n}`)};
// })
// console.log(`numsToAdd has ${numsToAdd.length}`);
// console.log(`bnumsToAdd has ${bnumsToAdd.length}`);
//bnums was previously 1079

const sumv2 = bnumsToAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(`sumv2 ${sumv2}`);
console.log(`Congratulations you've reached the end with b and the bsum is ${bsum}`);

function findNeighbors(x, y) {

	let northSouthIndices = [
		[x-1,y-1],
		[x-1,y],
		[x-1,y+1],
		[x+1,y-1],
		[x+1,y],
		[x+1,y+1]
	]
		// 	[x,y-1]
		// [x,y+1]
	
	
	// let neighbors = [
	// 	blines[x-1][y-1],
	// 	blines[x-1][y],
	// 	blines[x-1][y+1],
	// 	blines[x][y-1],
	// 	blines[x][y+1],
	// 	blines[x+1][y-1],
	// 	blines[x+1][y],
	// 	blines[x+1][y+1]
	// ];

	//todo sarah neighbors on same line need different logic
	//todo holy fuck just go back to replacing the entire number with itself 
	// but be sure to clear out the rest like I am here
	let nsum = 0;
	for (let i = 0; i < northSouthIndices.length; ++i){
		if (bisDigit(northSouthIndices[i][0], northSouthIndices[i][1])){
			let a = addToSum(northSouthIndices[i][0], northSouthIndices[i][1]);
			if (isNaN(a)){
				console.log(`a isNaN with ${a} at ${x},${y}`)
			}
			// if (numsToAdd.includes(a)){
			// 	// console.log(`sumNums had ${a}`);
			// } else {
			// 	console.log(`numsToAdd did not have ${a} at ${neighbors[i][0]},${neighbors[i][1]}`);
			// }
			//console.log(`adding ${a} from ${x},${y}`);
			bnumsToAdd.push(a);
			nsum += a;
			console.log(`adding ${a}\t\tnsum now ${nsum}`);
		}
	}
	return nsum;
}

function bisDigit(x, y) {
	return blines[x][y].charCodeAt(0) >= 48 && blines[x][y].charCodeAt(0) <= 57
}

//cases to account for
//first char is a digit followed by a non-digit
// --> if there are other digits I still need to continue
// --> if there are not other digits then I have my num

//i can strip away symbols then I only have . and digits
//string split with anything that is a symbol
//then I'm adding
function addToSum(x, y) {
	let num = getNumString(x,y);
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
	if (isNaN(parseInt(num))){
		console.log(`num isNaN with ${num} at ${x},${y}`)
	}
	return parseInt(num);
}

function getNumString(x,y){
	let str = blines[x].slice(y-2, y+3).join('');
	while (isNaN(parseInt(str[0]))){
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

function removeAccountedNumber(x, o, num){
	for (let j = o; j < o+num.length; ++j){
		blines[x][j] = '.';
	}
}