const fs = require('fs');
let lines = fs.readFileSync('input-08.txt').toString().split('\r\n');
let pattern = lines[0].trim();
lines = lines.map(l => l.trim()).slice(2);
const objArr = lines.map(str => {
	const [val, L, R] = str.match(/\d+|\w+/g).map(item => item.trim());
	return {val, L, R};
});
let steps = 0;
let current = objArr[0];
let ans = runPattern();
console.log(`found ans ${ans}`);

function runPattern() {
	for (let i = 0; i < pattern.length; ++i) {
		//console.log(`finding for ${pattern[i]}`);
		//console.log(`current val: ${current.val} L: ${current.L} R: ${current.R}`);

		if (current.val === 'ZZZ') {
			console.log(`Congratulations you've reached ZZZ in ${steps} steps`);
			return steps;
		}
		if (pattern[i] === 'L') {
			current = objArr.find(x => x.val === current.L);

		} else {
			//console.log(`\tTEST\t---\tline24ish pattern[i] should be R: ${pattern[i]}\t---\t${pattern[i] === 'R'}`);
			current = objArr.find(x => x.val === current.R);
		}
		steps++;
		if (i === pattern.length - 1) i = 0-1;
	}
}

class node {
	constructor(L, R) {
		this.L = L;
		this.R = R;
	}
}