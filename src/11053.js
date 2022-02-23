let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
const n = parseInt(input.shift().split("\r")[0]);
let numbers = input.map(arr => arr.split(" ").map(x => +x))[0];

let dp = new Array(n).fill(1);

for (let i = 1; i < n; i++) {
    let values = [1];
    for (let j = 0; j < i; j++) {
        if (numbers[j] < numbers[i]) values.push(dp[j] + 1);
    }
    dp[i] = Math.max(...values);
}

console.log(Math.max(...dp));

// 출처: https://nyang-in.tistory.com/275