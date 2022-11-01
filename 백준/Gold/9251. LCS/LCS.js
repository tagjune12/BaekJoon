const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const str1 = input[0].trim();
  const str2 = input[1].trim();

  const dp = Array.from(Array(str1.length + 1), () => Array(str2.length + 1).fill(0));
  let answer = 0;

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        answer = Math.max(answer, dp[i][j]);
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        answer = Math.max(answer, dp[i][j]);
      }
    }
  }
  
  console.log(answer);
}

solution();