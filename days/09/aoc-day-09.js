//tree?

const fs = require('fs');
let lines = fs.readFileSync('testinput-09.txt').toString().split('\r\n');

for (let li = 0; li < lines.length; ++li){
	let items = lines[li].split(' ').map(e => parseInt(e));
	let sequence = getSequence(items);
	if (getZeros(sequence) === sequence.length){
		//is all 0s
	}
}

function getSequence(arr){
	let seq = [];
	for (let ai = 1; ai < arr.length; ++ai){
		seq.push(arr[ai] - arr[ai-1])
	}
	return seq;
}
function getZeros(arr){
	return arr.reduce((count, item) => (item === target ? count + 1 : count), 0);
}