const fs = require('fs');
let lines = fs.readFileSync('input-03.txt').toString().split('\r\n');
let sum = 0;
const symUnis = [35, 36, 37, 38, 42, 43, 45, 47, 61, 64];

for (let x = 0; x < lines.length; ++x) {
	for (let y = 0; y < lines[x].length; ++y) {
		if (isDigit(x, y)) {
			let num = lines[x][y];
			let max = y === lines[x].length-1 ? 1 : y === lines[x].length-2 ? 2 : 3;
			for (let i = 1; i < max; ++i){
				if (isDigit(x, y+i)){
					num += lines[x][y+i];
				}
			}
			if (checkNeighbors(x,y,num.length)){
				sum += parseInt(num);
			}
			
			y = y+num.length;
		}
	}
}

console.log(`Congratulations you've reached the end and the sum is ${sum}`);

function isDigit(x, y) {
	return lines[x][y].charCodeAt(0) >= 48 && lines[x][y].charCodeAt(0) <= 57
}

function checkNeighbors(x, y, len){
	const start = y > 0 ? y-1 : y;
	const end = y === lines[x].length-1 ? y+len : y+len+1;

	if (x > 0){
		const northNeighbors = lines[x-1].slice(start, end);
		if (hasSymbolNeighbor(northNeighbors)){
			return true;
		}
	}
	if (x < lines.length-1){
		const southNeighbors = lines[x+1].slice(start, end);
		if (hasSymbolNeighbor(southNeighbors)){
			return true;
		}
	}
	const neighbs = lines[x].slice(start, end);
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