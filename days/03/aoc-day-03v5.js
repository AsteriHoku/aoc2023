const fs = require('fs');
let lines = fs.readFileSync('input-03.txt').toString().split('\r\n');
let sum = 0;
const symUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];
let numsToAdd = [];
//there are no symbols on the top or bottom row, so boundary accounting is unnecessary

for (let x = 0; x < lines.length; ++x) {
	for (let y = 0; y < lines[x].length; ++y) {
		if (isDigit(x, y)) {
			//console.log(`\tTEST\t${!isNaN(lines[x][y])}\t${lines[x][y]} isDigit is a number at lines[${x}][${y}]`);
			//this will be the beginning of a digit
			let num = lines[x][y];
			let max = y === lines[x].length-1 ? 1 : y === lines[x].length-2 ? 2 : 3;
			for (let i = 1; i < max; ++i){
				if (isDigit(x, y+i)){
					num += lines[x][y+i];
				}
			}
			//console.log(`******** num is ${num} ********`);
			let addToSum = checkNeighbors(x,y,num.length);
			if (addToSum){
				//console.log(`**** num ${num} had symbol neighbors ****`)
				numsToAdd.push(parseInt(num));
			}
			
			y = y+num.length;
		}
	}
}
const sumNums = numsToAdd.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
numsToAdd.forEach(n => {console.log(n)});
//console.dir(numsToAdd);
console.log(`Congratulations you've reached the end and the sum is ${sumNums}`);

function isDigit(x, y) {
	//console.log(`isDigit check for x ${x} y ${y} ==> ${lines[x][y]}`);
	return lines[x][y].charCodeAt(0) >= 48 && lines[x][y].charCodeAt(0) <= 57
}
function checkNeighbors(x, y, len){
	let start = y > 0 ? y-1 : y;
	let end = y === lines[x].length-1 ? y+len : y+len+1;
	//console.log(`start of a number is lines[${x}][${y}] ==> ${lines[x][y]}`);

	if (x > 0){
		let northNeighbors = lines[x-1].slice(start, end);
		//console.log(`north neighbors:`);
		//console.dir(northNeighbors);
		if (hasSymbolNeighbor(northNeighbors)){
			return true;
		}
	}
	if (x < lines.length-1){
		//console.log(lines[x+1].slice(start, end));
		let southNeighbors = lines[x+1].slice(start, end);
		//console.log('south neighbors:')
		//console.dir(southNeighbors);
		if (hasSymbolNeighbor(southNeighbors)){
			return true;
		}
	}
	let neighbs = lines[x].slice(start, end);
	//console.log('neighbors:')
	//console.dir(neighbs);
	return hasSymbolNeighbor(neighbs);
}

function hasSymbolNeighbor(str){
	for (let i = 0; i < str.length; ++i){
		if (symUnis.includes(str.charCodeAt(i))){
			return true;
		}
	}
	return false;
}