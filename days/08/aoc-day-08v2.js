class node {
	constructor(val, L, R) {
		this.val = val;
		this.L = L;
		this.R = R;
		this.next = null;
	}
}

class LinkedList{
	constructor() {
		this.head = null;
		this.length = 0;
	}
	push(line){
		const [val, L, R] = line.match(/\d+|\w+/g).map(item => item.trim());
		const n = new node(val, L, R);

		if (this.head) {
			let curr = this.head;
			while (curr.next){
				curr = curr.next;
			}
			curr.next = n;
		} else {
			this.head = n;
		}
		this.length++;
	};

	find(arg){
		//console.log(`finding for ${arg}`);
		if (this.head){
			let found = this.head;

			while (found.next){
				if (found.val === arg){
					//console.log(`found ${found.val}`);
					return found;
				}
				found = found.next;
			}
		}
		return false;
	};
}

const fs = require('fs');
let lines = fs.readFileSync('input-08.txt').toString().split('\r\n');
let pattern = lines[0].trim();
lines = lines.map(l => l.trim()).slice(2);
let ll = new LinkedList();
let steps = 0;

//create nodes & set first
for (let i = 0; i < lines.length; ++i){
	ll.push(lines[i]);
}

console.dir(ll);

let testfind = ll.find('ZZZ');
console.log(`\n\ttest node found:`);
console.dir(testfind);

let ans = runPattern();
console.log(`found ans ${ans}`);

function runPattern() {
	let current = ll.head;
	for (let i = 0; i < pattern.length; ++i) {
		//console.log(`current is ${current.val}`);
		let str = `index ${i} ${current.val}`;
		if (pattern[i] === 'L') str += ` needs L: ${current.L}`;
		if (pattern[i] === 'R') str += ` needs R: ${current.R}`;
		//console.log(str);
		if (current.val === 'NJK'){
			console.log('found prev');
		}
		if (current.val.trim() === 'ZZZ') {
			console.log(`Congratulations you've reached ZZZ in ${steps} steps`);
			return steps;
		}
		if (pattern[i] === 'L') {
			current = ll.find(current.L);
		} else {
			//console.log(`\tTEST\t---\tline24ish pattern[i] should be R: ${pattern[i]}\t---\t${pattern[i] === 'R'}`);
			current = ll.find(current.R);
		}
		steps++;
		if (i === pattern.length-1) {
			//console.log(`reached the end of the pattern - i was ${i}`);
			i = 0 - 1;
			//console.log(`and is now ${i}`);
		}
	}
}