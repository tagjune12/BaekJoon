// 회의실 배정

let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const n = Number(input.shift());
let meetings = input.map(arr => arr.split(" ").map(x => +x));


const compare = (timesA, timesB) => {
    if (timesA[1] < timesB[1]) return -1;
    else if (timesA[1] === timesB[1]) {
        return timesA[0] - timesB[0];
    }
    else return 1;
}

meetings.sort(compare);

let count = 0;
let prevEnd = 0;

meetings.forEach(value => {
    const [start, end] = value;
    if (prevEnd <= start) {
        prevEnd = end;
        count++;
    }
})

console.log(count);