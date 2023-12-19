const fs = require('fs');
let patterns = fs.readFileSync('testinput-13.txt').toString().split('\r\n\r\n');
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
			let score = checkRest(p, i);
			if (score > 0) {
				return score;
			}
		}
	}
}

function getDiff(a, b){
	let index = 0;
	let count = 0;
	for (let k = 0; k < a.length; ++k){
		if (a[k] !== b[k]){
			count++;
			index = k;
		}
	}
	return {count, index};
}

function checkRest(p, i){
	let count = i;
	if (count >= (p.length-1-i)){
		count = p.length-2-i;
	}
	let step = 0;
	while (count > 0){
		let lineA = p[i-(1+step)];
		let lineB = p[i+(2+step)];
		if (lineA !== lineB){
			//console.log('checking for further matches in checkRest and the next check does not match');
			console.log('found lines that do not match');
			//console.log(`${p[i-(1+step)]}\tcomparing to\t${p[i+(2+step)]}`);
			let {diff, index} = getDiff(lineA, lineB);
			if (diff !== 1){
				//return 0;
				p[i][index] = p[i+1][index];
				console.log(`they are now ${p[i]} and ${p[i+1]}`);
				//todo sarah rewrite everything so I can dump this into solveForPattern(p);
			}
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
