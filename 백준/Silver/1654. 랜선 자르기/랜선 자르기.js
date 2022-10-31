const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [K, N] = input.shift().split(' ').map(v => +v);
  const cables = input.map(v => +v);

  let left = 1, right = Math.max(...cables);
  let mid, answer = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const sum = cables.reduce((result, length) => length >= mid ? result + Math.floor(length / mid) : result, 0);

    if (sum >= N) {
      left = mid + 1;
      answer = Math.max(mid, answer);
    } else {
      right = mid - 1;
    }
  }

  console.log(answer);
}

solution();