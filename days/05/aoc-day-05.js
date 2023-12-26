const fs = require('fs');
let maps = fs.readFileSync('testinput-05.txt').toString().split('\r\n\r\n');

//source-to-destination
//[0] = destination range start
//[1] = source range start
//[2] = range length
const seeds = maps[0].split(' ');
seeds.forEach(s => {console.log(s)});

let map = [];
for (let i = 1; i < maps.length; ++i) {
	let lines = maps[i].split('\r\n');
	let values = [];
	for (let li = 1; li < lines.length; ++li) {
		let v = lines[li].split(' ');
		values.push({
			dStart: parseInt(v[0]),
			dEnd: parseInt(v[0]) + parseInt(v[2]),
			sStart: parseInt(v[1]),
			sEnd: parseInt(v[1]) + parseInt(v[2])
		});
	}
	console.log(`${lines[0]}`);
	values.forEach(v => {
		console.dir(v)
	});
	map.push(values);
}

console.log(`\t\tmap is:`);
console.dir(map);

//for each seed, find destination value for next item in map array
//if there is none, it is the same value

for (let si = 1; si < seeds.length; ++si){
	let curr = parseInt(seeds[si]);
	// curr = getSoil(curr);
	// curr = getFertilizer(curr);
	// curr = getWater(curr);
}

for (let mi = 0; mi < map.length; ++mi) {

}