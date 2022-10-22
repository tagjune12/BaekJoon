const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const N = +input.shift();
  const M = +input.shift();
  const target = input.pop().split(' ').map(v => +v);

  const graph = Array.from(Array(N + 1), () => Array(N + 1).fill(Number.POSITIVE_INFINITY));

  input.forEach(v => {
    const [from, to, cost] = v.split(' ').map(elem => +elem);
    graph[from][to] = Math.min(cost, graph[from][to]);
  });

  const visit = Array(N + 1).fill(false);
  const distance = graph[target[0]];

  const findNextNode = () => {
    let nextNode = [0, Number.POSITIVE_INFINITY];

    distance.forEach((cost, index) => {
      if (index !== 0 && cost < nextNode[1] && !visit[index]) {
        nextNode = [index, cost];
      }
    });
    return nextNode[0];
  }

  const search = (start) => {
    distance[start] = 0;
    visit[start] = true;

    for (let i = 0; i < N; i++) {
      const cur = findNextNode();
      visit[cur] = true;

      for (let j = 1; j <= N; j++) {
        if (!visit[j]) {
          if ((distance[cur] + graph[cur][j]) < distance[j]) {
            distance[j] = distance[cur] + graph[cur][j];
          }
        }
      }
    }
  }

  search(1);
  // console.log(distance)
  console.log(distance[target[1]]);
}


solution();