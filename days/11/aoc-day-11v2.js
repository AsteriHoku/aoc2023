const fs = require('fs');
let lines = fs.readFileSync('testinput-11.txt').toString().split('\r\n');
let rows = [];
let columns = [];

//add horizontal
for (let i = 0; i < lines.length; ++i) {
	rows.push(lines[i].trim());
	if (!lines[i].includes('#')) {
		rows.push(lines[i]);
	}
}

//add vertical
let expandedUniverse = rows;
let indices = [];
let addedCount = 0;
for (let x = 0; x < rows[0].length; ++x) {
	let col = '';
	for (let y = 0; y < rows.length; ++y) {
		col += rows[y][x];
		if (y === rows.length-1 && !col.includes('#')){
			expandedUniverse = addColumn(expandedUniverse, x+addedCount);
			addedCount++;
		}
	}
}

function addColumn(eu, index){
	return eu.map(str => {
		return str.slice(0,index) + '.' + str.slice(index);
	})
}
let a, b;
let sum = 0;
for (let i = 0; i < expandedUniverse[0].length; ++i){
	for (let j = 0; j < expandedUniverse.length; ++j){
		if (expandedUniverse[i][j] === '#'){
			sum += getShortestPath(i, j);
		}
	}
}

//this is a combination calculation - 9 galaxies, 2 sample size = 36 combinations

//find shortest path between current galaxy and each other galaxy
//omitting looking back because it will have already been counted
function getShortestPath(i, j){
	let minSteps = Number.MAX_SAFE_INTEGER;
	let steps = 0;
	for (let x = i; x < expandedUniverse[0].length; ++x){
		for (let y = j; y < expandedUniverse.length; ++y){
			if (expandedUniverse[x][y] === '#'){
				//found next
				steps = getSteps(i, j, x, y);
				if (steps < minSteps){
					minSteps = steps;
				}
			}
			
		}
	}
	return minSteps;
}

function getSteps(i,j,x,y){
	
}

// let galaxyCount = 0;
// for (let i = 0; i < expandedUniverse.length; ++i){
// 	for (let j = 0; j < i; ++j){
// 		if (expandedUniverse[i][j] === '#'){
// 			++galaxyCount;
// 			expandedUniverse[i][j] = galaxyCount;
// 		}
// 	}
// }





// console.log('\nrows:');
// let count = 0;
// rows.forEach(row => {
// 	console.log(`row ${count}\n${row}`);
// 	count++;
// })
//
// console.log('\ncolumns:');
// let cnt = 0;
// columns.forEach(col => {
// 	console.log(`column ${cnt}\n${col}`);
// 	cnt++;
// })
