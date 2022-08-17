const input = require('fs').readFileSync('./example.txt').toString().split('\n');
const [N, M] = input.shift().split(' ').map(v => +v);
const arr = input.map(row => row.split(" ").map(v => +v));



function solution(N, M, arr) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const visited = Array.from(Array(N), () => Array(M).fill(false));

  const rangeCheck = (row, col) => (row >= 0 && col >= 0 && row < N && col < M);

  const dfs = (row, col) => {
    if (row === N - 1 && col === M - 1) return 1;

    if (!visited[row][col]) {
      visited[row][col] = 0;
      for (let i = 0; i < 4; i++) {
        const [nextRow, nextCol] = [row + dy[i], col + dx[i]];
        if (rangeCheck(nextRow, nextCol) && (arr[nextRow][nextCol] < arr[row][col])) {
          visited[row][col] += dfs(nextRow, nextCol);
        }
      }
    }
    return visited[row][col];
  }

  dfs(0, 0);
  console.log(visited[0][0]);
}

solution(N, M, arr);