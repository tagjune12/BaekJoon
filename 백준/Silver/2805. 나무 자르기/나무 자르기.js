const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, M] = input.shift().split(' ').map(v => +v);
  const trees = input.shift().split(' ').map(v => +v);

  let left = 1;
  let right = 2000000000;
  let mid;
  let answer = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const woods = trees.reduce((result, tree) => mid < tree ? result + (tree - mid) : result, 0);

    if (woods >= M) {
      left = mid + 1;
      answer = Math.max(mid, answer);
    } else {
      right = mid - 1;
    }
  }
  console.log(answer);
}

solution();