const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input.shift().split(" ");

const maze = input.map(v => v.split("").map(x => +x));




function bfs(maze) {
  let visited = [...maze].map(list => list.map(element => 1));
  let queue = [];

  // 동 남 서 북
  const dx = [1, 0, -1, 0]; // 열
  const dy = [0, 1, 0, -1]; // 행

  queue.push([0, 0]);

  while (queue.length !== 0) {
    let [y, x] = queue.shift();

    if (x == m - 1 && y == n - 1) break;

    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];
      if (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n) {
        // 방문하지 않은 경우
        if (visited[nextY][nextX] === 1 && maze[nextY][nextX] === 1) {
          visited[nextY][nextX] = visited[y][x] + 1;
          queue.push([nextY, nextX]);
          maze[y][x] = 0;
        }
      }
    }
  }
  console.log(visited[n - 1][m - 1]);
}

bfs(maze);