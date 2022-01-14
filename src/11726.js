let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
const n = parseInt(input.shift());


// -----------------------------

let dp = [null, 1, 2];

if (n > 2) {
  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }
}

console.log(dp[n]);

// 참고 : https://kosaf04pyh.tistory.com/222