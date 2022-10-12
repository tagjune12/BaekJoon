const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  // 계단오르기
  const n = +input[0];
  const stairs = input.map(v => +v);
  const dp = Array.from(n+1, ()=>0);
  dp[1] = stairs[1];
  dp[2] = dp[1] + stairs[2];
  dp[3] = Math.max(stairs[1], stairs[2]) + stairs[3];

  for (let i = 4; i <= n; i++) {
    dp[i] = Math.max(dp[i - 2] + stairs[i], dp[i - 3] + stairs[i - 1] + stairs[i]);
  }
  console.log(dp[n]);
}

solution();