const fs = require('fs');
let lines = fs.readFileSync('testinput-11.txt').toString().split('\r\n');
let rows = [];
let columns = [];

for (let i = 0; i < lines.length; ++i) {
	rows.push(lines[i].trim());
	if (!lines[i].includes('#')) {
		rows.push(lines[i]);
	}
}

for (let x = 0; x < rows[0].length; ++x) {
	let col = '';
	for (let y = 0; y < rows.length; ++y) {
		col += rows[y][x];
	}
	columns.push(col);
	if (!col.includes('#')) {
		columns.push(col);
	}
}
//version that gives [0] as undefined and can probably be fixed with .trim()
// for (let j = 0; j < rows.length; ++j){
// 	for (let k = 0; k < rows[j].length; ++k){
// 		columns[k] += rows[j][k];
// 	}
// }