const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const n = +input.shift();
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const answer = [0, 0];

  let arr = input.map(v => v.trim().split('').map(v => {
    if (v === 'R') return 0;
    else if (v === 'G') return 1;
    else return 2;
  }));
  let visit = Array.from(Array(n), () => Array(n).fill(false));

  const bfs = (start, color) => {
    const queue = [start];

    visit[start[0]][start[1]] = true;

    while (queue.length > 0) {
      const cur = queue.shift();
      for (let i = 0; i < 4; i++) {
        const next = [cur[0] + dy[i], cur[1] + dx[i]];
        // console.log(next);
        if (next[0] < 0 || next[0] >= n || next[1] < 0 || next[1] >= n) {
          continue;
        }
        if (!visit[next[0]][next[1]] && arr[next[0]][next[1]] === color) {

          visit[next[0]][next[1]] = true;
          queue.push([next[0], next[1]]);
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visit[i][j]) {
        bfs([i, j], arr[i][j]);
        answer[0]++;
      }
    }
  }


  arr = input.map(v => v.trim().split('').map(v => {
    if (v === 'R' || v === 'G') return 0;
    else return 2;
  }));
  visit = Array.from(Array(n), () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visit[i][j]) {
        bfs([i, j], arr[i][j]);
        answer[1]++;
      }
    }
  }

  console.log(answer[0], answer[1]);
}

solution();