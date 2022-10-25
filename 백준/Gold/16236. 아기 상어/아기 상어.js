const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const N = +input.shift();
  const arr = input.map(v1 => v1.trim().split(' ').map(v2 => +v2));
  let shark;

  for (let i = 0; i < N; i++) {
    let flag = false;
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === 9) {
        flag = true;
        shark = [i, j];
        arr[i][j] = 0;
        break;
      }
    }
    if (flag) break;
  }

  const dx = [0, -1, 1, 0];
  const dy = [-1, 0, 0, 1];
  let size = 2;
  let eat = 0;
  let answer = 0;

  const checkRange = (row, col) => {
    return (row >= 0 && col >= 0 && row < N && col < N);
  }

  const bfs = (start) => {
    const queue = [[start[0], start[1], 0]];
    const visit = Array.from(Array(N), () => Array(N).fill(false));
    visit[start[0]][start[1]] = true;
    const target = [];

    while (queue.length > 0) {
      const cur = queue.shift();

      if (arr[cur[0]][cur[1]] < size && arr[cur[0]][cur[1]] !== 0) {
        target.push(cur);
        continue;
      }
      for (let i = 0; i < 4; i++) {
        const next = [cur[0] + dy[i], cur[1] + dx[i]];
        if (checkRange(next[0], next[1])
          && !visit[next[0]][next[1]]
          && arr[next[0]][next[1]] <= size) {

          queue.push([next[0], next[1], cur[2] + 1]);
          visit[next[0]][next[1]] = true;
        }
      }
    }

    if (target.length > 0) {
      target.sort((a, b) => {
        if (a[2] !== b[2]) return a[2] - b[2];
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
      });

      const temp = target[0];
      // arr[shark[0]][shark[1]] = 0;
      shark = [temp[0], temp[1]];

      arr[shark[0]][shark[1]] = 0;

      answer += temp[2];
      return true;
    }

    return false;
  }
  // console.log(shark);

  while (bfs(shark)) {
    // console.log("while");
    eat++;
    if (eat === size) {
      size++;
      eat = 0;
    }
    // console.log(arr, answer, size, eat)
  }

  console.log(answer);
}

solution();