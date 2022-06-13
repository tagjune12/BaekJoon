const N = +require('fs').readFileSync('/dev/stdin').toString();

solution(N);

function solution(N) {
  const dp = Array.from(Array(N + 1), () => Array(3).fill(0));
  // dp[i][0] = i번째 줄에 사자를 배치 안하는경우
  // dp[i][1] = i번째 줄 왼쪽에 사자를 배치하는경우
  // dp[i][2] = i번째 줄 오른쪽에 사자를 배치하는경우
  dp[1][0] = 1;
  dp[1][1] = 1;
  dp[1][2] = 1;

  for (let i = 2; i <= N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % 9901;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % 9901;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % 9901;
  }

  const answer = (dp[N][0] + dp[N][1] + dp[N][2]) % 9901;
  console.log(answer);
}