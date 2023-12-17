const fs = require('fs');
let patterns = fs.readFileSync('input-13.txt').toString().split('\r\n\r\n');
let sum = 0;

for (let x = 0; x < patterns.length; ++x){
	let pattern = patterns[x].split('\r\n').map(s => s.trim());		
	sum += solveForPattern(pattern);
}

console.log(`Congratulations, you've reached the end and the sum is ${sum}`);

function solveForPattern(p){
	let href = checkP(p);
	if (href){
		return href*100;
	}
	const flippedP = flipP(p);
	return checkP(flippedP);
}

function checkP(p){
	for (let i = 0; i < p.length-1; ++i){
		if (p[i] === p[i+1]) {
			let passed = checkRest(p, i);
			if (passed > 0) {
				return passed;
			}
		}
	}
}

function checkRest(p, i){
	let count = i;
	if (count >= (p.length-1-i)){
		//keep inside bounds of the array whether the line of
		//reflection is in first or second half of array
		count = p.length-2-i;
	}
	let step = 0;
	while (count > 0){
		if (p[i-(1+step)] !== p[i+(2+step)]){
			return 0;
		}
		count--;
		step++;
	}
	return i+1;
}

function flipP(arr) {
	const charArrsArr = arr.map(str => str.split(''));
	const arr90 = charArrsArr[0].map((_, colIndex) => charArrsArr.map(row => row[colIndex]));
	return arr90.map(row => row.reverse().join(''));
}
