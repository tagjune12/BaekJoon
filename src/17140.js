// 이차원 배열과 연산
let input = require('fs').readFileSync('./example.txt').toString().trim().split("\n");
// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split("\n");
const [r, c, k] = input.shift().split(" ").map(v => +v);

const arr = input.map(v => v.trim().split(" ").map(v => +v));

function compare(entryA, entryB) {
    if (entryA[1] !== entryB[1]) return entryA[1] - entryB[1];
    else return parseInt(entryA[0]) - parseInt(entryB[0]);
}

function calculateR(arr) {

    let maxLength = 0;// 한 행당 가지는 원소의 개수 == 열 길이
    const newArr = arr.map((row, index, origin) => {
        const counts = {};
        row.forEach(value => {
            if (parseInt(value) === 0) return;
            counts[value] = counts[value] ? counts[value] + 1 : 1;
        })
        const sortedRow = Object.entries(counts).sort(compare);
        const newRow = sortedRow.reduce((acc, value) => {
            return acc.concat(value);
        }, []);
        maxLength = Math.max(maxLength, newRow.length);
        return newRow;
    })
    if (maxLength > 100) maxLength = 100;

    return newArr.map(row => {
        if (row.length <= maxLength) {
            const difference = maxLength - row.length;
            return row.concat(Array(difference).fill(0));
        } else return row;
    });
}

function calculateC(arr) {
    const rowLength = arr.length;
    const colLength = arr[0].length;
    let maxLength = 0; // 한열당 가지는 행의 길이 == 열 길이
    const newCols = [];

    for (let col = 0; col < colLength; col++) {
        const counts = {};
        for (let row = 0; row < rowLength; row++) {
            const value = arr[row][col];
            if (parseInt(value) === 0) continue;
            counts[value] = counts[value] ? counts[value] + 1 : 1;
        }

        const sortedRow = Object.entries(counts).sort(compare);
        const newCol = sortedRow.reduce((acc, value) => {
            return acc.concat(value);
        }, []);
        newCols.push(newCol);
        maxLength = Math.max(maxLength, newCol.length);

    }
    // console.log(maxLength, colLength, "newCol", newCols);
    if (maxLength > 100) maxLength = 100;
    const newArr = Array.from(Array(maxLength), () => Array(colLength).fill(0));
    newCols.forEach((arr, col) => arr.forEach((element, row) => {
        newArr[row][col] = element;
    }));

    return newArr;
}

function checkAnswer(r, c, k, arr) {
    return parseInt(arr[r - 1][c - 1]) !== k;
}

// function printArr(arr) {
//     console.log(`[${arr.length}행 ${arr[0].length}열]`);
//     arr.forEach(row => console.log(row.join(" ")));
//     console.log();
// }
const solution = (r, c, k, arr) => {
    let time = 0;
    while (checkAnswer(r, c, k, arr)) {
        let rowLength = arr.length;
        let colLength = arr[0].length;
        if (rowLength >= colLength) {
            arr = calculateR(arr);
        } else {
            arr = calculateC(arr);
        }
        time++;
        let count = 0;
        arr.forEach(row => {
            if (row.every(value => value === 0)) count++;
        })
        arr.length = arr.length - count;
        // printArr(arr);
        if (time === 100) return -1;
    }
    return time;
}

console.log(solution(r, c, k, arr));
