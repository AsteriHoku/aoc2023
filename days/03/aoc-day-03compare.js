const fs = require('fs');
// let lines = fs.readFileSync('input-03.txt').toString().split('\r\n');
// let sum = 0;
// const symUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
// let numsToAdd = [];
// //there are no symbols on the top or bottom row, so boundary accounting is unnecessary
//
// for (let x = 0; x < lines.length; ++x) {
// 	for (let y = 0; y < lines[x].length; ++y) {
// 		if (isDigit(x, y)) {
// 			//console.log(`\tTEST\t${!isNaN(lines[x][y])}\t${lines[x][y]} isDigit is a number at lines[${x}][${y}]`);
// 			//this will be the beginning of a digit
// 			let num = lines[x][y];
// 			let max = y === lines[x].length-1 ? 1 : y === lines[x].length-2 ? 2 : 3;
// 			for (let i = 1; i < max; ++i){
// 				if (isDigit(x, y+i)){
// 					num += lines[x][y+i];
// 				}
// 			}
// 			if (num === '348'){
// 				console.log('found 348');
// 			}
// 			//console.log(`******** num is ${num} ********`);
// 			let addToSum = checkNeighbors(x,y,num.length);
// 			if (addToSum){
// 				//console.log(`**** num ${num} had symbol neighbors ****`)
//				
// 				numsToAdd.push(parseInt(num));
// 			}
//
// 			y = y+num.length;
// 		}
// 	}
// }
// const sumNums = numsToAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// //numsToAdd.forEach(n => {console.log(n)});
// //console.dir(numsToAdd);
// console.log(`Congratulations you've reached the end with numsToAdd and the sum is ${sumNums}`);
//
// function isDigit(x, y) {
// 	//console.log(`isDigit check for x ${x} y ${y} ==> ${lines[x][y]}`);
// 	return lines[x][y].charCodeAt(0) >= 48 && lines[x][y].charCodeAt(0) <= 57
// }
// function checkNeighbors(x, y, len){
// 	let start = y > 0 ? y-1 : y;
// 	let end = y === lines[x].length-1 ? y+len : y+len+1;
// 	//console.log(`start of a number is lines[${x}][${y}] ==> ${lines[x][y]}`);
//
// 	if (x > 0){
// 		let northNeighbors = lines[x-1].slice(start, end);
// 		//console.log(`north neighbors:`);
// 		//console.dir(northNeighbors);
// 		if (hasSymbolNeighbor(northNeighbors)){
// 			return true;
// 		}
// 	}
// 	if (x < lines.length-1){
// 		//console.log(lines[x+1].slice(start, end));
// 		let southNeighbors = lines[x+1].slice(start, end);
// 		//console.log('south neighbors:')
// 		//console.dir(southNeighbors);
// 		if (hasSymbolNeighbor(southNeighbors)){
// 			return true;
// 		}
// 	}
// 	let neighbs = lines[x].slice(start, end);
// 	//console.log('neighbors:')
// 	//console.dir(neighbs);
// 	return hasSymbolNeighbor(neighbs);
// }
//
// function hasSymbolNeighbor(str){
// 	for (let i = 0; i < str.length; ++i){
// 		if (symUnis.includes(str.charCodeAt(i))){
// 			return true;
// 		}
// 	}
// 	return false;
// }

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
	// if (x === 14 && y === 135){
	// 	console.log('this should be the @ at 14,135');
	// 	for (let p = 130; p < 141; ++p){
	// 		console.log(blines[13][p]);
	// 	}
	// 	for (let p = 130; p < 141; ++p){
	// 		console.log(blines[14][p]);
	// 	}
	// 	for (let p = 130; p < 141; ++p){
	// 		console.log(blines[15][p]);
	// 	}
	// }

	let neighborIndices = [
		[x-1,y-1],
		[x-1,y],
		[x-1,y+1],
		[x,y-1],
		[x,y+1],
		[x+1,y-1],
		[x+1,y],
		[x+1,y+1]
	]
	
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

	let nsum = 0;
	for (let i = 0; i < neighborIndices.length; ++i){
		if (bisDigit(neighborIndices[i][0], neighborIndices[i][1])){
			let a = addToSum(neighborIndices[i][0], neighborIndices[i][1]);
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


function addToSum(x, y) {
	let num = '';
	let foundStart = false;
	let omitIndexStart = 0;
	for (let i = (y-2); i <= (y+2); ++i) {
		if (!bisDigit(x, i)) {
			if (blines[x][i] === '.' && num.length === 1){
				//reset, we only found 1 digit
				num = '';
				foundStart = false;
				omitIndexStart = 0;
			}
			if (foundStart) break;
		} else {//foundstart is wrong if it gets to a . and num is 1 digit
			//so if I keep this logic, then check next and it's not a digit
			//if !isDigit && num.length === 1 => then 
			// => foundStart = false
			// => omitIndexStart = 0
			// can I switch this logic so that foundStart is only true if num.length > 0 ?
			if (!foundStart){
				foundStart = true;
				omitIndexStart = i;
			}
			num += blines[x][i];
		}
	}
	if (missed.includes(num)){
		console.log(`found a missed number ${num} at ${x},${y}`);
	}
	//console.log(`blines[x] was ${blines[x]}`);
	removeAccountedNumber(x, omitIndexStart, num);
	//console.log(`and is now ${blines[x]}`);
	if (isNaN(parseInt(num))){
		console.log(`num isNaN with ${a} at ${x},${y}`)
	}
	return parseInt(num);
}

function removeAccountedNumber(x, o, num){
	for (let j = o; j < o+num.length; ++j){
		blines[x][j] = '.';
	}
}