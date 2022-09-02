let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(v => +v);

function solution() {
  let answer = 0;
  const node = Array.from(Array(N + 1), () => []);
  const visited = Array(N + 1).fill(false);
  input.forEach(connection => {
    const [from, to] = connection.split(' ');
    node[+from].push(+to);
    node[+to].push(+from);
  })

  const bfs = (start) => {
    const queue = [start];
    visited[start] = true;

    while (queue.length > 0) {
      const currentNode = queue.shift();
      const nextNodes = node[currentNode];
      for (const nextNode of nextNodes) {
        if (!visited[nextNode]) {
          visited[nextNode] = true;
          queue.push(nextNode);
        }
      }
    }
    answer++;
  }


  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      bfs(i);
    }
  }

  console.log(answer);
}

solution();