const fs = require('fs');
let lines = fs.readFileSync('input-04.txt').toString().split("\n");
let lineCounts = new Array(lines.length).fill(1);

console.log(`Congratulations you've reached the end and the answer is ${Solve(lines, lineCounts)}`);
function Solve(lines, lineCounts){
    for (let x = 0; x < lines.length; ++x){
        for (let y = 0; y < lineCounts[x]; ++y){
            let nextCount = processCard(lines[x]);
            
            for (let z = 1; z < nextCount+1; ++z){
                lineCounts[x+z]++;
            }
        }
    }

    return lineCounts.reduce(function (a,b) {
        return a+b;
    }, 0);
}
function processCard(line) {
    let numbers = line.match(/\b\d+\b(?!:)/g);
    const duplicates = numbers.filter((item, index, arr) => arr.indexOf(item) !== index);

    return duplicates.length;
}



//part 1
// const fs = require('fs');
// let lines = fs.readFileSync('input-04.txt').toString().split("\n");
// let score = 0;

// lines.forEach(line => {
//     let cardScore = 0;
//     let numbers = line.match(/\b\d+\b(?!:)/g);
//     const duplicates = numbers.filter((item, index, arr) => arr.indexOf(item) !== index);
    
//     for (let x = 0; x < duplicates.length; ++x) {
//         cardScore = cardScore === 0 ? 1 : cardScore * 2;
//     }

//     score += cardScore;
// });
