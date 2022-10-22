const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, M] = input.shift().split(' ').map(v => +v);

  const edge = input.map(v => v.trim().split(' ').map(v => +v));
  edge.sort((a, b) => a[2] - b[2]);

  const parent = Array.from(Array(N + 1), (_, index) => index);
  const findParent = (node) => {
    if (parent[node] === node) {
      return node;
    }
    parent[node] = findParent(parent[node]);
    return parent[node];
  };

  const merge = (nodeA, nodeB) => {
    const parentA = findParent(nodeA);
    const parentB = findParent(nodeB);

    if (parentA < parentB) {
      parent[parentB] = parentA;
    } else {
      parent[parentA] = parentB;
    }
  }
  let answer = 0;
  let max = 0;
  edge.forEach(elem => {
    const [nodeA, nodeB, cost] = elem;
    if (findParent(nodeA) !== findParent(nodeB)) {
      merge(nodeA, nodeB);
      answer += cost;
      max = Math.max(cost, max);
    }
  });

  console.log(answer - max);
}


solution();