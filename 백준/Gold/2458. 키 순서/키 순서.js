const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');


// 2458번 키 순서
function solution() {
  const INF = Number.POSITIVE_INFINITY;
  const [N, M] = input.shift().split(' ').map(v => +v);
  const graph = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
  const distance = Array.from(Array(N + 1), () => Array(N + 1).fill(INF));
  
  input.forEach(v => {
    const [from, to] = v.split(' ').map(node => +node);

    graph[from][to] = 1;
    distance[from][to] = 1;
    distance[from][from] = 0;
    distance[to][to] = 0;
  });

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      for (let k = 1; k <= N; k++) {
        if (distance[j][i] + distance[i][k] < distance[j][k]) {
          distance[j][k] = distance[j][i] + distance[i][k];
        }
      }
    }
  }
  let answer = 0;

  for (let i = 1; i < distance.length; i++) {
    let flag = true;
    for (let j = 1; j < distance[i].length; j++) {
      if (distance[i][j] === INF && distance[j][i] === INF) {
        flag = false;
        break;
      }
    }
    if (flag) answer++;
  }


  console.log(answer);
}


solution();