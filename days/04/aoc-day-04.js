const fs = require('fs');
let lines = fs.readFileSync('input-04.txt').toString().split("\n");
let score = 0;
//set up recursion so once we find cardScore we can compute for the 
//appropriate number of next cards before then moving on to the next line

lines.forEach(line => {
    let nextCount = 0;
    nextCount = processCard(line);
});

function processCard() {
    let cardScore = 0;
    let numbers = line.match(/\b\d+\b(?!:)/g);
    const duplicates = numbers.filter((item, index, arr) => arr.indexOf(item) !== index);
    
    for (let x = 0; x < duplicates.length; ++x) {
        cardScore = cardScore === 0 ? 1 : cardScore * 2;
    }

    return cardScore;
}

//part
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
