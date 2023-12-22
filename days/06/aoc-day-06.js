//Time:      7  15   30
//Distance:  9  40  200
const races = []

let raceWays1 = solveForRace(7, 9);
console.log(raceWays1);
console.log(`Race 1 should be 4 ${raceWays1 === 4}`);

let raceWays2 = solveForRace(15, 40);
console.log(raceWays2);
console.log(`Race 2 should be 8 ${raceWays2 === 8}`);

let raceWays3 = solveForRace(30, 200);
console.log(raceWays3);
console.log(`Race 3 should be 9 ${raceWays3 === 9}`);



// Time:        49     87     78     95
// Distance:   356   1378   1502   1882
let raceWays4 = solveForRace(49, 356);
console.log(raceWays4);

let raceWays5 = solveForRace(87, 1378);
console.log(raceWays5);

let raceWays6 = solveForRace(78, 1502);
console.log(raceWays6);

let raceWays7 = solveForRace(95, 1882);
console.log(raceWays7);
console.log('solution', raceWays4 * raceWays5 * raceWays6 * raceWays7);


let raceWays8 = solveForRace(71530, 940200);
console.log(raceWays8);
console.log(`Race 8 should be 71503 ${raceWays8 === 71503}`);


let raceWays9 = solveForRace(49877895, 356137815021882);
console.log(raceWays9);


function solveForRace(raceTime, recordDistance){
    let buttonTime = 0;
    let remainingTime = raceTime;
    let speed = 0;
    let waysToWin = 0;

    for (let i = 0; i < raceTime; ++i){
        speed++;
        buttonTime++;
        remainingTime--;
        if (buttonTime + remainingTime !== raceTime){
            console.log('ERROR ON TIME');
        }
        if (speed*remainingTime > recordDistance)
            waysToWin++;
    }
    return waysToWin;
}