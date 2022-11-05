const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, L, R] = input.shift().split(' ').map(Number);
  const arr = input.map(row => row.split(' ').map(Number));

  let visit;

  const checkRange = (row, col) => (row >= 0 && col >= 0 && row < N && col < N);
  // bfs
  const openBoundary = (start, visit) => {
    const queue = [start];

    visit[start[0]][start[1]] = true;

    const target = [start];

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    while (queue.length > 0) {
      const cur = queue.shift();

      for (let i = 0; i < 4; i++) {
        const next = [cur[0] + dy[i], cur[1] + dx[i]];
        if (checkRange(next[0], next[1]) && !visit[next[0]][next[1]]) {
          const gap = Math.abs(arr[cur[0]][cur[1]] - arr[next[0]][next[1]]);
          if ((gap >= L) && (gap <= R)) {
            target.push(next);
            queue.push(next);
            visit[next[0]][next[1]] = true;
          }
        }
      }
    }
    if (target.length === 1) return false;

    const popularation = Math.floor(target.reduce((acc, cor) => (acc + arr[cor[0]][cor[1]]), 0) / target.length);
    
    if (target.every(cor => arr[cor[0]][cor[1]] === popularation)) return false;
    target.forEach(cor => {
      arr[cor[0]][cor[1]] = popularation;
    });

    return true;
  }

  let answer = 0;
  let check = false;

  while (true) {
    visit = Array.from(Array(N), () => Array(N).fill(false));
    check = false
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visit[i][j]) continue;
        check = (check | openBoundary([i, j], visit));
      }
    }
    if (check) answer++;
    else break;
  }

  console.log(answer);
}

solution();