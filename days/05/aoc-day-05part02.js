const fs = require('fs');
let maps = fs.readFileSync('input-05.txt').toString().split('\r\n\r\n');
let map = [];
for (let i = 1; i < maps.length; ++i) {
	let lines = maps[i].split('\r\n');
	let values = [];
	for (let li = 1; li < lines.length; ++li) {
		let v = lines[li].split(' ');
		values.push({
			dStart: parseInt(v[0]),
			sStart: parseInt(v[1]),
			sEnd: parseInt(v[1]) + parseInt(v[2])-1,
		});
	}
	map.push(values);
}

const seedsv1 = maps[0].split(' ');
const seeds = [];
for (let si = 1; si < seedsv1.length; si = si+2){
	seeds.push([parseInt(seedsv1[si]), parseInt(seedsv1[si+1])]);
}

let lowestLoc = Number.MAX_SAFE_INTEGER;
for (let si = 0; si < seeds.length; ++si){
	for (let range = 0; range < seeds[si][1]; ++range){
		let curr = seeds[si][0]+range;
		for (let mi = 0; mi < map.length; ++mi){
			curr = getNext(curr, mi);
		}
		if (curr < lowestLoc){
			lowestLoc = curr;
		}
	}
}

console.log(`Congratulations you have reached the end and the lowest location is ${lowestLoc}`);

function getNext(source, index){
	const srcMap = map[index];
	for (let i = 0; i < srcMap.length; ++i){
		if (source >= srcMap[i].sStart && source <= srcMap[i].sEnd){
			return srcMap[i].dStart + (source - srcMap[i].sStart);
		}
	}
	return source;
}