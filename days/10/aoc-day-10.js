const fs = require('fs');
const charArr = fs.readFileSync('testinput-v1-10.txt').toString().replaceAll('\r','').split('\n');

console.log(typeof charArr);
console.dir(charArr);


//find s
//find - or | from it (it has to have one or the other)

//if below is L, go down & right
//if left is L, go left & up
