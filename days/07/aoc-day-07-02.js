const fs = require('fs');
let lines = fs.readFileSync('input-07.txt').toString().split('\n');

let camels = [];
let sum = 0;
const charMap = {
	'A': 'm',
	'K': 'l',
	'Q': 'k',
	'T': 'j',
	'9': 'i',
	'8': 'h',
	'7': 'g',
	'6': 'f',
	'5': 'e',
	'4': 'd',
	'3': 'c',
	'2': 'b',
	'J': 'a'
};

for (const line of lines) {
	let [hand, bid] = line.split(' ');
	camels.push({hand, bid: parseInt(bid), counts: getCount(hand, card), type: getType(hand)});
}

camels.sort((a, b) => {
	if (a.type !== b.type) {
		return a.type - b.type;
	} else {
		const amap = a.hand.split('').map(char => charMap[char] || char).join('');
		const bmap = b.hand.split('').map(char => charMap[char] || char).join('');
		return amap.localeCompare(bmap);
	}
})

for (const [i, c] of camels.entries()) {
	sum += c.bid * (i + 1);
}

console.log(`Congratulations you've reached the end and the sum is ${sum}`);

function getType(hand) {
	if (/(\S)\1{4}/.test(hand)) {
		return 6;//is five
	} else {
		let counts = [];
		for (const card of hand) {
			counts.push(card, );	
		}

		let Js = counts['J'];
		if (counts.includes(4)) {
			return Js > 0 ? 6 : 5;//is four
		} else if (counts.includes(3)) {
			if (counts.includes(2)) {
				return 4;//is full
			}
			return Js === 1 ? 4 : 3;//is three
		} else if (counts.includes(2)) {
			if (counts.filter(x => x === 2).length === 4) {
				return 2;//is 2pair
			}
			return Js === 1 ? 2 : 1;//is pair
		}
		return Js === 1 ? 1 : 0;//else high card
	}
}

function getCounts(){
	
}

function getCount(hand, card) {
	let count = 0;
	for (let c of hand) {
		if (c === card) {
			count++;
		}
	}
	return {count};
}