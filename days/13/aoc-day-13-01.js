const fs = require('fs');
let patterns = fs.readFileSync('input-13.txt').toString().split('\r\n\r\n');
let sum = 0n;

//test
let testPatterns = fs.readFileSync('testinput-13.txt').toString().split('\r\n\r\n');

//solve

for (let x = 0; x < patterns.length; ++x){
	let pattern = patterns[x].split('\r\n');
	pattern = pattern.map(s => s.trim());
	console.log('solving for:');
	pattern.forEach(str => console.log(str));
	let patternScore = solveForPattern(pattern);
	if (!patternScore){
		console.log(`\t\t---> ERROR\tno score was found for patterns[${x}]`);
	} else {
		console.log(`pattern ${x+1} scored ${patternScore}`);
		sum += BigInt(patternScore);
	}
}

console.log(`Congratulations, you've reached the end and the sum is ${sum}`);

function solveForPattern(p){
	let pscore = checkP(p);
	if (pscore > 0){
		return pscore*100;
	}
	console.log('no horizontal match found');
	const flippedP = flipP(p);
	pscore = checkP(flippedP);
	if (pscore > 0){
		return pscore;
	}
}

function checkP(p){
	for (let i = 0; i < p.length-1; ++i){
		if (p[i] === p[i+1]) {
			// found a reflection, check further
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
		count--;//keep inside bounds of the array
	}
	let step = 0;
	while (count > 0){
		if (p[i-(1+step)] !== p[i+(2+step)]){
			//console.log('checking for further matches in checkRest and the next check does not match');
			//console.log(`${p[i-(1+step)]}\tcomparing to\t${p[i+(2+step)]}`);
			return 0;
		}
		count--;
		step++;
	}
	return i+1;
}

function flipP(arr) {
	console.log('transposing p:');

	let charArrsArr = arr.map(str => str.split(''));
	const tranChars = charArrsArr[0].map((_, colIndex) => charArrsArr.map(row => row[colIndex]));
	const arr90 = tranChars.map(row => row.reverse().join(''));
	
	console.log('transposed p is now:');
	arr90.forEach(str => console.log(`\t${str}`));
	return arr90;
}
