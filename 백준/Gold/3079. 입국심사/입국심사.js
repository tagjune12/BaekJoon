const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, M] = input[0].split(' ').map(v => +v);
  const desk = input.slice(1).map(v => +v);

  if (desk.length === 1) {
    console.log(desk[0] * M);
    return;
  }

  let left = 1;
  let right = Math.max(...desk) * M;
  let answer = Number.MAX_SAFE_INTEGER;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const temp = desk.reduce((acc, cost) => acc + Math.floor(mid / cost), 0);

    if (temp >= M) {
      right = mid - 1;
      answer = Math.min(answer, mid);
    } else {
      left = mid + 1;
    }
  }

  console.log(answer);
}

solution();