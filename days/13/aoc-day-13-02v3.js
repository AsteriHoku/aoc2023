const fs = require('fs');
let blocks = fs.readFileSync('testinput-13.txt').toString().split('\r\n\r\n');
let sum = 0;

// for (let x = 0; x < patterns.length; ++x){
// 	let pattern = patterns[x].split('\r\n').map(s => s.trim());		
// 	sum += solveForPattern(pattern);
// }
//
// console.log(`Congratulations, you've reached the end and the sum is ${sum}`);

// requires `bun` instead of node
// running: bun index.js (runs test.txt as input)
// or: bun index.js input_file.txt
// const f = Bun.file(process.argv.length === 3 ? process.argv.pop() : './test.txt');
//
// const contents = (await f.text()).trim();
//
// console.log('Day 13! -- Mirrors');
//
// // break into puzzles
// const blocks = contents.split('\n\n');
const puzzles = {};

//console.log(contents);
let score = 0;

// prepare puzzles into rows/cols
// it's rows by default, so only cols need to be built
for ( let p = 0; p < blocks.length; ++p ) {
	puzzles[p] = { num: p, contents: blocks[p].split('\r\n').map(s => s.trim()), 'rows': blocks[p].split('\r\n'), cols: [] };

	// create columns
	for ( let c = 0; c < puzzles[p].rows[0].length; ++c ) {
		let col = '';
		for ( let y = 0; y < puzzles[p].rows.length; ++y ) {
			col += puzzles[p].rows[y][c];
		}

		puzzles[p].cols.push(col);
	}

	score += find_mirror(puzzles[p]);

	//console.log('done with puzzle', p);

	console.log(p, 'SCORE:', score);
}

function find_mirror(puzzle) {
	//console.log(puzzle.num);
	//console.log(puzzle.contents);
	let found = false;

	// search rows
	row:
		for ( let i = 0; i < puzzle.rows.length - 1; ++i ) {
			if ( puzzle.rows[i] == puzzle.rows[i + 1] ) {
				found = true;
				//console.log('row',i,puzzle.rows[i],puzzle.rows[i+1]);
				const arr1 = puzzle.rows.slice(0,i+1);
				const arr2 = puzzle.rows.slice(i+1);

				//console.log('compares', arr1, arr2);
				while ( arr1.length && arr2.length ) {
					const line1 = arr1.pop();
					const line2 = arr2.shift();
					//console.log('     ', i,line1, line2, line1 == line2, arr1.length, arr2.length);

					if ( line1 != line2 ) {
						//console.log('FALSE ROW', puzzle.num, i, line1, line2);
						found = false;
						continue row;
					}
				}
				//console.log(i,i+1,cur,puzzle.rows[i+1]);
			}

			if ( found ) {
				puzzle.mirror = i;
				puzzle.mirror_dir = 'horizontal';
				puzzle.score = (i+1) * 100;
				return puzzle.score;
			}
		}

	// search cols
	col:
		for ( let i = 0; i < puzzle.cols.length - 1; ++i ) {
			if ( puzzle.cols[i] == puzzle.cols[i + 1] ) {
				found = true;
				//console.log('col',i,puzzle.rows[i],puzzle.rows[i+1]);
				const arr1 = puzzle.cols.slice(0,i+1);
				const arr2 = puzzle.cols.slice(i+1);

				//console.log('compares', arr1, arr2);
				let inp = 0;
				while ( arr1.length && arr2.length ) {
					inp -= 1;
					const line1 = arr1.pop();
					const line2 = arr2.shift();
					//console.log('     ', i,line1, line2, line1 == line2, arr1.length, arr2.length);

					if ( line1 != line2 ) {
						//console.log('FALSE COL', puzzle.num, i, inp+i, line1, line2);
						found = false;
						continue col;
					}
				}
				//console.log(i,i+1,cur,puzzle.rows[i+1]);
			}
			if ( found ) {
				puzzle.mirror = i;
				puzzle.mirror_dir = 'vertical';
				puzzle.score = (i+1);
				return puzzle.score;
			}
		}

	console.error(puzzle);
	throw new Error('What the heck? No match?');
	return false;
}


///////




//
//
//
//
//
//
//
//
//
//
//
// function solveForPattern(p){
// 	console.log(`og pattern is ${p}`);
// 	let {p2, href} = checkP(p);
// 	if (href > 0) {
// 		console.log(`og pattern scored ${href*100}`);
// 		return href*100;
// 	}
// 	if (href === 0){
// 		console.log(`pattern was updated and is now ${p2}`);
// 		let {p3, href2} = checkP(p2);
// 		if (href2 > 0){
// 			console.log(`pattern p2 scored ${href2*100}`);
// 			return href2*100;	
// 		}
// 	}
// 	//const flippedP = flipP(p);
// 	//return checkP(flippedP);
// }
//
// function checkP(p){
// 	for (let i = 0; i < p.length-1; ++i){
// 		if (p[i] === p[i+1]) {
// 			let step = 0;
// 			let count = i;
// 			if (count >= (p.length-1-i)){
// 				count = p.length-2-i;
// 			}
// 			let ret = 0;
// 			while (count > 0){
// 				let lineA = p[i-(1+step)];
// 				let lineB = p[i+(2+step)];
// 				if (lineA !== lineB){
// 					let {diff, index} = getDiff(lineA, lineB);
// 					if (diff !== 1){
// 						console.log(`found difference of 1 for ${lineA} and ${lineB}`);
// 						p[i-(1+step)][index] = p[i+(2+step)][index];
// 						console.log(`they are now ${p[i-(1+step)]} and ${p[i-(1+step)]}`);
// 						return {p, ret};
// 					}
// 				}
// 				count--;
// 				step++;
// 			}
// 			ret = i+1;
// 			return {p, ret};
// 		}
// 	}
// }
//
// function getDiff(a, b){
// 	let index = 0;
// 	let count = 0;
// 	for (let k = 0; k < a.length; ++k){
// 		if (a[k] !== b[k]){
// 			count++;
// 			index = k;
// 		}
// 	}
// 	return {count, index};
// }
//
// function checkRest(p, i){
// 	let count = i;
// 	if (count >= (p.length-1-i)){
// 		count = p.length-2-i;
// 	}
// 	let step = 0;
// 	while (count > 0){
// 		let lineA = p[i-(1+step)];
// 		let lineB = p[i+(2+step)];
// 		if (lineA !== lineB){
// 			//console.log('checking for further matches in checkRest and the next check does not match');
// 			console.log('found lines that do not match');
// 			//console.log(`${p[i-(1+step)]}\tcomparing to\t${p[i+(2+step)]}`);
// 			let {diff, index} = getDiff(lineA, lineB);
// 			if (diff !== 1){
// 				//return 0;
// 				p[i][index] = p[i+1][index];
// 				console.log(`they are now ${p[i]} and ${p[i+1]}`);
// 				//todo sarah rewrite everything so I can dump this into solveForPattern(p);
// 			}
// 		}
// 		count--;
// 		step++;
// 	}
// 	return i+1;
// }
//
// function flipP(arr) {
// 	const charArrsArr = arr.map(str => str.split(''));
// 	const arr90 = charArrsArr[0].map((_, colIndex) => charArrsArr.map(row => row[colIndex]));
// 	return arr90.map(row => row.reverse().join(''));
// }
