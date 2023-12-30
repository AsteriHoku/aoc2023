const fs = require('fs');
const lines = fs.readFileSync().toString().split('\r\n');
let sum = 0;

// # = number
for (let i = 0; i < lines.length; ++i){
	let records = lines[i].split('');
	let numRecord = records[1].split(',');
	let arrangements = 0;
	for (let pi = 0; pi < records[0].length; ++pi){
		//match pattern record to number record
		
		//find first section in pattern record that matches first num record
		sum += arrangements;
	}
}

console.log(`Congratulations! Your sum of possible arrangements is ${sum}`);