let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

function solution() {
  const MAX_SIZE = +input.shift();
  const answer = [0, 0];
  let paper = [];
  input.forEach(row => {
    paper.push(row.split(' ').map(v => +v));
  });

  const isValid = (start, row, col, size) => {
    return (row >= start[0] && col >= start[1] && row < (start[0] + size) && col < (start[1] + size))
  }

  const bfs = (start, color, size) => {
    const queue = [start];
    const visited = Array.from(Array(MAX_SIZE), () => Array(MAX_SIZE).fill(false));
    visited[start[0]][start[1]] = true;
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    while (queue.length > 0) {
      const [curRow, curCol] = queue.shift();
      if (paper[curRow][curCol] !== color) {
        return false
      };

      for (let i = 0; i < 4; i++) {
        const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];
        if (isValid(start, nextRow, nextCol, size) && !visited[nextRow][nextCol]) {
          queue.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = true;
        }
      }
    }
    return true;
  }

  let curSize = MAX_SIZE;
  while (curSize >= 1) {
    for (let i = 0; i < MAX_SIZE; i += curSize) {
      for (let j = 0; j < MAX_SIZE; j += curSize) {
        if (paper[i][j] === 3) continue;

        if (bfs([i, j], paper[i][j], curSize)) {
          answer[paper[i][j]]++;
          for (let row = i; row < (i + curSize); row++) {
            for (let col = j; col < (j + curSize); col++) {
              paper[row][col] = 3;
            }
          }
        }
      }
    }
    curSize = Math.floor(curSize / 2);
  }

  console.log(`${answer[0]}\n${answer[1]}`);
}

solution();