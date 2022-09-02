let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(v => +v);

function solution() {
  const node = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
  let answer = 0;
  input.forEach(connection => {
    const [from, to] = connection.split(' ').map(v => +v);
    node[from][to] = 1;
    node[to][from] = 1;
  })

  const visited = [];
  const dfs = (current) => {
    const next = node[current];
    for (let i = 1; i <= N; i++) {
      if (next[i] === 1 && !visited.includes(i)) {
        visited.push(i);
        dfs(i);
      }
    }
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited.includes(i)) {
      dfs(i);
      answer++;
    }
  }

  console.log(answer);
}

solution();