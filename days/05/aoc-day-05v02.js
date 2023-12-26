const fs = require('fs');
let maps = fs.readFileSync('testinput-05.txt').toString().split('\r\n\r\n');
let map = [];
for (let i = 1; i < maps.length; ++i) {
	let lines = maps[i].split('\r\n');
	let values = [];
	for (let li = 1; li < lines.length; ++li) {
		let v = lines[li].split(' ');
		values.push({
			dStart: parseInt(v[0]),
			//dEnd: parseInt(v[0]) + parseInt(v[2])-1,
			sStart: parseInt(v[1]),
			sEnd: parseInt(v[1]) + parseInt(v[2])-1,
			//range: parseInt(v[2])
		});
	}
	map.push(values);
}

console.log('maps complete - starting seeds')
const seedsv1 = maps[0].split(' ');
const seeds = [];
for (let si = 1; si < seedsv1.length; si = si+2){
	for (let range = 0; range < seedsv1[si+1]; ++range){
		seeds.push(parseInt(seedsv1[si])+range);
	}
}
console.log('seeds complete');
//seeds.forEach(s => {console.log(s)});

//for each seed, find destination value for next item in map array
//if there is none, it is the same value
let lowestLoc = Number.MAX_SAFE_INTEGER;
for (let si = 1; si < seeds.length; ++si){
	let curr = seeds[si];
	//console.log(`\tsolving for seed ${curr}`);
	for (let mi = 0; mi < map.length; ++mi){
		curr = getNext(curr, mi);
	}
	if (curr < lowestLoc){
		lowestLoc = curr;
	}
}

console.log(`Congratulations you have reached the end and the lowest location is ${lowestLoc}`);

function getNext(source, index){
	// console.log(`map[${index}]:`);
	// console.dir(map[index]);
	const srcMap = map[index];
	for (let i = 0; i < srcMap.length; ++i){
		if (source >= srcMap[i].sStart && source <= srcMap[i].sEnd){
			//console.log(`source ${source} goes to dest ${srcMap[i].dStart + (source - srcMap[i].sStart)}`);
			return srcMap[i].dStart + (source - srcMap[i].sStart);
		}
	}
	return source;
}