let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
const n = parseInt(input.shift());


dp = [null, 1, 2];

if (n <= 2) {
  console.log(dp[n]);
  return;
}

let count = 3;

while (true) {
  dp[count] = (dp[count - 1] + dp[count - 2]) % 15746;
  if (count === n) {
    console.log(dp[count]);
    break;
  }
  count++;
}