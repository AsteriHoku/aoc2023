const fs = require('fs');
let lines = fs.readFileSync('testinput-03.txt').toString().split('\r\n');
let arr = lines;

arr.forEach(l => {
    console.log(l);
});

const symbolUnicodes = [35, 36, 37, 38, 42];
//numUnicodes range 48-57

for (let x = 0; x < lines.length; ++x){
    for (let y = 0; y < lines[x].length; ++y){
        if (isDigit(x, y)){
            let element = lines[x].charAt(y);
            console.log(`digit element found at index ${x},${y} and is ${element}`);
            let num = '';
            let count = 0;
            while (isDigit(x, y+count)){
                count++;
                num += element;
                element = lines[x].charAt(y+count);
                console.log(`num now ${num} and element now ${element}`);
            }
            for (let i = 0; i < num.length; ++i){
                console.log(`adding num ${num} to arr at ${x},${y+i}`);
                arr[x][y+i] = num;
                console.log(`\tTEST\t${arr[x][y+i] === num}\tarr[x][y+i] should be num`)
            }
            y = y+count+1;
            // console.log(lines[x].charCodeAt(y));
            // console.log(`\tTEST\t${/^\d$/i.test(lines[x][y])}\tchar at lines[${x}][${y}] should be a digit. Char is ${lines[x][y]}`);
            // console.log(`\tTEST\t${lines[x][y] === lines[x].charAt(y)}\tlines[x][y] === lines[x].charAt(y)`)
        }
    }
}

arr.forEach(l => {
    console.log(l);
});

function isDigit(x, y){
    return lines[x].charCodeAt(y) >= 48 && lines[x].charCodeAt(y) <= 57
}

function addToArr(x,y){
    
}