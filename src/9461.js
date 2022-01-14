const fs = require('fs');
const [n, ...arr] = fs.readFileSync("./example.txt").toString().trim().split("\n").map(v => +v);

const MAX = Math.max(...arr);

let dp = [0, 1, 1, 1];

if (MAX >= 4) {
  for (let i = 4; i <= MAX; i++) {
    dp[i] = dp[i - 3] + dp[i - 2];
  }
}

arr.forEach(v => {
  console.log(dp[v]);
})